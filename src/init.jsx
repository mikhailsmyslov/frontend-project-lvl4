// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import cookies from 'js-cookie';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { reducers, actions } from './store';
import App from './components/App';
import UserContext from './UserContext';
import normalizeData from '../lib/normalizeFlatData';

const cookieName = 'shlackUser';

export default (gon) => {
  const socket = io();
  const currentUser = cookies.get(cookieName) || faker.name.findName();
  cookies.set(cookieName, currentUser);

  const { channels, messages, currentChannelId } = gon;
  const preloadedState = {
    channels: normalizeData(channels),
    messages: normalizeData(messages),
    app: { currentChannelId, isLoading: false },
    ui: {
      modal: { display: 'none' },
    },
  };

  const store = configureStore({
    preloadedState,
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
  });

  socket.on('newMessage', ({ data }) => store.dispatch(actions.storeAddMessage(data)));

  socket.on('newChannel', ({ data }) => store.dispatch(actions.storeAddChannel(data)));

  socket.on('renameChannel', ({ data }) => store.dispatch(actions.storeRenameChannel(data)));

  socket.on('removeChannel', ({ data }) => store.dispatch(actions.storeRemoveChannel(data)));

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={{ currentUser }}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('app'),
  );
};
