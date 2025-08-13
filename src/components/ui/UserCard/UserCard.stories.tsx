import type { Meta, StoryObj } from '@storybook/react';

import UserCard from '@/components/ui/UserCard/UserCard';
import { Role } from '@/enums/role';

const mockUser = {
  id: '123',
  username: 'JohnDoe',
  email: 'john@example.com',
  role: Role.USER,
  profiles: [],
  avatarUrl: undefined,
};

const meta: Meta<typeof UserCard> = {
  title: 'UI/UserCard',
  component: UserCard,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (path: string) => console.log(`Navigating to: ${path}`),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: mockUser,
  },
};
