// @ts-check
import React from 'react';
import { useSelector } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import SideBar from './SideBar';
import Main from './Main';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import EditMessageForm from './EditMessageForm';
import Modal from './Modal';
import buildKey from '../../lib/buildKey';
import { getCurrentChannelId } from '../selectors';

const App = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const mainKey = buildKey('main', currentChannelId);
  const messageFormKey = buildKey('messageForm', currentChannelId);
  return (
    <ErrorBoundary>
      <div className="vh-100 vw-100">
        <ReactNotification />
        <div className="d-flex flex-column flex-md-row h-100">
          <SideBar className="col-md-2 flex-md-column" />
          <div className="d-flex flex-column flex-grow-1 w-100 overflow-auto">
            <Header />
            <Main key={mainKey} className="h-100 overflow-auto" />
            <EditMessageForm key={messageFormKey} />
          </div>
        </div>
      </div>
      <Modal />
    </ErrorBoundary>
  );
};

export default App;
