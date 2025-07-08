import * as Yup from 'yup';

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@/lib/constants/password-validation';
import { QUOTATION_MARK_PATTERN } from '@/lib/constants/patterns';
import { ILogInForm, IRegisterForm } from '@/types/auth';

const EMAIL_VALIDATION = Yup.string()
  .email('Invalid email')
  .required('Required');

const PASSWORD_VALIDATION = Yup.string()
  .required('Required')
  .min(
    MIN_PASSWORD_LENGTH,
    `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  )
  .max(
    MAX_PASSWORD_LENGTH,
    `Password must be at most ${MAX_PASSWORD_LENGTH} characters`,
  )
  .matches(QUOTATION_MARK_PATTERN, {
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
