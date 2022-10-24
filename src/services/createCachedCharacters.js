import { addDoc } from 'firebase/firestore';
import { charactersCollection } from '../db';

export const createCachedCharacters = async characters => {
  await addDoc(charactersCollection, { updatedAt: Date.now(), characters });
};
