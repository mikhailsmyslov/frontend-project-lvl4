import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel: {
      reducer: (state, action) => state.channels.push(action.payload),
      prepare: ({ name }) => ({ payload: { name } }),
    },
    removeChannel: (state, action) => state.channels.filter(({ id }) => action.payload.id !== id),
  },
});

export default slice;
