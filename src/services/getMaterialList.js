import { getData } from './getData';

export const getMaterialList = async (project = {}) => {
  const options = {
    collection: 'materialList',
    language: 'eng_us',
    match: {
      obtainable: true,
    },
    project: {
      ...project,
      //   baseId: 1,
      //   nameKey: 1,
      //   descKey: 1,
      //   thumbnailName: 1,
    },
  };

  const units = await getData(options);
  return units;
};
