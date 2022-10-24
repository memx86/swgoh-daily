import {
  getCharactersWithShards,
  getUnitShardsData,
  normalizeArray,
} from '../helpers';
import { getMaterialList } from './getMaterialList';
import { getUnitsList } from './getUnitsList';
import { loginApp } from './loginApp';

export const getCharactersUnitShards = async () => {
  await loginApp();
  const charactersArray = await getUnitsList();
  const materials = await getMaterialList();

  const unitShardsArray = getUnitShardsData(materials);

  const characters = normalizeArray(charactersArray, 'baseId');
  const unitShards = normalizeArray(unitShardsArray, 'id');

  const charactersUnitShards = getCharactersWithShards(characters, unitShards);
  return charactersUnitShards;
};
