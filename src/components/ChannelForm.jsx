// @ts-check
import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { noop } from 'lodash';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import { actions } from '../store';
import { getChannels, getCurrentChannel } from '../selectors';
import Spinner from './Spinner';
import notify from '../notify';

const mapFormParamsByType = {
  addChannel: {
    placeholderKey: 'enterNewChannelName',
    action: actions.createChannel,
    getInitValue: () => '',
  },
  renameChannel: {
    placeholderKey: 'enterNewChannelName',
    action: actions.renameChannel,
    getInitValue: (channel) => channel.name,
  },
};

const validate = ({ name }) => {
  if (!name) return { name: 'required' };
  if (!/^[a-z]{6,15}$/.test(name)) return { name: 'invalidChannelName' };
  return {};
};

const ChannelForm = (props) => {
  const { onSubmit = noop, type = 'addChannel', currentChannel = {} } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const input = useRef(null);
  useEffect(() => input?.current?.focus(), []);

  const { placeholderKey, action, getInitValue } = mapFormParamsByType[type];

  const handleSubmit = async (formValues, formActions) => {
    const { name } = formValues;
    const { setSubmitting, resetForm } = formActions;
    try {
      await dispatch(action({ ...currentChannel, name }));
      resetForm();
      onSubmit();
    } catch ({ message }) {
      notify(message);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: getInitValue(currentChannel) }}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {
      ({ isSubmitting, errors, values }) => (
        <Form className="form-inline w-100 justify-content-between">
          <Field
            name="name"
            type="text"
            placeholder={t(placeholderKey)}
            disabled={isSubmitting}
            className={cn({
              'form-control flex-grow-1 mx-1 my-1': true,
              'is-invalid': !!errors.name,
              'is-valid': !errors.name && !!values.name,
            })}
            innerRef={input}
          />
          <Button
            type="submit"
            variant="info"
            className="col-sm-auto mx-1 my-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : t('submit')}
          </Button>
          {errors.name && <small className="w-100 text-danger ml-2">{t(`errors.${errors.name}`)}</small>}
        </Form>
      )
      }
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  channels: getChannels(state),
  currentChannel: getCurrentChannel(state),
});

export default connect(mapStateToProps)(ChannelForm);
