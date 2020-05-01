/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../../routes';
import app, { defaultChannelId } from './app';

const { startLoading, finishLoading, setCurrentChannelId } = app.actions;

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelToStore: (state, action) => {
      const { attributes: channel } = action.payload;
      state.push(channel);
    },
    renameChannelInStore: (state, action) => {
      const { id, attributes: { name } } = action.payload;
      _.find(state, { id }).name = name;
    },
    removeChannelFromStore: (state, action) => {
      const { id } = action.payload;
      _.remove(state, { id });
    },
  },
});

const createChannel = (channel) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const data = { attributes: { ...channel } };
    const { data: { data: { id } } } = await axios.post(routes.channelsPath(), { data });
    dispatch(setCurrentChannelId({ id }));
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    dispatch(finishLoading());
  }
};

const renameChannel = ({ id, name }) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const data = { attributes: { name } };
    await axios.patch(routes.channelPath(id), { data });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    dispatch(finishLoading());
  }
};

const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await axios.delete(routes.channelPath(id));
    dispatch(setCurrentChannelId({ id: defaultChannelId }));
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    dispatch(finishLoading());
  }
};

export default {
  ...slice,
  actions: {
    ...slice.actions,
    createChannel,
    renameChannel,
    removeChannel,
  },
};
