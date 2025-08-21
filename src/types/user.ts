import type { Role } from '@/enums/role';
import type { IRegisterForm } from '@/types/auth';
import type { Languages } from '@/types/languages';

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  language: Languages;
  profiles: string[];
}

export type IUserState = Partial<IUser>;

export type UpdateUserFormValues = Omit<
  IRegisterForm,
  'password' | 'id' | 'profiles'
>;
