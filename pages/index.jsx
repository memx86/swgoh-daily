import Dailies from '../src/components/Dailies';

import { getHomePageStaticProps as getStaticProps } from '../src/services/staticProps';

export { getStaticProps };

const Home = ({ characters }) => {
  return <Dailies characters={characters} />;
};

export default Home;
