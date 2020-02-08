import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App';


export default (gon) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const { channels, messages, currentChannelId } = gon;
  const intialState = {
    channels: {
      channels,
      currentChannelId,
    },
    messages,
  };
  const store = createStore(
    reducers,
    intialState,
    composeEnhancers(
      applyMiddleware(thunk),
      applyMiddleware(logger),
    ),
  );

  ReactDOM.render(<App store={store} />, document.getElementById('app'));
};
