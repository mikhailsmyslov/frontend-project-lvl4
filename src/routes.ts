// @ts-check

const host = '';
const prefix = 'api/v1';

/**
 * Build the route for AJAX calls
 */
export default {
  channelsPath: (): string => [host, prefix, 'channels'].join('/'),
  channelPath: (id: number): string => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id: number): string => [host, prefix, 'channels', id, 'messages'].join('/'),
};
