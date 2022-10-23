import { useState } from 'react';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PropTypes from 'prop-types';

const AddDaily = ({ addDaily, options }) => {
  const [isAdding, setIsAdding] = useState(false);

  const showSelect = () => setIsAdding(true);
  const hideSelect = () => setIsAdding(false);
  const onChange = (_, option) => {
    addDaily(option.value);
    hideSelect();
  };
  return isAdding ? (
    <Autocomplete
      onChange={onChange}
      options={options}
      onBlur={hideSelect}
      sx={{ width: '20rem' }}
      renderInput={params => <TextField {...params} label="Character" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      selectOnFocus
      clearOnBlur
      clearOnEscape
      handleHomeEndKeys
      openOnFocus
    />
  ) : (
    <IconButton color="info" onClick={showSelect} aria-label="Add character">
      <AddBoxOutlinedIcon fontSize="large" />
    </IconButton>
  );
};

AddDaily.propTypes = {
  addDaily: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AddDaily;
