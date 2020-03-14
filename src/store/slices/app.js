/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: { currentChannelId: null, isLoading: false },
  reducers: {
    startLoading: (state) => { state.isLoading = true; },
    finishLoading: (state) => { state.isLoading = false; },
    setCurrentChannelId: (state, action) => { state.currentChannelId = action.payload.id; },
  },
});

export const defaultChannelId = 1;
export default slice;
