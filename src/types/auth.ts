import { IUser } from '@/types/user';

export interface ILogInForm {
  email: string;
  password: string;
}

export interface IRegisterForm extends ILogInForm {
  username: string;
  isAdmin: boolean;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface IAuthResponse extends AuthState {
  user: IUser;
}
