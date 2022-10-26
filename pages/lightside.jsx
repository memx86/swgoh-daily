import Dailies from '../src/components/Dailies';
import { getLightSidePageStaticProps as getStaticProps } from '../src/services/staticProps';

import { DAILIES_TYPES } from '../src/constants';

export { getStaticProps };

const LightSidePage = ({ characters }) => {
  return <Dailies characters={characters} type={DAILIES_TYPES.LIGHTSIDE} />;
};

export default LightSidePage;
