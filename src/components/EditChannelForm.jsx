// @ts-check
import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { noop } from 'lodash';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import * as Yup from 'yup';
import { actions } from '../store';
import { getCurrentChannel, getChannelsNames } from '../selectors';
import Spinner from './Spinner';
import logger from '../../lib/logger';
import notify from '../notify';

const log = logger('channels');

const mapFormParamsByType = {
  addChannel: {
    placeholderKey: 'enterNewChannelName',
    action: actions.addChannel,
    getInitValue: () => '',
  },
  renameChannel: {
    placeholderKey: 'enterNewChannelName',
    action: actions.renameChannel,
    getInitValue: (channel) => channel.name,
  },
};

const ChannelNameSchema = Yup.object().shape({
  name: Yup.string()
    .required('required')
    .matches(/^[a-z]{6,15}$/, 'invalidChannelName'),
});

const EditChannelForm = (props) => {
  const { onSubmit = noop, type = 'addChannel' } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannel = useSelector(getCurrentChannel);
  const channelsNames = useSelector(getChannelsNames);
  const input = useRef(null);
  useEffect(() => input?.current?.focus(), []);

  const { placeholderKey, action, getInitValue } = mapFormParamsByType[type];

  const handleSubmit = async (formValues, formActions) => {
    const { name } = formValues;
    if (channelsNames.includes(name)) {
      notify(t('errors.alredyExists'));
      return;
    }
    const { setSubmitting, resetForm } = formActions;
    try {
      await dispatch(action({ ...currentChannel, name }));
      setSubmitting(false);
      resetForm();
      onSubmit();
    } catch ({ message }) {
      setSubmitting(false);
      log(message);
      notify(message);
    }
  };

  return (
    <Formik
      initialValues={{ name: getInitValue(currentChannel) }}
      onSubmit={handleSubmit}
      validationSchema={ChannelNameSchema}
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

export default EditChannelForm;
