import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Editor from './TextEditor';
import { actions } from '../store';
import UserContext from '../UserContext';
import Spinner from './Spinner';

const TextEditor = (props) => {
  const { field, form } = props;
  const { name, value } = field;
  const { setFieldValue, submitForm, isSubmitting } = form;
  const { t } = useTranslation();
  const handleChange = (newValue) => setFieldValue(name, newValue);
  return (
    <Editor
      value={value}
      onChange={handleChange}
      onCtrlEnter={submitForm}
      disabled={isSubmitting}
      placeholder={t('enterMessage')}
      className="flex-grow-1"
      autoFocus
    />
  );
};

const NewMessageForm = () => {
  const dispatch = useDispatch();
  const context = useContext(UserContext);
  const { t } = useTranslation();

  const onSubmit = async (formValues, formActions) => {
    const { text } = formValues;
    const { setSubmitting, resetForm } = formActions;
    if (text.trim()) {
      await dispatch(actions.createNewMessage({ text, author: context.currentUser }));
    }
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className="position-relative d-flex shadow-lg p-2">
          <Field name="text" component={TextEditor} />
          <small
            className="d-none d-lg-inline position-absolute text-secondary"
            style={{ top: '5px', right: '10px' }}
          >
            {t('sendMessageShortCut', { shortcut: 'Ctrl+Enter' })}
          </small>
          <Button
            type="submit"
            className="align-self-end px-2 py-1 ml-1 btn-info"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : <FontAwesomeIcon icon={faPaperPlane} />}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
