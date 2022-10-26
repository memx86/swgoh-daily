import { ENCOUNTERS } from './getUnitShardsData';
import { normalizeArray } from './normalizeArray';

export const getFilteredBySideCharacters = (characters, side) => {
  if (!side) return characters;

  const filteredCharactersArray = Object.values(characters).filter(
    ({ locations }) =>
      locations?.some(({ encounter }) => encounter === ENCOUNTERS[side]),
  );
  return normalizeArray(filteredCharactersArray, 'baseId');
};
