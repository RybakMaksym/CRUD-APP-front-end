import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import UserDetailsPage from '@/app/(dashboard)/users/[id]/page';
import { Gender } from '@/enums/gender';
import { Role } from '@/enums/role';
import type { IPaginatedResponse } from '@/types/navigation';
import type { IProfile } from '@/types/profile';

const mockUser = {
  id: '123',
  username: 'johndoe',
  email: 'johndoe@example.com',
  role: Role.USER,
  profiles: ['1', '2'],
};

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

const meta: Meta<typeof UserDetailsPage> = {
  title: 'Pages/UserDetailsPage',
  component: UserDetailsPage,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (path: string) => console.log(`Navigating to: ${path}`),
      },
    },
    msw: {
      handlers: [
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/:id`, () => {
          return HttpResponse.json(mockUser);
        }),
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
type Story = StoryObj<typeof UserDetailsPage>;

export const Default: Story = {};
