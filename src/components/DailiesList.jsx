import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';

import { BASE_IMG_URL } from '../constants/BASE_IMG_URL';

import DeleteButton from './DeleteButton';
import Tries from './Tries';

const DailiesList = ({ dailies, deleteDaily, updateDaily }) => {
  return (
    <List>
      {dailies?.map(({ id, nameKey, thumbnailName, locations, tries }) => (
        <ListItem key={id} disablePadding>
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
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <Typography>
                      {nodeTier}
                      {nodeLetter} {encounter}
                    </Typography>
                    <Tries
                      tries={tries[idx].value ?? 0}
                      maxRetry={maxRetry}
                      setTries={payload => updateDaily({ id, idx, payload })}
                    />
                  </ListItem>
                ),
              )}
            </List>
          ) : (
            <Box flexBasis={'75%'}></Box>
          )}
          <Divider component="div" />
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
