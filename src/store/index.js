import * as slices from './slices';

export const reducers = Object.values(slices)
  .reduce((acc, slice) => ({ ...acc, [slice.name]: slice.reducer }), {});

export const actions = Object.values(slices)
  .reduce((acc, slice) => ({ ...acc, ...slice.actions }), {});
