/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';
import app from './app';

const { startLoading, finishLoading } = app.actions;

const slice = createSlice({
  name: 'messages',
  initialState: { byId: {}, allIds: [] },
  reducers: {
    addMessageToStore: (state, action) => {
      const { id, attributes: message } = action.payload;
      state.byId[id] = message;
      state.allIds.push(id);
    },
  },
});

const createMessage = (message) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    const { currentChannelId } = getState().app;
    const data = { attributes: { ...message, date: new Date() } };
    await axios.post(routes.channelMessagesPath(currentChannelId), { data });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    dispatch(finishLoading());
  }
};

export default { ...slice, actions: { ...slice.actions, createMessage } };
