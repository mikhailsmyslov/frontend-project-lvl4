// @ts-check
import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSlackHash, faGithub, faBootstrap, faJs, faReact,
} from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Avatar from 'react-avatar';
import UserContext from '../UserContext';
import { actions } from '../store';
import { getChannels, getCurrentChannelId } from '../selectors';


const Channel = (props) => {
  const { id, name } = props;

  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannelId);
  const isActive = id === currentChannelId;

  const handleChannelChange = (event) => {
    event.preventDefault();
    dispatch(actions.setCurrentChannelId({ id }));
  };

  return (
    <Nav.Item key={id} className="ml-3">
      <Nav.Link active={isActive} onClick={handleChannelChange}>
        {`# ${name}`}
      </Nav.Link>
    </Nav.Item>
  );
};

const SideBar = (props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentUser } = useContext(UserContext);
  const channels = useSelector(getChannels);
  return (
    <Navbar bg="dark" variant="dark" className={className} expand="md" style={{ minWidth: 'fit-content' }}>
      <Navbar.Brand href="#">
        <FontAwesomeIcon icon={faSlackHash} className="mr-2" />
        {t('brand')}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="sidebar-nav" />
      <Navbar.Collapse id="sidebar-nav" className="flex-column justify-content-between w-100 mh-100 overflow-auto align-items-start">
        <div className="mt-3 mb-4 ml-1 text-light align-self-start">
          <Avatar name={currentUser} round size="25" textSizeRatio={1} className="mr-2" />
          {currentUser}
        </div>
        <div className="w-100 h-100 pr-1 overflow-auto">
          <Button
            variant="outline-secondary"
            size="sm"
            className="text-light text-decoration-none w-100 px-2 py-0 mb-2 d-flex justify-content-between align-items-center"
            onClick={() => dispatch(actions.showModal({ display: 'addChannel' }))}
          >
            <span className="lead">{t('channels')}</span>
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
          </Button>
          <Nav className="flex-column">
            {channels.map(({ id, name }) => <Channel key={id} id={id} name={name} />)}
          </Nav>
        </div>
        <div className="d-inline-block mx-auto float-right px-2 mb-2 mt-4 justify-content-around text-secondary">
          <a className="text-secondary text-decoration-none" href="https://github.com/mikhailsmyslov/frontend-project-lvl4">
            <FontAwesomeIcon icon={faGithub} size="lg" className="mx-2" />
          </a>
          <a className="text-secondary text-decoration-none" href="https://react-bootstrap.netlify.com/">
            <FontAwesomeIcon icon={faBootstrap} size="lg" className="mx-2" />
          </a>
          <a className="text-secondary text-decoration-none" href="https://developer.mozilla.org/">
            <FontAwesomeIcon icon={faJs} size="lg" className="mx-2" />
          </a>
          <a className="text-secondary text-decoration-none" href="https://ru.reactjs.org/">
            <FontAwesomeIcon icon={faReact} size="lg" className="mx-2" />
          </a>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  channels: getChannels(state),
  currentChannelId: getCurrentChannelId(state),
});

export default connect(mapStateToProps)(SideBar);
