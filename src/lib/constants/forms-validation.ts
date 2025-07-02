import * as Yup from 'yup';

const EMAIL_VALIDATION = Yup.string()
  .email('Invalid email')
  .required('Required');

const PASSWORD_VALIDATION = Yup.string()
  .required('Required')
  .min(8, 'Password must be at least 8 characters')
  .max(32, 'Password must be at most 32 characters')
  .matches(/^[^\s'"`\\]+$/, {
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

export const LOG_IN_FORM_DEFAULT_VALUES = { email: '', password: '' };

export const REGISTER_FORM_DEFAULT_VALUES = {
  ...LOG_IN_FORM_DEFAULT_VALUES,
  username: '',
  isAdmin: false,
};
