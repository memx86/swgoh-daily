import { updateDoc } from 'firebase/firestore';
import { getCachedCharacters } from './getCachedCharacters';
import { getCachedCharactersById } from './getCachedCharactersById';
import { getCharactersUnitShards } from './getCharactersUnitShards';

export const updateCachedCharacters = async () => {
  const characters = await getCharactersUnitShards();

  const cachedCharaters = await getCachedCharacters();
  const id = cachedCharaters?.id;
  const docToUpdate = getCachedCharactersById(id);
  await updateDoc(docToUpdate, { characters, updatedAt: Date.now() });
};
