import { ENCOUNTERS } from './getUnitShardsData';
import { DAILIES_TYPES } from '../constants';

export const getCharacterEncountersType = encounters => {
  const isLight = encounters.includes(ENCOUNTERS.C01L);
  const isDark = encounters.includes(ENCOUNTERS.C01D);

  if ((isLight && isDark) || (!isLight && !isDark)) return DAILIES_TYPES.ALL;

  return isLight ? DAILIES_TYPES.LIGHTSIDE : DAILIES_TYPES.DARKSIDE;
};
