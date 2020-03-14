import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSlackHash, faGithub, faBootstrap, faJs, faReact,
} from '@fortawesome/free-brands-svg-icons';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import UserContext from '../UserContext';
import { actions } from '../store';
import { getChannels, getCurrentChannelId } from '../selectors';

const handleChannelChange = (props) => (event) => {
  event.preventDefault();
  const { dispatch, id } = props;
  dispatch(actions.setCurrentChannelId({ id }));
};

const renderChannel = (props) => {
  const { id, name, currentChannelId } = props;
  const isActive = id === currentChannelId;
  return (
    <Nav.Item key={id} className="ml-3">
      <Nav.Link active={isActive} onClick={handleChannelChange(props)}>
        {`# ${name}`}
      </Nav.Link>
    </Nav.Item>
  );
};

const SideBar = (props) => {
  const { channels, className } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentUser } = useContext(UserContext);
  return (
    <Navbar bg="dark" variant="dark" className={className} expand="md" style={{ minWidth: 'fit-content' }}>
      <Navbar.Brand href="#">
        <FontAwesomeIcon icon={faSlackHash} className="mr-2" />
        {t('brand')}
      </Navbar.Brand>
      <div className="my-2 ml-1 text-light align-self-start">
        <FontAwesomeIcon icon={faUser} className="mr-3" />
        {currentUser}
      </div>
      <Navbar.Toggle aria-controls="sidebar-nav" />
      <Navbar.Collapse id="sidebar-nav" className="flex-column justify-content-between w-100 mh-100 overflow-auto align-items-start mt-4">
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
            {channels.map((channel) => renderChannel({ ...props, ...channel, dispatch }))}
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
