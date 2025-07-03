import { IUser } from '@/types/user';

export interface ILogInForm {
  email: string;
  password: string;
}

export interface IRegisterForm extends ILogInForm {
  username: string;
  isAdmin?: boolean;
  avatar?: File | null;
}

export interface ITokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}
