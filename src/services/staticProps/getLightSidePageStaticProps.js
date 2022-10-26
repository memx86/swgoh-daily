import { ENCOUNTERS } from '../../helpers';
import { getCharactersWithShardsProps } from '../getCharactersWithShardsProps';

export const getLightSidePageStaticProps = async () => {
  const characters =
    (await getCharactersWithShardsProps(ENCOUNTERS.LIGHT)) ?? {};
  return {
    props: {
      characters,
    },
    revalidate: 60 * 60 * 24,
  };
};
