import { getData } from './getData';

export const getUnitsList = async (project = {}) => {
  const options = {
    collection: 'unitsList',
    language: 'eng_us',
    match: {
      rarity: 7,
      obtainable: true,
      obtainableTime: 0,
    },
    project: {
      baseId: 1,
      nameKey: 1,
      descKey: 1,
      thumbnailName: 1,
      ...project,
    },
  };

  const units = await getData(options);
  return units;
};
