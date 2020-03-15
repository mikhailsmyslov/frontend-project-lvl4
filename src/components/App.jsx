import React from 'react';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import Main from './Main';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import NewMessageForm from './NewMessageForm';
import Modal from './Modal';

const buildKey = (prefix, base) => [prefix, base].join('_');

const App = (props) => {
  const { currentChannelId } = props;
  const mainKey = buildKey('main', currentChannelId);
  const messageFormKey = ['messageForm', currentChannelId].join('_');
  return (
    <ErrorBoundary>
      <div className="vh-100 vw-100">
        <div className="d-flex flex-column flex-md-row h-100">
          <SideBar className="col-md-2 flex-md-column" />
          <div className="d-flex flex-column flex-grow-1 w-100 overflow-auto">
            <Header />
            <Main key={mainKey} className="h-100 overflow-auto" />
            <NewMessageForm key={messageFormKey} />
          </div>
        </div>
      </div>
      <Modal />
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => ({ currentChannelId: state.app.currentChannelId });

App.displayName = 'App';
export default connect(mapStateToProps)(App);
