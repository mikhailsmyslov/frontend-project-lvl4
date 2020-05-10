/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: {
    modal: { display: 'none' },
  },
  reducers: {
    showModal: (state, action) => { state.modal.display = action.payload.display; },
    hideModal: (state) => { state.modal.display = 'none'; },
  },
});

export default slice;
