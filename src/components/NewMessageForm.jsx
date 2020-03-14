import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, connect } from 'react-redux';
import Editor from './TextEditor';
import { actions } from '../store';
import UserContext from '../UserContext';

const TextEditor = ({ field, form, isLoading }) => {
  const { name, value } = field;
  const { setFieldValue, submitForm } = form;
  const handleChange = (newValue) => setFieldValue(name, newValue);
  return (
    <Editor
      value={value}
      onChange={handleChange}
      onCtrlEnter={submitForm}
      disabled={isLoading}
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
        <Form>
          <Field name="text">
            {({ field, form }) => (
              <TextEditor field={field} form={form} isLoading={isLoading} />
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

export default connect(mapStateToProps)(NewMessageForm);
