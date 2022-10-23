export const normalizeArray = (arr, idKey) => {
  const normalized = {};
  arr.forEach(item => {
    const id = item[idKey];
    normalized[id] = { ...item };
  });
  return normalized;
};
