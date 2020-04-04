/**
 * Builds key for use as "key" prop in React component
 * @param {number | string} prefix
 * @param {number | string} base
 * @returns {string} Key combined from prefix and base parameters
 */
const buildKey = (prefix: number | string, base: number | string): string => [prefix, base].join('_');
export default buildKey;