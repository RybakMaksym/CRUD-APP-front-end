import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import UserDetails from '@/components/features/UserDetails/UserDetails';
import { Gender } from '@/enums/gender';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { Languages } from '@/types/languages';
import type { IPaginatedResponse } from '@/types/navigation';
import type { IProfile } from '@/types/profile';
import type { IUser } from '@/types/user';

const mockProfiles: IPaginatedResponse<IProfile> = {
  data: [
    {
      id: '1',
      name: 'John Doe',
      gender: Gender.Male,
      birthDate: new Date('1990-05-15'),
      country: 'USA',
      city: 'New York',
      ownerId: '123',
    },
    {
      id: '2',
      name: 'Jane Smith',
      gender: Gender.Female,
      birthDate: new Date('1995-09-21'),
      country: 'UK',
      city: 'London',
      ownerId: '123',
    },
  ],
  page: 1,
  limit: 10,
  total: 2,
  nextPage: null,
};

const meta: Meta<typeof UserDetails> = {
  title: 'Features/UserDetails',
  component: UserDetails,
  tags: ['autodocs'],
  argTypes: {
    user: { control: 'object' },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (path: string) => console.log(`Navigating to: ${path}`),
      },
    },
    msw: {
      handlers: [
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/profiles/:id`,
          () => {
            return HttpResponse.json(mockProfiles);
          },
        ),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserDetails>;

const mockUser: IUser = {
  id: '1',
  username: 'John Doe',
  email: 'john.doe@example.com',
  role: Role.USER,
  avatarUrl: DEFAULT_AVATAR,
  profiles: ['profile1', 'profile2'],
  language: Languages.ENGLISH,
};

export const Default: Story = {
  args: {
    user: mockUser,
  },
};

export const AdminUser: Story = {
  args: {
    user: { ...mockUser, role: Role.ADMIN, username: 'Admin User' },
  },
};
