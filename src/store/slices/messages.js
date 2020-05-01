/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
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
