import { getData } from './getData';

export const getMaterialList = async (project = {}) => {
  const options = {
    collection: 'materialList',
    project: {
      id: 1,
      lookupMissionList: {
        missionIdentifier: {
          campaignId: 1,
          campaignMapId: 1,
          campaignMissionId: 1,
        },
      },
      ...project,
    },
  };

  const units = await getData(options);
  return units;
};
