export const getOptionsFromCharacters = characters =>
  characters.map(({ baseId, nameKey }) => ({ label: nameKey, value: baseId }));
