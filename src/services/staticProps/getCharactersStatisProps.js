import { getCharactersWithShardsProps } from '../getCharactersWithShardsProps';

export const getCharactersStatisProps = side => async () => {
  const characters = (await getCharactersWithShardsProps(side)) ?? {};
  return {
    props: {
      characters,
    },
    revalidate: 60 * 60 * 24,
  };
};
