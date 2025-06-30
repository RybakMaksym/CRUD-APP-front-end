import * as Yup from 'yup';

export const LOG_IN_FORM_SCHEMA = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .matches(/^[^\s'"`\\]+$/, {
      message:
        'Password must not contain spaces or invalid characters like quotes or backslashes',
    }),
});

export const LOG_IN_FORM_DEFAULT_VALUES = { email: '', password: '' };
