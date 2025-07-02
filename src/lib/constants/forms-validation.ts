import * as Yup from 'yup';

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_INVALID_CHARACTARS,
} from '@/lib/constants/password-validation';
import { ILogInForm, IRegisterForm } from '@/types/auth';

const EMAIL_VALIDATION = Yup.string()
  .email('Invalid email')
  .required('Required');

const PASSWORD_VALIDATION = Yup.string()
  .required('Required')
  .min(MIN_PASSWORD_LENGTH, 'Password must be at least 8 characters')
  .max(MAX_PASSWORD_LENGTH, 'Password must be at most 32 characters')
  .matches(PASSWORD_INVALID_CHARACTARS, {
    message:
      'Password must not contain spaces or invalid characters like quotes or backslashes',
  });

const AUTH_SCHEMA = Yup.object({
  email: EMAIL_VALIDATION,
  password: PASSWORD_VALIDATION,
});

export const LOG_IN_FORM_SCHEMA = AUTH_SCHEMA;

export const REGISTER_FORM_SCHEMA = AUTH_SCHEMA.concat(
  Yup.object({
    username: Yup.string().required('Required'),
    isAdmin: Yup.boolean().default(false),
  }),
);

export const LOG_IN_FORM_DEFAULT_VALUES: ILogInForm = {
  email: '',
  password: '',
};

export const REGISTER_FORM_DEFAULT_VALUES: IRegisterForm = {
  ...LOG_IN_FORM_DEFAULT_VALUES,
  username: '',
  isAdmin: false,
};
