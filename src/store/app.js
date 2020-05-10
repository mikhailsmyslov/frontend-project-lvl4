/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: { currentChannelId: null, isLoading: false },
  reducers: {
    setCurrentChannelId: (state, action) => { state.currentChannelId = action.payload.id; },
  },
});

export default slice;
