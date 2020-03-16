import React from 'react';
import { Editor as ReactDraftWysiwyg } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import classnames from 'classnames';
import { isUndefined, merge, noop } from 'lodash';
import Spinner from './Spinner';
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

const hasContent = (editorState = {}) => !!editorState
  .getCurrentContent?.().getPlainText?.().trim?.();

const getEditorStateFromHtml = (html = '', options = {}) => {
  const { contentBlocks, entityMap } = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState = EditorState.createWithContent(contentState);
  if (options.setFocusToEnd) return EditorState.moveFocusToEnd(editorState);
  return editorState;
};

const getHtmlFromEditorState = (editorState) => (
  hasContent(editorState) ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : '');

class Editor extends React.Component {
  static getDerivedStateFromProps = ({ value, autoFocus }, { editorState }) => {
    if (isUndefined(value) || value === getHtmlFromEditorState(editorState)) return null;
    return { editorState: getEditorStateFromHtml(value, { setFocusToEnd: autoFocus }) };
  }

  constructor(props) {
    super(props);
    const { value, autoFocus } = props;
    this.state = { editorState: getEditorStateFromHtml(value, { setFocusToEnd: autoFocus }) };
  }

  onEditorStateChange = (nextEditorState) => {
    const { editorState: prevEditorState } = this.state;
    if (!hasContent(nextEditorState) && !hasContent(prevEditorState)) return;
    this.setState({ editorState: nextEditorState });
    const { onChange = noop } = this.props;
    const html = getHtmlFromEditorState(nextEditorState);
    onChange(html);
  };

  handleReturn = (event) => {
    if (!event.ctrlKey) return null;
    const { onCtrlEnter = noop } = this.props;
    onCtrlEnter();
    return 'handled';
  }

  renderSpinner = () => (
    <div className="
      modal-backdrop
      show
      d-flex
      justify-content-center
      align-items-center
      bg-light
      position-absolute
      w-100
      h-100"
    >
      <Spinner />
    </div>
  )

  render() {
    const {
      className, disabled, windowSize: { deviceSize }, placeholder,
    } = this.props;
    const { editorState } = this.state;
    const classes = classnames({ 'h-100 position-relative': true }, className);
    return (
      <div className={classes}>
        {disabled && this.renderSpinner()}
        <ReactDraftWysiwyg
          key={deviceSize}
          readOnly={disabled}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          handleReturn={this.handleReturn}
          toolbar={deviceSize === 'xs' ? compactToolBarConfig : defaultToolBarConfig}
          editorClassName="border border-info rounded d-flex align-items-center px-1"
          editorStyle={{ maxHeight: '200px', minHeight: '2rem' }}
          toolbarClassName="d-flex border-0 m-0 p-0 pb-1"
          hashtag={{ separator: ' ', trigger: '#' }}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default WithWindowSize(Editor);
