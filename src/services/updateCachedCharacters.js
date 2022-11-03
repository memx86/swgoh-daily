import { updateDoc } from 'firebase/firestore';
import { getCachedCharacters } from './getCachedCharacters';
import { getCachedCharactersById } from './getCachedCharactersById';
import { getCharactersUnitShards } from './getCharactersUnitShards';

const state = {
  isUpdating: false,
};

export const updateCachedCharacters = async () => {
  if (state.isUpdating) return;

  state.isUpdating = true;

  const characters = await getCharactersUnitShards();
  const cachedCharaters = await getCachedCharacters();

  const id = cachedCharaters?.id;
  const docToUpdate = getCachedCharactersById(id);

  await updateDoc(docToUpdate, {
    characters,
    updatedAt: Date.now(),
  });

  state.isUpdating = false;
};
