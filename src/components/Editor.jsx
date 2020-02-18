import React from 'react';
import RichTextEditor from 'react-rte';

class TextEditor extends React.Component {
  onChange = (value) => {
    const { onChange = () => {} } = this.props;
    onChange('text', value);
  };

  handleReturn = (event) => {
    const { onCtrlEnter = () => {} } = this.props;
    if (event.ctrlKey) {
      onCtrlEnter();
      return 'handled';
    }
    return null;
  }

  render() {
    const { value, className } = this.props;
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' },
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
      ],
    };
    return (
      <RichTextEditor
        value={value}
        onChange={this.onChange}
        handleReturn={this.handleReturn}
        toolbarConfig={toolbarConfig}
        className={className}
      />
    );
  }
}

export default TextEditor;
