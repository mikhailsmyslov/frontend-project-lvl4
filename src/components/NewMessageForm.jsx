import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Editor from './TextEditor';
import { actions } from '../store';
import UserContext from '../UserContext';

const TextEditor = ({
  field, form, isLoading,
}) => {
  const { name, value } = field;
  const { setFieldValue, submitForm } = form;
  const { t } = useTranslation();
  const handleChange = (newValue) => setFieldValue(name, newValue);
  return (
    <Editor
      value={value}
      onChange={handleChange}
      onCtrlEnter={submitForm}
      disabled={isLoading}
      placeholder={t('enterMessage')}
      className="flex-grow-1"
      autoFocus
    />
  );
};

const NewMessageForm = (props) => {
  const dispatch = useDispatch();
  const { isLoading } = props;
  const context = useContext(UserContext);

  const onSubmit = async (formValues, formActions) => {
    const { text } = formValues;
    const { setSubmitting, resetForm } = formActions;
    if (!text.trim()) return;
    await dispatch(actions.createNewMessage({ text, author: context.currentUser }));
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
      {() => (
        <Form className="position-relative d-flex shadow-lg p-2">
          <Field name="text">
            {({ field, form }) => (
              <TextEditor
                field={field}
                form={form}
                isLoading={isLoading}
              />
            )}
          </Field>
          <small
            className="d-none d-lg-inline position-absolute text-secondary"
            style={{ top: '5px', right: '10px' }}
          >
            Отправить сообщение: Ctrl+Enter
          </small>
          <Button
            type="submit"
            className="align-self-end px-2 py-1 ml-1 btn-info"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

export default connect(mapStateToProps)(NewMessageForm);
