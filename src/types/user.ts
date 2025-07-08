import { Role } from '@/enums/role';
import { IRegisterForm } from '@/types/auth';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export type IUserState = Partial<IUser>;

export type UpdateUserForm = Omit<IRegisterForm, 'password'>;
