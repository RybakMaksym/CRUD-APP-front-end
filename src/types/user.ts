import type { Role } from '@/enums/role';
import type { IRegisterForm } from '@/types/auth';

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export type IUserState = Partial<IUser>;

export type UpdateUserFormValues = Omit<IRegisterForm, 'password'>;
