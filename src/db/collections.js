import { collection } from 'firebase/firestore';

import { db } from './firebaseConfig';

export const COLLECTIONS = {
  DAILIES: 'dailies',
  CHARACTERS: 'characters',
};

export const dailiesCollection = collection(db, COLLECTIONS.DAILIES);
export const charactersCollection = collection(db, COLLECTIONS.CHARACTERS);
