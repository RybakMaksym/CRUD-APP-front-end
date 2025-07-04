import { Role } from '@/enums/role';

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export type IUserState = Partial<IUser>;
