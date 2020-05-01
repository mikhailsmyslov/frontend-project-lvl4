/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../../routes';
import app from './app';
import channels from './channels';

const { startLoading, finishLoading } = app.actions;
const { removeChannelFromStore } = channels.actions;

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageToStore: (state, action) => {
      const { attributes: message } = action.payload;
      state.push(message);
    },
  },
  extraReducers: {
    [removeChannelFromStore]: (state, action) => {
      const { id: channelId } = action.payload;
      _.remove(state, { channelId });
    },
  },
});

const createMessage = (message) => async (dispatch, getState) => {
  dispatch(startLoading());
  const { currentChannelId } = getState().app;
  const data = { attributes: { ...message, date: new Date() } };
  try {
    await axios.post(routes.channelMessagesPath(currentChannelId), { data });
  } finally {
    dispatch(finishLoading());
  }
};

export default { ...slice, actions: { ...slice.actions, createMessage } };
