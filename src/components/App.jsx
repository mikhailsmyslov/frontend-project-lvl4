import React from 'react';
import SideBar from './SideBar';
import Main from './Main';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import NewMessageForm from './NewMessageForm';
import Modal from './Modal';

const App = () => (
  <ErrorBoundary>
    <div className="vh-100 vw-100">
      <div className="d-flex flex-column flex-md-row h-100">
        <SideBar className="col-md-2 flex-md-column" />
        <div className="d-flex flex-column flex-grow-1 w-100 overflow-auto">
          <Header />
          <Main className="h-100 overflow-auto" />
          <NewMessageForm />
        </div>
      </div>
    </div>
    <Modal />
  </ErrorBoundary>

);

App.displayName = 'App';
export default App;
