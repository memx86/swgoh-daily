import { createCachedCharacters } from './createCachedCharacters';
import { getCachedCharacters } from './getCachedCharacters';
import { getCharactersUnitShards } from './getCharactersUnitShards';
import { updateCachedCharacters } from './updateCachedCharacters';
import { getFilteredBySideCharacters } from '../helpers';

export const getCharactersWithShardsProps = async side => {
  const cachedCharacters = await getCachedCharacters();
  const { updatedAt = {}, characters } = cachedCharacters;

  if (!characters) {
    const newCharacters = await getCharactersUnitShards();
    createCachedCharacters(newCharacters);
    return getFilteredBySideCharacters(newCharacters, side);
  }

  const isStale = Date.now() - updatedAt > 1000 * 60 * 60 * 24;
  if (isStale) {
    updateCachedCharacters();
  }

  return getFilteredBySideCharacters(characters, side);
};
