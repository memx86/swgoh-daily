import { List } from '@mui/material';
import PropTypes from 'prop-types';
import DailiesListItem from './DailiesListItem';

const DailiesList = ({ dailies, deleteDaily, updateDaily }) => {
  return (
    <List>
      {dailies?.map(daily => (
        <DailiesListItem
          key={daily.id}
          daily={daily}
          deleteDaily={deleteDaily}
          updateDaily={updateDaily}
        />
      ))}
    </List>
  );
};

DailiesList.propTypes = {
  dailies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      baseId: PropTypes.string.isRequired,
      nameKey: PropTypes.string.isRequired,
      thumbnailName: PropTypes.string.isRequired,
      locations: PropTypes.arrayOf(
        PropTypes.shape({
          encounter: PropTypes.string.isRequired,
          nodeTier: PropTypes.number.isRequired,
          nodeLetter: PropTypes.string.isRequired,
          maxRetry: PropTypes.number.isRequired,
        }),
      ),
    }),
  ).isRequired,
  deleteDaily: PropTypes.func.isRequired,
  updateDaily: PropTypes.func.isRequired,
};

export default DailiesList;
