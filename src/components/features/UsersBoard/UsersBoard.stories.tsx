import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import UsersBoard from '@/components/features/UsersBoard/UsersBoard';
import { Role } from '@/enums/role';
import { IUser } from '@/types/user';

const listUsers: IUser[] = [
  {
    id: '1',
    username: 'Alice',
    email: 'alice@example.com',
    role: Role.USER,
    profiles: ['profile1', 'profile2'],
  },
  {
    id: '2',
    username: 'Bob',
    email: 'bob@example.com',
    role: Role.ADMIN,
    profiles: ['profile3'],
  },
  {
    id: '3',
    username: 'Charlie',
    email: 'charlie@example.com',
    role: Role.USER,
    profiles: [],
  },
];

const searchUsers: IUser[] = [
  {
    id: '10',
    username: 'SearchJohn',
    email: 'search.john@example.com',
    role: Role.USER,
    profiles: ['profile4'],
  },
  {
    id: '11',
    username: 'SearchJane',
    email: 'search.jane@example.com',
    role: Role.ADMIN,
    profiles: ['profile5', 'profile6'],
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
