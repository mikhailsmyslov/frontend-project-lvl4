import { createSelector } from 'reselect';

export const getCurrentChannelId = (state) => state.app.currentChannelId;
export const getChannels = (state) => state.channels;
export const getMessages = (state) => state.messages;

export const getCurrentChannelMessages = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

export const getCurrentChannel = createSelector(
  [getCurrentChannelId, getChannels],
  (currentChannelId, channels) => channels.find(({ id }) => currentChannelId === id) || {},
);
