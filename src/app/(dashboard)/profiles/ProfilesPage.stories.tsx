import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import ProfilesPage from '@/app/(dashboard)/profiles/page';
import { Gender } from '@/enums/gender';
import { NotificationType } from '@/enums/notification';
import type { IProfile } from '@/types/profile';

const myProfiles: IProfile[] = [
  {
    id: '1',
    name: 'Alice',
    gender: Gender.Female,
    birthDate: new Date('1990-01-01'),
    country: 'USA',
    city: 'New York',
    ownerId: '123',
  },
  {
    id: '2',
    name: 'Bob',
    gender: Gender.Male,
    birthDate: new Date('1985-05-10'),
    country: 'UK',
    city: 'London',
    ownerId: '123',
  },
];

const searchProfiles: IProfile[] = [
  {
    id: '10',
    name: 'Charlie',
    gender: Gender.Male,
    birthDate: new Date('1995-03-15'),
    country: 'Canada',
    city: 'Toronto',
    ownerId: '456',
  },
  {
    id: '11',
    name: 'Diana',
    gender: Gender.Female,
    birthDate: new Date('1992-07-20'),
    country: 'Germany',
    city: 'Berlin',
    ownerId: '789',
  },
];

const suggestions = ['USA', 'UK', 'Canada', 'Germany'];

const mockNotifications = [
  {
    id: '1',
    type: NotificationType.MADE_ADMIN,
    message: 'You were made an admin',
    createdAt: new Date(),
    ownerId: '123',
    isNew: true,
  },
  {
    id: '2',
    type: NotificationType.PROFILE_EDIT,
    message: 'Your profile was updated',
    createdAt: new Date(),
    ownerId: '123',
    isNew: false,
  },
  {
    id: '3',
    type: NotificationType.PROFILE_DELETE,
    message: 'A profile you follow was deleted',
    createdAt: new Date(),
    ownerId: '123',
  },
];

const meta: Meta<typeof ProfilesPage> = {
  title: 'Pages/ProfilesPage',
  component: ProfilesPage,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/my-profiles`,
          () => {
            return HttpResponse.json({
              data: myProfiles,
              page: 1,
              limit: 10,
              total: myProfiles.length,
              nextPage: null,
            });
          },
        ),
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/search`, () => {
          return HttpResponse.json(searchProfiles);
        }),
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/suggestions`,
          () => {
            return HttpResponse.json(suggestions);
          },
        ),
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/filter`, () => {
          return HttpResponse.json(searchProfiles);
        }),
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/notification`, () => {
          return HttpResponse.json({
            data: mockNotifications,
            page: 1,
            limit: 10,
            total: mockNotifications.length,
            nextPage: null,
          });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfilesPage>;

export const Default: Story = {};
