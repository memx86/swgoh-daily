export const ENCOUNTERS = {
  C01L: 'Light side battles (hard)',
  C01D: 'Dark side battles (hard)',
  C01H: 'Cantina battles',
  C01SP: 'Fleet battles',
  LIGHT: 'C01L',
  DARK: 'C01D',
  FLEET: 'C01SP',
  CANTINA: 'C01H',
};

const getNodeLetter = ({ campaignId, nodeTier, campaignMissionId }) => {
  if (campaignId === ENCOUNTERS.CANTINA) {
    switch (campaignMissionId) {
      case 'Mi01':
        return 'A';
      case 'Mi02':
        return 'B';
      case 'Mi03':
        return 'C';
      case 'Mi04':
        return 'D';
      case 'Mi05':
        return 'E';
      case 'Mi06':
        return 'F';
      case 'Mi07':
        return 'G';
      default:
        return campaignMissionId;
    }
  }

  if (campaignId === ENCOUNTERS.FLEET) {
    switch (campaignMissionId) {
      case 'Mi01':
        return 'A';
      case 'Mi02':
        return 'B';
      case 'Mi03':
        return 'C';
      case 'Mi04':
        return 'D';
      case 'Mi05':
        return 'E';
      default:
        return campaignMissionId;
    }
  }

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

  if (nodeTier >= 4 && nodeTier <= 5) {
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
  }

  if (nodeTier === 6) {
    switch (campaignMissionId) {
      case 'Mi04':
        return 'A';
      case 'Mi05':
        return 'B';
      case 'Mi08':
        return 'C';
      case 'Mi09':
        return 'D';
      case 'Mi10':
        return 'E';
      default:
        return campaignMissionId;
    }
  }

  if (nodeTier === 7) {
    switch (campaignMissionId) {
      case 'Mi03':
        return 'A';
      case 'Mi04':
        return 'B';
      case 'Mi07':
        return 'C';
      case 'Mi08':
        return 'D';
      default:
        return campaignMissionId;
    }
  }

  if (nodeTier === 8) {
    switch (campaignMissionId) {
      case 'Mi03':
        return 'A';
      case 'Mi04':
        return 'B';
      case 'Mi07':
        return 'C';
      case 'Mi08':
        return 'D';
      default:
        return campaignMissionId;
    }
  }

  switch (campaignMissionId) {
    case 'Mi01':
      return 'A';
    case 'Mi02':
      return 'B';
    case 'Mi03':
      return 'C';
    case 'Mi04':
      return 'D';
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
        .filter(({ missionIdentifier }) =>
          Object.keys(ENCOUNTERS).includes(missionIdentifier.campaignId),
        )
        .map(({ missionIdentifier }) => {
          const { campaignId, campaignMapId, campaignMissionId } =
            missionIdentifier;
          const nodeTier = campaignMapId && Number(campaignMapId[2]);
          return {
            encounter: ENCOUNTERS[campaignId] ?? campaignId,
            nodeTier,
            nodeLetter: getNodeLetter({
              campaignId,
              nodeTier,
              campaignMissionId,
            }),
            maxRetry: ENCOUNTERS[campaignId] !== ENCOUNTERS.C01H ? 5 : 0,
          };
        });

      return {
        id,
        locations: missionLookupList ?? [],
      };
    });
