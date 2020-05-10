// @ts-check
import React from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentChannel } from '../selectors';
import { actions } from '../store';

const { showModal } = actions;

const Header = (props) => {
  const { className } = props;
  const classes = classnames({
    'bg-light border-bottom': true,
    'd-flex justify-content-between align-items-center': true,
    'py-2 px-4': true,
  }, className);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannel = useSelector(getCurrentChannel);
  const { name, removable } = currentChannel;

  const showRenameChannelForm = () => dispatch(showModal({ display: 'renameChannel' }));
  const showRemoveChannelDialog = () => dispatch(showModal({ display: 'removeChannel' }));

  return (
    <header className={classes}>
      <span className="lead">{`#${name}`}</span>
      {removable && (
      <div>
        <Button
          variant="light"
          onClick={showRenameChannelForm}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          {t('rename')}
        </Button>
        <Button
          variant="light"
          onClick={showRemoveChannelDialog}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          {t('delete')}
        </Button>
      </div>
      )}
    </header>
  );
};

export default Header;
