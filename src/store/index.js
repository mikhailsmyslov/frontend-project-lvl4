import * as slices from './slices';

export const reducers = Object.values(slices)
  .reduce((_reducers, slice) => ({ ..._reducers, [slice.name]: slice.reducer }), {});

export const actions = Object.values(slices)
  .reduce((_actions, slice) => ({ ..._actions, ...slice.actions }), {});
