import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { noop } from 'lodash';
import { Button } from 'react-bootstrap';
import { actions } from '../store';
import { getChannels, getCurrentChannel } from '../selectors';
import Spinner from './Spinner';

const mapFormParamsByType = {
  addChannel: {
    placeholderKey: 'enterNewChannelName',
    action: actions.createNewChannel,
    getInitValue: () => '',
  },
  renameChannel: {
    placeholderKey: 'enterNewChannelName',
    action: actions.renameChannel,
    getInitValue: (channel) => channel.name,
  },
};

const ChannelForm = (props) => {
  const { onSubmit = noop, type = 'addChannel', currentChannel = {} } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const input = useRef(null);
  useEffect(() => input?.current?.focus());

  const { placeholderKey, action, getInitValue } = mapFormParamsByType[type];

  const handleSubmit = async (formValues, formActions) => {
    const { name } = formValues;
    const { setSubmitting, resetForm } = formActions;
    await dispatch(action({ ...currentChannel, name }));
    setSubmitting(false);
    resetForm();
    onSubmit();
  };

  return (
    <Formik
      initialValues={{ name: getInitValue(currentChannel) }}
      onSubmit={handleSubmit}
    >
      {
      ({ isSubmitting }) => (
        <Form className="form-inline w-100 justify-content-between">
          <Field
            name="name"
            type="text"
            placeholder={t(placeholderKey)}
            disabled={isSubmitting}
            className="form-control flex-grow-1 mx-1 my-1"
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
