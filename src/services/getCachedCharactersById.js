import { COLLECTIONS } from '../db';
import { getDocById } from './getDocById';

export const getCachedCharactersById = id =>
  getDocById(COLLECTIONS.CHARACTERS, id);
