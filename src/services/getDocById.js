import { doc } from 'firebase/firestore';
import { db } from '../db/firebaseConfig';

export const getDocById = (collectionName, id) => doc(db, collectionName, id);
