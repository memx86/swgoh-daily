import { updateDoc } from 'firebase/firestore';
import { getCachedCharacters } from './getCachedCharacters';
import { getCachedCharactersById } from './getCachedCharactersById';

export const updateCachedCharacters = async () => {
  const characters = await getCharactersUnitShards();

  const cachedCharaters = await getCachedCharacters();
  const id = cachedCharaters?.at(0)?.id;
  const docToUpdate = getCachedCharactersById(id);
  await updateDoc(docToUpdate, { characters, updatedAt: Date.now() });
};
