/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes';
import app from './app';

const DEFAULT_CHANNEL_ID = 1;
const { setCurrentChannelId } = app.actions;

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelSuccess: (state, action) => {
      const { attributes: channel } = action.payload;
      state.push(channel);
    },
    renameChannelSuccess: (state, action) => {
      const { id, attributes: { name } } = action.payload;
      const channel = _.find(state, { id });
      channel.name = name;
    },
    removeChannelSuccess: (state, action) => {
      const { id } = action.payload;
      _.remove(state, { id });
    },
  },
});

const addChannel = (channel) => async (dispatch) => {
  const data = { attributes: { ...channel } };
  const { data: { data: { id } } } = await axios.post(routes.channelsPath(), { data });
  dispatch(setCurrentChannelId({ id }));
};

const renameChannel = ({ id, name }) => async () => {
  const data = { attributes: { name } };
  await axios.patch(routes.channelPath(id), { data });
};

const removeChannel = ({ id }) => async (dispatch) => {
  await axios.delete(routes.channelPath(id));
  dispatch(setCurrentChannelId({ id: DEFAULT_CHANNEL_ID }));
};

export default {
  ...slice,
  actions: {
    ...slice.actions,
    addChannel,
    renameChannel,
    removeChannel,
  },
};
