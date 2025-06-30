import { IUser } from '@/shared/types/user.types';

export interface ILogInForm {
  email: string;
  password: string;
}

export interface IRegisterForm extends ILogInForm {
  username: string;
  isAdmin: boolean;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
