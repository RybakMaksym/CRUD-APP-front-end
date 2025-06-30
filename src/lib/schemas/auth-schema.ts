import * as Yup from 'yup';

export const EMAIL_VALIDATION = Yup.string()
  .email('Invalid email')
  .required('Required');

export const PASSWORD_VALIDATION = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(32, 'Password must be at most 32 characters')
  .matches(/^[^\s'"`\\]+$/, {
    message:
      'Password must not contain spaces or invalid characters like quotes or backslashes',
  });

export const AUTH_SCHEMA = Yup.object({
  email: EMAIL_VALIDATION,
  password: PASSWORD_VALIDATION,
});
