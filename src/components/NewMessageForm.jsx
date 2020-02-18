import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import RichTextEditor from 'react-rte';
import { actions } from '../store';
import TextEditor from './Editor';
import UserContext from '../UserContext';

const onSubmit = (dispatch, ctx) => (formValues, formActions) => {
  const { text } = formValues;
  const { setSubmitting, resetForm } = formActions;
  const hasContent = !!text.getEditorState().getCurrentContent().getPlainText('').trim();
  if (hasContent) {
    dispatch(actions.postNewMessage({ text: text.toString('html'), author: ctx.currentUser }));
  }
  setSubmitting(false);
  resetForm();
};

const renderTextEditor = (props) => {
  const { setFieldValue, values: { text }, submitForm } = props;
  return (
    <TextEditor
      value={text}
      onChange={setFieldValue}
      onCtrlEnter={submitForm}
      className="h-100 overflow-auto"
    />
  );
};

const renderForm = (props) => {
  const { isSubmitting } = props;
  return (
    <Form className="h-25 p-1">
      <Field
        name="text"
        disabled={isSubmitting}
        component={() => renderTextEditor(props)}
      />
    </Form>
  );
};

const NewMessageForm = () => {
  const dispatch = useDispatch();
  return (
    <UserContext.Consumer>
      {(ctx) => (
        <Formik
          initialValues={{ text: RichTextEditor.createEmptyValue() }}
          onSubmit={onSubmit(dispatch, ctx)}
        >
          {(props) => renderForm(props)}
        </Formik>
      )}
    </UserContext.Consumer>
  );
};

export default NewMessageForm;
