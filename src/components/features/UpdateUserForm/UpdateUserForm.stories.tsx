import type { Meta, StoryObj } from '@storybook/react';

import UpdateUserForm from '@/components/features/UpdateUserForm/UpdateUserForm';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { Languages } from '@/types/languages';
import type { IUser } from '@/types/user';

const meta: Meta<typeof UpdateUserForm> = {
  title: 'Forms/UpdateUserForm',
  component: UpdateUserForm,
  tags: ['autodocs'],
  argTypes: {
    user: { control: 'object' },
    onConfirm: { action: 'ocnfirmed' },
    onClose: { action: 'closed' },
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
type Story = StoryObj<typeof UpdateUserForm>;

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
    onClose: () => alert('Closed'),
    onConfirm: () => alert('Saved'),
  },
};
