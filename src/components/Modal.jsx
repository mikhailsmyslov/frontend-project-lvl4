// @ts-check
import React, { useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../store';
import EditChannelForm from './EditChannelForm';
import RemoveChannelForm from './RemoveChannelForm';
import { getModalDisplayState } from '../selectors';

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const display = useSelector(getModalDisplayState);

  const handleCloseModal = () => dispatch(actions.hideModal());

  const mapDisplayToModalComponent = useMemo(() => ({
    addChannel: {
      title: 'addChannel',
      body: <EditChannelForm onSubmit={handleCloseModal} type="addChannel" />,
    },
    renameChannel: {
      title: 'renameChannel',
      body: <EditChannelForm onSubmit={handleCloseModal} type="renameChannel" />,
    },
    removeChannel: {
      title: 'removeChannel',
      body: <RemoveChannelForm onSubmit={handleCloseModal} onCancel={handleCloseModal} />,
    },
  }), []);

  const component = mapDisplayToModalComponent[display] || {};
  const { title, body } = component;

  return (
    <Modal show={display !== 'none'} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
