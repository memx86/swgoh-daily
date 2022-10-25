import { COLLECTIONS } from '../db';
import { getDocById } from './getDocById';

export const getDailiesDocById = id => getDocById(COLLECTIONS.DAILIES, id);
