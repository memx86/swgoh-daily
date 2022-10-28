import { ENCOUNTERS } from '../../helpers';
import { getCharactersStatisProps } from './getCharactersStatisProps';

export const getDarkSidePageStaticProps = getCharactersStatisProps(
  ENCOUNTERS.DARK,
);
