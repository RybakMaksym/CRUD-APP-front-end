import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import UsersProfiles from '@/components/features/UsersProfiles/UsersProfiles';
import { Gender } from '@/enums/gender';
import type { IPaginatedResponse } from '@/types/navigation';
import type { IProfile } from '@/types/profile';

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

const meta: Meta<typeof UsersProfiles> = {
  title: 'Features/UsersProfiles',
  component: UsersProfiles,
  tags: ['autodocs'],
  argTypes: {
    userId: { control: 'text' },
  },
  args: {
    userId: '123',
  },
  parameters: {
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
type Story = StoryObj<typeof UsersProfiles>;

export const Default: Story = {};
