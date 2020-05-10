// @ts-check
import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { noop } from 'lodash';
import { Button } from 'react-bootstrap';
import { actions } from '../store';
import { getCurrentChannel } from '../selectors';
import Spinner from './Spinner';
import logger from '../../lib/logger';
import notify from '../notify';

const log = logger('channels');

const RemoveChannelForm = (props) => {
  const { onSubmit = noop, onCancel = noop } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannel = useSelector(getCurrentChannel);

  const handleSubmit = async (formValues, formActions) => {
    const { setSubmitting, resetForm } = formActions;
    try {
      await dispatch(actions.removeChannel(currentChannel));
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
      onSubmit={handleSubmit}
      initialValues={{}}
    >
      {
      ({ isSubmitting }) => (
        <Form className="w-100">
          <div className="mb-3">
            {t('confirmChannelRemove', { name: currentChannel.name })}
          </div>
          <Button
            variant="secondary"
            className="float-right mx-1"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            variant="info"
            className="float-right mx-1"
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

export default RemoveChannelForm;
