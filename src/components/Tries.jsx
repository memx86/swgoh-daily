import { useState } from 'react';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';

const Tries = ({ tries, maxRetry, setTries }) => {
  const [value, setValue] = useState(tries);

  const onChange = e => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0 || value > maxRetry) return;
    setValue(value);
  };

  const onBlur = e => {
    const value = Number(e.target.value);
    if (value === tries) return;
    setTries(value);
  };

  return (
    <FormControl
      sx={{ minWidth: '3.75rem', maxWidth: '3.75rem' }}
      variant="outlined"
    >
      <OutlinedInput
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        endAdornment={
          <InputAdornment position="end">/ {maxRetry}</InputAdornment>
        }
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          min: 0,
          max: maxRetry,
        }}
        sx={{ fontSize: '0.8rem' }}
      />
    </FormControl>
  );
};

Tries.propTypes = {
  tries: PropTypes.number.isRequired,
  maxRetry: PropTypes.number.isRequired,
  setTries: PropTypes.func.isRequired,
};

export default Tries;
