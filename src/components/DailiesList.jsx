import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';

import { BASE_IMG_URL } from '../constants/BASE_IMG_URL';
import { ENCOUNTERS } from '../helpers';

import DeleteButton from './DeleteButton';
import Tries from './Tries';

const DailiesList = ({ dailies, deleteDaily, updateDaily }) => {
  return (
    <List>
      {dailies?.map(({ id, nameKey, thumbnailName, locations, tries }) => (
        <ListItem
          key={id}
          disablePadding
          sx={{
            borderBottom: '1px solid gray',
            minHeight: '5.55rem',
          }}
        >
          <DeleteButton handleDelete={() => deleteDaily(id)} />
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar alt={nameKey} src={`${BASE_IMG_URL}${thumbnailName}.png`} />
          </ListItemAvatar>
          <ListItemText primary={nameKey} sx={{ flexBasis: '20%' }} />
          {!!locations?.length ? (
            <List sx={{ flexBasis: '75%' }}>
              {locations.map(
                ({ encounter, nodeTier, nodeLetter, maxRetry }, idx) => (
                  <ListItem
                    key={`${nodeTier}${nodeLetter}`}
                    sx={{
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': {
                        borderBottom: '1px solid gray',
                      },
                    }}
                  >
                    <Typography>
                      {nodeTier}
                      {nodeLetter} {encounter}
                    </Typography>

                    {encounter !== ENCOUNTERS.C01H ? (
                      <Tries
                        tries={tries[idx].value ?? 0}
                        maxRetry={maxRetry}
                        setTries={payload => updateDaily({ id, idx, payload })}
                      />
                    ) : (
                      <Box sx={{ height: '3.5rem' }}></Box>
                    )}
                  </ListItem>
                ),
              )}
            </List>
          ) : (
            <Box flexBasis={'75%'}></Box>
          )}
        </ListItem>
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
