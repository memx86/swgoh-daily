export const getOptionsFromCharacters = characters =>
  Object.values(characters).map(({ baseId, nameKey }) => ({
    label: nameKey,
    value: baseId,
  }));
