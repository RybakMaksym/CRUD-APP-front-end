import type { Meta, StoryObj } from '@storybook/react';

import SideBar from '@/components/features/SideBar/SideBar';
import { Role } from '@/enums/role';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const meta: Meta<typeof SideBar> = {
  title: 'Features/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  argTypes: {},
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
