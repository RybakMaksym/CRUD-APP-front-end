import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import SideBar from '@/components/features/SideBar/SideBar';
import { Role } from '@/enums/role';

const meta: Meta<typeof SideBar> = {
  title: 'Features/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  argTypes: {},
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
type Story = StoryObj<typeof SideBar>;

const mockUserStore = configureStore({
  reducer: {
    user: () => ({
      username: 'JohnDoe',
      email: 'john@example.com',
      role: Role.USER,
    }),
  },
});

export const UserSidebar: Story = {
  decorators: [
    (Story) => (
      <Provider store={mockUserStore}>
        <Story />
      </Provider>
    ),
  ],
};

const mockAdminStore = configureStore({
  reducer: {
    user: () => ({
      username: 'JohnDoe',
      email: 'john@example.com',
      role: Role.ADMIN,
    }),
  },
});

export const AdminSidebar: Story = {
  decorators: [
    (Story) => (
      <Provider store={mockAdminStore}>
        <Story />
      </Provider>
    ),
  ],
};
