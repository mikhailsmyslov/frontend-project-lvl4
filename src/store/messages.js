/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes';
import channels from './channels';

const { removeChannelSuccess } = channels.actions;

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccess: (state, action) => {
      const { attributes: message } = action.payload;
      state.push(message);
    },
  },
  extraReducers: {
    [removeChannelSuccess]: (state, action) => {
      const { id: channelId } = action.payload;
      _.remove(state, { channelId });
    },
  },
});

const addMessage = (message, channelId) => async () => {
  const data = { attributes: { ...message, date: new Date() } };
  await axios.post(routes.channelMessagesPath(channelId), { data });
};

export default { ...slice, actions: { ...slice.actions, addMessage } };
