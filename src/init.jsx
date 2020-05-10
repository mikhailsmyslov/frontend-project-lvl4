// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker/locale/en';
import cookies from 'js-cookie';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { reducers, actions } from './store';
import App from './components/App';
import UserContext from './UserContext';

const cookieName = 'shlackUser';

export default (gon) => {
  const socket = io();
  const currentUser = cookies.get(cookieName) || faker.name.findName();
  cookies.set(cookieName, currentUser);

  const { channels, messages, currentChannelId } = gon;
  const preloadedState = {
    channels,
    messages,
    app: { currentChannelId },
    ui: { modal: { display: 'none' } },
  };

  const store = configureStore({
    preloadedState,
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
  });

  socket.on('newMessage', ({ data }) => store.dispatch(actions.addMessageSuccess(data)));

  socket.on('newChannel', ({ data }) => store.dispatch(actions.addChannelSuccess(data)));

  socket.on('renameChannel', ({ data }) => store.dispatch(actions.renameChannelSuccess(data)));

  socket.on('removeChannel', ({ data }) => store.dispatch(actions.removeChannelSuccess(data)));

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={{ currentUser }}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('app'),
  );
};
