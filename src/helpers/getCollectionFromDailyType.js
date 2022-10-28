import { DAILIES_TYPES } from '../constants';
import {
  dailiesCollection,
  lightSideCollection,
  darkSideCollection,
  COLLECTIONS,
} from '../db';

export const getCollectionFromDailyType = type => {
  let collection;
  let collectionName;
  switch (type) {
    case DAILIES_TYPES.LIGHTSIDE:
      collection = lightSideCollection;
      collectionName = COLLECTIONS.LIGHTSIDE;
      break;
    case DAILIES_TYPES.DARKSIDE:
      collection = darkSideCollection;
      collectionName = COLLECTIONS.DARKSIDE;
      break;
    default:
      collection = dailiesCollection;
      collectionName = COLLECTIONS.DAILIES;
  }
  return { collection, collectionName };
};
