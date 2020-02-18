import React from 'react';
import { Col, Row } from 'react-bootstrap';
import SideBar from './SideBar';
import Main from './Main';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';
import Header from './Header';
import NewMessageForm from './NewMessageForm';

const App = () => (
  <ErrorBoundary>
    <Row className="no-gutters flex-column flex-grow-1 mh-100">
      <Col md={2} className="no-gutters flex-md-grow-1">
        <SideBar className="flex-md-column h-100" />
      </Col>
      <Col md={10} className="no-gutters d-flex flex-column flex-grow-1 overflow-hidden">
        <Header />
        <Main className="flex-grow-1 overflow-auto" />
        <NewMessageForm />
      </Col>
      <Footer />
    </Row>
  </ErrorBoundary>

);

App.displayName = 'App';
export default App;
