import React from 'react';
import { Provider } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import SideBar from './SideBar';
import Main from './Main';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';
import Header from './Header';

const App = ({ store }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <Row className="no-gutters flex-column flex-grow-1">
        <Col md={2} className="no-gutters flex-md-grow-1">
          <SideBar className="flex-md-column h-100" />
        </Col>
        <Col md={10} className="no-gutters d-flex flex-column flex-grow-1">
          <Header />
          <Main className="flex-grow-1" />
        </Col>
      </Row>
      <Footer />
    </Provider>
  </ErrorBoundary>

);

App.displayName = 'App';
export default App;
