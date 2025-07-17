import * as Yup from 'yup';

import { Gender } from '@/enums/gender';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@/lib/constants/password-validation';
import { QUOTATION_MARK_PATTERN } from '@/lib/constants/patterns';
import type { ILogInForm, IRegisterForm } from '@/types/auth';
import type { CreateProfileForm } from '@/types/profile';

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

const USERNAME_VALIDATION = Yup.string().required('Required');

const IS_ADMIN_VALIDATION = Yup.boolean().default(false);

export const LOG_IN_FORM_SCHEMA = AUTH_SCHEMA;

export const REGISTER_FORM_SCHEMA = AUTH_SCHEMA.concat(
  Yup.object({
    username: USERNAME_VALIDATION,
    isAdmin: IS_ADMIN_VALIDATION,
  }),
);

export const UPDATE_USER_FORM_SCHEMA = Yup.object({
  email: EMAIL_VALIDATION,
  username: USERNAME_VALIDATION,
  isAdmin: IS_ADMIN_VALIDATION,
  avatar: Yup.string().default(DEFAULT_AVATAR),
});

const DATE_VALIDATION = Yup.date()
  .max(new Date(), 'Date cannot be in the future')
  .required('Birth date is required');

const GENDER_VALIDATION = Yup.mixed<Gender>()
  .oneOf(Object.values(Gender), 'Invalid gender')
  .required('Gender is required');

const COUNTRY_VALIDATION = Yup.string().required('Required');
const CITY_VALIDATION = Yup.string().required('Required');

export const CREATE_PROFILE_FORM_SCHEMA = Yup.object({
  name: USERNAME_VALIDATION,
  birthDate: DATE_VALIDATION,
  gender: GENDER_VALIDATION,
  country: COUNTRY_VALIDATION,
  city: CITY_VALIDATION,
  avatar: Yup.string().default(DEFAULT_AVATAR),
});

export const CREATE_PROFILE_FORM_DEFAULT_VALUES: CreateProfileForm = {
  name: '',
  birthDate: new Date(),
  gender: Gender.Male,
  country: '',
  city: '',
  avatarUrl: DEFAULT_AVATAR,
};

export const LOG_IN_FORM_DEFAULT_VALUES: ILogInForm = {
  email: '',
  password: '',
};

export const REGISTER_FORM_DEFAULT_VALUES: IRegisterForm = {
  ...LOG_IN_FORM_DEFAULT_VALUES,
  username: '',
  isAdmin: false,
};
