import { getCharactersWithShardsProps } from '../getCharactersWithShardsProps';

export const getHomePageStaticProps = async () => {
  const characters = (await getCharactersWithShardsProps()) ?? {};
  return {
    props: {
      characters,
    },
    revalidate: 60 * 60 * 24,
  };
};
