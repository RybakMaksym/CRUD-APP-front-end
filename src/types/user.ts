import type { Role } from '@/enums/role';
import type { IRegisterForm } from '@/types/auth';
import type { IProfile } from '@/types/profile';

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  profiles: string[] | IProfile[];
}

export type IUserState = Partial<IUser>;

export type UpdateUserFormValues = Omit<
  IRegisterForm,
  'password' | 'id' | 'profiles'
>;
