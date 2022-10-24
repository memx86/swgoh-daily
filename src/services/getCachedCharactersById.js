import { charactersCollection } from '../db';
import { getDocById } from './getDocById';

export const getCachedCharactersById = id =>
  getDocById(charactersCollection, id);
