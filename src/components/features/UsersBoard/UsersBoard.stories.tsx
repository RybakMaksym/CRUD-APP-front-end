import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import UsersBoard from '@/components/features/UsersBoard/UsersBoard';
import { Role } from '@/enums/role';
import { Languages } from '@/types/languages';
import type { IUser } from '@/types/user';

const listUsers: IUser[] = [
  {
    id: '1',
    username: 'Alice',
    email: 'alice@example.com',
    role: Role.USER,
    profiles: ['profile1', 'profile2'],
    language: Languages.ENGLISH,
  },
  {
    id: '2',
    username: 'Bob',
    email: 'bob@example.com',
    role: Role.ADMIN,
    profiles: ['profile3'],
    language: Languages.ENGLISH,
  },
  {
    id: '3',
    username: 'Charlie',
    email: 'charlie@example.com',
    role: Role.USER,
    profiles: [],
    language: Languages.ENGLISH,
  },
];

const searchUsers: IUser[] = [
  {
    id: '10',
    username: 'SearchJohn',
    email: 'search.john@example.com',
    role: Role.USER,
    profiles: ['profile4'],
    language: Languages.ENGLISH,
  },
  {
    id: '11',
    username: 'SearchJane',
    email: 'search.jane@example.com',
    role: Role.ADMIN,
    profiles: ['profile5', 'profile6'],
    language: Languages.ENGLISH,
  },
];

const meta: Meta<typeof UsersBoard> = {
  title: 'Features/UsersBoard',
  component: UsersBoard,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (path: string) => console.log(`Navigating to: ${path}`),
      },
    },
    msw: {
      handlers: [
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/list`, () => {
          return HttpResponse.json(listUsers);
        }),
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/total`, () => {
          return HttpResponse.json({ total: listUsers.length });
        }),
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/search`, () => {
          return HttpResponse.json(searchUsers);
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UsersBoard>;

export const Default: Story = {};
