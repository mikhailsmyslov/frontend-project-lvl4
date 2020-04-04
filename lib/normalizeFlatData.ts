/**
 * Normalizes the flat collection of elements to the shape suitable for use with Redux store
 * @param {Array} flat - a collection of elements to be normalized
 * @returns {Object} - Normalized collection with a shape { byId: { ... }, allIds: [...] }
 */
export default (flat: Array<any>): object => flat.reduce(({ byId, allIds }, item) => {
  const { id } = item;
  return {
    byId: { ...byId, [id]: item },
    allIds: [...allIds, id],
  };
}, { byId: {}, allIds: [] });
