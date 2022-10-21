const ENCOUNTERS = {
  C01L: 'Light side battles (hard)',
  C01D: 'Dark side battles (hard)',
  C01H: 'Cantina battles',
  C01SP: 'Fleet battles',
};

const getNodeLetter = (nodeTier, campaignMissionId) => {
  if (nodeTier <= 3) {
    switch (campaignMissionId) {
      case 'Mi02':
        return 'A';
      case 'Mi03':
        return 'B';
      case 'Mi05':
        return 'C';
      case 'Mi06':
        return 'D';
      default:
        return campaignMissionId;
    }
  }

  switch (campaignMissionId) {
    case 'Mi03':
      return 'A';
    case 'Mi04':
      return 'B';
    case 'Mi07':
      return 'C';
    case 'Mi08':
      return 'D';
    case 'Mi11':
      return 'E';
    case 'Mi12':
      return 'F';
    default:
      return campaignMissionId;
  }
};

export const getUnitShardsData = materials =>
  materials
    .filter(material => material.id.includes('unitshard_'))
    .map(material => {
      const [, ...idArr] = material.id.split('_');
      const id = idArr.join('');
      const missionLookupList = material?.lookupMissionList
        .filter(
          ({ missionIdentifier }) => missionIdentifier.campaignId !== 'EVENTS',
        )
        .map(({ missionIdentifier }) => {
          const { campaignId, campaignMapId, campaignMissionId } =
            missionIdentifier;
          const nodeTier = campaignMapId && Number(campaignMapId[2]);
          return {
            encounter: ENCOUNTERS[campaignId] ?? campaignId,
            nodeTier,
            nodeLetter: getNodeLetter(nodeTier, campaignMissionId),
          };
        });

      return {
        id,
        locations: missionLookupList ?? [],
      };
    });
