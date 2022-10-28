import { collection } from 'firebase/firestore';

import { db } from './firebaseConfig';

export const COLLECTIONS = {
  DAILIES: 'dailies',
  CHARACTERS: 'characters',
  LIGHTSIDE: 'lightside',
  DARKSIDE: 'darkside',
};

export const dailiesCollection = collection(db, COLLECTIONS.DAILIES);
export const charactersCollection = collection(db, COLLECTIONS.CHARACTERS);
export const lightSideCollection = collection(db, COLLECTIONS.LIGHTSIDE);
export const darkSideCollection = collection(db, COLLECTIONS.DARKSIDE);
