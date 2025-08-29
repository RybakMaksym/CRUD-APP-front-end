import type { Meta, StoryObj } from '@storybook/react';

import UserCard from '@/components/ui/UserCard/UserCard';
import { Role } from '@/enums/role';
import { Languages } from '@/types/languages';

const mockUser = {
  id: '123',
  username: 'JohnDoe',
  email: 'john@example.com',
  role: Role.USER,
  profiles: [],
  avatarUrl: undefined,
  language: Languages.ENGLISH,
};

const meta: Meta<typeof UserCard> = {
  title: 'UI/UserCard',
  component: UserCard,
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
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: mockUser,
  },
};
