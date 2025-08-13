import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import UpdateUserForm from '@/components/features/UpdateUserForm/UpdateUserForm';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { store } from '@/redux/store';
import type { IUser } from '@/types/user';

const meta: Meta<typeof UpdateUserForm> = {
  title: 'Forms/UpdateUserForm',
  component: UpdateUserForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
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
};

export const Default: Story = {
  args: {
    user: mockUser,
    onClose: () => alert('Closed'),
    onConfirm: () => alert('Saved'),
  },
};
