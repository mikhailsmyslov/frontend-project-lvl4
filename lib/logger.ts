import debug from 'debug';

/**
 * Creates a logger with a given namespace. Uses {@link https://www.npmjs.com/package/debug|debug} under the hood.
 * @param {string=} namespace Namespace name.
 * @returns {Function} Logger function.
 */
export default (namespace: string = ''): Function => debug(`chat:${namespace}`);
