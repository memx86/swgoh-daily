import { createCachedCharacters } from './createCachedCharacters';
import { getCachedCharacters } from './getCachedCharacters';
import { getCharactersUnitShards } from './getCharactersUnitShards';
import { updateCachedCharacters } from './updateCachedCharacters';

export const getCharactersWithShardsProps = async () => {
  const cachedCharacters = await getCachedCharacters();
  const { updatedAt = {}, characters } = cachedCharacters;

  if (!characters) {
    const newCharacters = await getCharactersUnitShards();
    createCachedCharacters(newCharacters);
    return newCharacters;
  }

  const isStale = Date.now() - updatedAt > 1000 * 60 * 60 * 24;
  if (isStale) {
    updateCachedCharacters();
  }

  return characters;
};
