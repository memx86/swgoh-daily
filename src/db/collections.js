import { collection } from 'firebase/firestore';

import { db } from './firebaseConfig';

export const dailiesCollection = collection(db, 'dailies');
