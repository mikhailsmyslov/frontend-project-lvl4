// @ts-check
import React, { useState, useEffect, useRef } from 'react';
import { Editor as ReactDraftWysiwyg } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import classnames from 'classnames';
import { merge, noop } from 'lodash';
import WithWindowSize from '../hoc/withWindowSize';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../assets/textEditor.scss';

const popupClassName = 'rwd-popup-custom bg-secondary text-white shadow-lg border border-secondary rounded';
const dropdownClassName = 'rwd-dropdown-custom d-flex border border-secondary rounded shadow-lg overflow-auto';

const defaultToolBarConfig = {
  options: ['inline', 'list', 'colorPicker', 'emoji', 'image'],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
    dropdownClassName,
  },
  list: { dropdownClassName },
  image: { popupClassName },
  colorPicker: { popupClassName },
  emoji: { popupClassName },
};

const compactToolBarConfig = merge({},
  defaultToolBarConfig, { inline: { inDropdown: true } }, { list: { inDropdown: true } });

const hasContent = (editorState) => !!editorState?.getCurrentContent?.().getPlainText?.().trim?.();

const getHtmlFromEditorState = (editorState) => (
  hasContent(editorState) ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : '');

const getEditorStateFromHtml = (html) => {
  if (!html) return EditorState.createEmpty();
  const { contentBlocks, entityMap } = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};

const Editor = (props) => {
  const {
    value = '',
    onChange = noop,
    onCtrlEnter = noop,
    className = null,
    disabled,
    windowSize: { deviceSize = '' },
    placeholder = '',
    autoFocus = false,
  } = props;

  const [editorState, setEditorState] = useState(getEditorStateFromHtml(value));
  const editorRef = useRef(null);

  useEffect(() => { if (autoFocus) editorRef.current.focus(); });

  useEffect(() => {
    if (value === getHtmlFromEditorState(editorState)) return;
    setEditorState(getEditorStateFromHtml(value));
  }, [value]);

  const onEditorStateChange = (nextState) => {
    setEditorState(nextState);
    onChange(hasContent(nextState) ? getHtmlFromEditorState(nextState) : '');
  };

  const handleReturn = (event) => {
    if (!event.ctrlKey) return null;
    onCtrlEnter();
    return 'handled';
  };

  const editorClasses = classnames({
    'border border-info rounded d-flex align-items-center px-1': true,
    'bg-light': disabled,
  });

  return (
    <div className={className}>
      <ReactDraftWysiwyg
        key={deviceSize}
        readOnly={disabled}
        editorRef={(ref) => { editorRef.current = ref; }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        // @ts-ignore
        handleReturn={handleReturn}
        toolbar={deviceSize === 'xs' ? compactToolBarConfig : defaultToolBarConfig}
        editorClassName={editorClasses}
        editorStyle={{ maxHeight: '200px', minHeight: '2rem' }}
        toolbarClassName="d-flex border-0 m-0 p-0 pb-1"
        hashtag={{ separator: ' ', trigger: '#' }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default WithWindowSize(Editor);
