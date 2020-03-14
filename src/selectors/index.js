import { createSelector } from 'reselect';

const getMessagesById = (state) => state.messages.byId;
const getChannelsById = (state) => state.channels.byId;
const getMessagesAllIds = (state) => state.messages.allIds;
const getChannelsAllIds = (state) => state.channels.allIds;

export const getCurrentChannelId = (state) => state.app.currentChannelId;

export const getChannels = createSelector(
  [getChannelsAllIds, getChannelsById],
  (allIds, byId) => allIds.map((id) => byId[id]),
);

export const getMessages = createSelector(
  [getMessagesAllIds, getMessagesById],
  (allIds, byId) => allIds.map((id) => byId[id]),
);

export const getCurrentChannelMessages = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

export const getCurrentChannel = createSelector(
  [getCurrentChannelId, getChannelsById],
  (currentChannelId, channelsById) => channelsById[currentChannelId] || {},
);
