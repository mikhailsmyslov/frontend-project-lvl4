// @ts-check
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { noop } from 'lodash';
import { actions } from '../store';
import ChannelForm from './ChannelForm';
import { getCurrentChannel } from '../selectors';
import Spinner from './Spinner';
import notify from '../notify';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.mapDisplayToModalComponent = {
      addChannel: {
        titleKey: 'addChannel',
        renderBody: () => <ChannelForm onSubmit={this.handleCloseModal} type="addChannel" />,
        displayFooter: false,
      },
      renameChannel: {
        titleKey: 'renameChannel',
        renderBody: () => <ChannelForm onSubmit={this.handleCloseModal} type="renameChannel" />,
        displayFooter: false,
      },
      removeChannel: {
        titleKey: 'removeChannel',
        renderBody: this.renderChannelRemoveConfirmation,
        okBtnAction: this.handleRemoveChannel,
      },
    };
  }

  handleCloseModal = () => {
    const { hideModal } = this.props;
    hideModal();
  }

  withCloseModal = (callback = noop) => async () => {
    await callback();
    this.handleCloseModal();
  }

  handleRemoveChannel = async () => {
    const { removeChannel, currentChannel } = this.props;
    try {
      await removeChannel(currentChannel);
    } catch ({ message }) {
      notify(message);
    }
  }

  renderChannelRemoveConfirmation = () => {
    const { currentChannel: { name }, t } = this.props;
    return t('confirmChannelRemove', { name });
  }

  render() {
    const { display, t, isLoading } = this.props;
    const {
      titleKey = '',
      renderBody = () => null,
      okBtnAction = noop,
      cancelBtnAction = noop,
      okBtnLabelKey = 'ok',
      cancelBtnLabelKey = 'cancel',
      displayHeader = true,
      displayFooter = true,
    } = this.mapDisplayToModalComponent[display] || {};

    return (
      <Modal show={display !== 'none'} onHide={this.handleCloseModal}>
        { displayHeader && (
        <Modal.Header closeButton>
          <Modal.Title>{t(titleKey)}</Modal.Title>
        </Modal.Header>
        )}
        <Modal.Body>{renderBody()}</Modal.Body>
        {displayFooter && (
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={this.withCloseModal(cancelBtnAction)}
          >
            {t(cancelBtnLabelKey)}
          </Button>
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={this.withCloseModal(okBtnAction)}
          >
            {isLoading ? <Spinner /> : t(okBtnLabelKey)}
          </Button>
        </Modal.Footer>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  display: state.ui.modal.display,
  currentChannel: getCurrentChannel(state),
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
  removeChannel: (channel) => dispatch(actions.removeChannel(channel)),
});

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ModalComponent));
