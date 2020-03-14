import React from 'react';
import { Editor as ReactDraftWysiwyg } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import classnames from 'classnames';
import { has } from 'lodash';
import Spinner from './Spinner';
import WithWindowSize from '../hoc/withWindowSize';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../assets/textEditor.scss';

const popupClassName = 'rwd-popup bg-secondary text-white shadow-lg border border-secondary rounded';
const dropdownClassName = 'rwd-dropdown d-flex border border-secondary rounded shadow-lg overflow-auto';

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

const compactToolBarConfig = {
  ...defaultToolBarConfig,
  ...{ inline: { inDropdown: true } },
  ...{ list: { inDropdown: true } },
};

const getEditorStateFromHtml = (html) => {
  if (!html) return EditorState.createEmpty();
  const { contentBlocks, entityMap } = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(contentState);
};

const getHtmlFromEditorState = (editorState) => {
  if (!editorState) return '';
  const content = editorState.getCurrentContent();
  const raw = convertToRaw(content);
  return draftToHtml(raw);
};

class Editor extends React.Component {
  static getDerivedStateFromProps = (props, state) => {
    if (!has(props, 'value')) return null;
    const { value } = props;
    const { editorState } = state;
    const html = getHtmlFromEditorState(editorState);
    if (value === html) return null;
    return { editorState: getEditorStateFromHtml(value) };
  }

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = { editorState: getEditorStateFromHtml(value) };
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
    const { onChange } = this.props;
    if (!onChange) return;
    const html = getHtmlFromEditorState(editorState);
    onChange(html);
  };

  handleReturn = (event) => {
    if (!event.ctrlKey) return null;
    const { onCtrlEnter } = this.props;
    if (onCtrlEnter) onCtrlEnter();
    return 'handled';
  }

  render() {
    const { className, disabled, windowSize: { deviceSize } } = this.props;
    const { editorState } = this.state;
    const classes = classnames({
      'h-100 position-relative p-2 shadow-lg': true,
    }, className);

    return (
      <div className={classes}>
        {disabled && (
        <div
          className="
          modal-backdrop show
          d-flex justify-content-center align-items-center
          bg-light
          position-absolute
          w-100 h-100"
        >
          <Spinner />
        </div>
        )}
        <ReactDraftWysiwyg
          readOnly={disabled}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          handleReturn={this.handleReturn}
          toolbar={deviceSize === 'xs' ? compactToolBarConfig : defaultToolBarConfig}
          editorClassName="border border-info"
          editorStyle={{ maxHeight: '200px' }}
          toolbarClassName="d-flex border-0 m-0 p-0 pb-1"
          hashtag={{ separator: ' ', trigger: '#' }}
          placeHolder="Enter message"
        />
      </div>
    );
  }
}

export default WithWindowSize(Editor);
