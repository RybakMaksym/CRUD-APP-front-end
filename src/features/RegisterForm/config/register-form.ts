import * as Yup from 'yup';

export const REGISTER_FORM_SCHEMA = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .matches(/^[^\s'"`\\]+$/, {
      message:
        'Password must not contain spaces or invalid characters like quotes or backslashes',
    }),
  isAdmin: Yup.boolean().default(false),
});

export const REGISTER_FORM_DEFAULT_VALUES = {
  username: '',
  email: '',
  password: '',
  isAdmin: false,
};
