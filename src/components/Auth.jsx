import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import {
  registerFormValidationSchema,
  loginFormValidationSchema,
} from '../validation';

import { FIELDS } from '../constants';

import Link from './Link';
import Form from './Form';

export const TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const INITIAL_STATE_LOGIN = {
  [FIELDS.EMAIL]: '',
  [FIELDS.PASSWORD]: '',
};

const INITIAL_STATE_REGISTER = {
  ...INITIAL_STATE_LOGIN,
  [FIELDS.NAME]: '',
  [FIELDS.CONFIRM_PASSWORD]: '',
};

const FIELDS_LOGIN = [FIELDS.EMAIL, FIELDS.PASSWORD];
const FIELDS_REGISTER = [FIELDS.NAME, ...FIELDS_LOGIN, FIELDS.CONFIRM_PASSWORD];

const Auth = ({ type = TYPES.LOGIN }) => {
  const isRegister = type === TYPES.REGISTER;
  const fields = isRegister ? FIELDS_REGISTER : FIELDS_LOGIN;
  const initialState = isRegister
    ? INITIAL_STATE_REGISTER
    : INITIAL_STATE_LOGIN;
  const schema = isRegister
    ? registerFormValidationSchema
    : loginFormValidationSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    resolver: yupResolver(schema),
  });

  const onSubmit = data => console.log(data);

  return (
    <Box component="section">
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component={'h1'}
          textAlign="center"
          mb="1rem"
          textTransform="capitalize"
        >
          {type}
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map(field => (
            <label key={field}>
              <Controller
                name={field}
                control={control}
                render={({ field }) => (
                  <TextField
                    label={`${field.name[0].toUpperCase()}${field.name.slice(
                      1,
                    )}`}
                    value={field.value}
                    onChange={field.onChange}
                    variant="outlined"
                    fullWidth
                    type={
                      field.name === FIELDS.PASSWORD ||
                      field.name === FIELDS.CONFIRM_PASSWORD
                        ? 'password'
                        : 'text'
                    }
                  />
                )}
              />
              {errors[field] && (
                <Typography variant="base1" color="error">
                  {errors[field].message}
                </Typography>
              )}
            </label>
          ))}
          <Button variant="contained" type="submit">
            {type}
          </Button>
        </Form>
        <Typography mt="1rem" textAlign="center">
          {isRegister ? 'Already' : "Don't"} have an account? &nbsp;
          <Link href={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Log in' : 'Register'}
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

Auth.propTypes = {
  type: PropTypes.oneOf(Object.values(TYPES)),
};

export default Auth;
