import { ENCOUNTERS } from '../../helpers';
import { getCharactersWithShardsProps } from '../getCharactersWithShardsProps';

export const getDarkSidePageStaticProps = async () => {
  const characters =
    (await getCharactersWithShardsProps(ENCOUNTERS.DARK)) ?? {};
  return {
    props: {
      characters,
    },
    revalidate: 60 * 60 * 24,
  };
};
