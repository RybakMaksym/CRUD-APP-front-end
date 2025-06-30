import * as Yup from 'yup';

import { AUTH_SCHEMA } from '@/lib/schemas/auth-schema';

export const REGISTER_FORM_SCHEMA = AUTH_SCHEMA.concat(
  Yup.object({
    username: Yup.string().required('Required'),
    isAdmin: Yup.boolean().default(false),
  }),
);

export const REGISTER_FORM_DEFAULT_VALUES = {
  username: '',
  email: '',
  password: '',
  isAdmin: false,
};
