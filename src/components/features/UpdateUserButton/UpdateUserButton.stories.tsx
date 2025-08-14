import type { Meta, StoryObj } from '@storybook/react';

import UpdateUserButton from '@/components/features/UpdateUserButton/UpdateUserButton';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import type { IUser } from '@/types/user';

const mockUser: IUser = {
  id: '1',
  username: 'John Doe',
  email: 'john.doe@example.com',
  role: Role.USER,
  avatarUrl: DEFAULT_AVATAR,
  profiles: ['profile1', 'profile2'],
};

const meta: Meta<typeof UpdateUserButton> = {
  title: 'Features/UpdateUserButton',
  component: UpdateUserButton,
  argTypes: {
    user: {
      control: 'object',
    },
  },
  args: {
    user: mockUser,
  },
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
type Story = StoryObj<typeof UpdateUserButton>;

export const Default: Story = {};
