// @ts-check
import React from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getCurrentChannel } from '../selectors';
import { actions } from '../store';

const Header = (props) => {
  const {
    className, currentChannel, showRenameChannelForm, showRemoveChannelDialog,
  } = props;
  const classes = classnames({
    'bg-light': true,
    'border-bottom': true,
    'd-flex': true,
    'justify-content-between': true,
    'align-items-center': true,
    'py-2': true,
    'px-4': true,
  }, className);

  const { t } = useTranslation();
  const { name, removable } = currentChannel;

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

const mapStateToProps = (state) => ({
  currentChannel: getCurrentChannel(state),
});

const mapDispatchToProps = (dispatch) => ({
  showRenameChannelForm: () => dispatch(actions.showModal({ display: 'renameChannel' })),
  showRemoveChannelDialog: () => dispatch(actions.showModal({ display: 'removeChannel' })),
});

Header.displayName = 'Header';
export default connect(mapStateToProps, mapDispatchToProps)(Header);
