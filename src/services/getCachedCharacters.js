import { getDocs } from 'firebase/firestore';
import { charactersCollection } from '../db';
import { getFirebaseData } from '../helpers';

export const getCachedCharacters = async () => {
  const charactersDocs = await getDocs(charactersCollection);
  const characters = charactersDocs.docs.map(getFirebaseData);
  return characters?.at(0);
};
