/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: { currentChannelId: null, isLoading: false },
  reducers: {
    startLoading: (state) => { state.isLoading = true; },
    finishLoading: (state) => { state.isLoading = false; },
  },
});

export default slice;
