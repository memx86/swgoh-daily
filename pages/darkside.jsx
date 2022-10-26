import Dailies from '../src/components/Dailies';
import { getDarkSidePageStaticProps as getStaticProps } from '../src/services/staticProps';

import { DAILIES_TYPES } from '../src/constants';

export { getStaticProps };

const DarkSidePage = ({ characters }) => {
  return <Dailies characters={characters} type={DAILIES_TYPES.DARKSIDE} />;
};

export default DarkSidePage;
