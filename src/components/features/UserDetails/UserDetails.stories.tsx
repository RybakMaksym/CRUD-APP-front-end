import type { Meta, StoryObj } from '@storybook/react';

import UserDetails from '@/components/features/UserDetails/UserDetails';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import type { IUser } from '@/types/user';

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
