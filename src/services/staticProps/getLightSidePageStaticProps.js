import { ENCOUNTERS } from '../../helpers';
import { getCharactersStatisProps } from './getCharactersStatisProps';

export const getLightSidePageStaticProps = getCharactersStatisProps(
  ENCOUNTERS.LIGHT,
);
