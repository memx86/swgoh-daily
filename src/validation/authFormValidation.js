import * as yup from 'yup';

import { FIELDS } from '../constants';

export const registerFormValidationSchema = yup
  .object({
    [FIELDS.NAME]: yup.string().required(),
    [FIELDS.EMAIL]: yup.string().email().required(),
    [FIELDS.PASSWORD]: yup.string().required(),
    [FIELDS.CONFIRM_PASSWORD]: yup
      .string()
      .oneOf([yup.ref(FIELDS.PASSWORD)], 'passwords should match')
      .required(),
  })
  .required();

export const loginFormValidationSchema = yup
  .object({
    [FIELDS.EMAIL]: yup.string().email().required(),
    [FIELDS.PASSWORD]: yup.string().required(),
  })
  .required();
