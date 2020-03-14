export default (flat) => flat.reduce(({ byId, allIds }, item) => {
  const { id } = item;
  return {
    byId: { ...byId, [id]: item },
    allIds: [...allIds, id],
  };
}, { byId: {}, allIds: [] });
