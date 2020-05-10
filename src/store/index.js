import app from './app';
import ui from './ui';
import messages from './messages';
import channels from './channels';

const slices = [
  app, ui, messages, channels,
];

export const reducers = slices
  .reduce((acc, slice) => ({ ...acc, [slice.name]: slice.reducer }), {});

export const actions = slices
  .reduce((acc, slice) => ({ ...acc, ...slice.actions }), {});
