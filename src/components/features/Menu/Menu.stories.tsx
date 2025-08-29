import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import Menu from '@/components/features/Menu/Menu';
import { Role } from '@/enums/role';

const mockAdminStore = configureStore({
  reducer: {
    user: () => ({
      username: 'JohnDoe',
      email: 'john@example.com',
      role: Role.ADMIN,
    }),
  },
});

const mockUserStore = configureStore({
  reducer: {
    user: () => ({
      username: 'JohnDoe',
      email: 'john@example.com',
      role: Role.USER,
    }),
  },
});

const meta: Meta<typeof Menu> = {
  title: 'Features/Menu',
  component: Menu,
  tags: ['autodocs'],
  globals: {
    backgrounds: {
      value: 'dark',
    },
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
type Story = StoryObj<typeof Menu>;

export const AdminMenu: Story = {
  decorators: [
    (Story) => (
      <Provider store={mockAdminStore}>
        <Story />
      </Provider>
    ),
  ],
};

export const UserMenu: Story = {
  decorators: [
    (Story) => (
      <Provider store={mockUserStore}>
        <Story />
      </Provider>
    ),
  ],
};
