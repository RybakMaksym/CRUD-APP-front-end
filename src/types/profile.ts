import type { Gender } from '@/enums/gender';

export interface IProfile {
  id: string;
  name: string;
  gender: Gender;
  birthDate: Date;
  country: string;
  city: string;
  avatarUrl?: string;
}
