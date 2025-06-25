import type { IUser } from './user.types';

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface ILogInForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
