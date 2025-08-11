import UserProfile from '@/components/ui/UserProfile/UserProfile';
import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const mockStore = configureStore({
  reducer: {
    user: () => ({
      username: 'JohnDoe',
      avatarUrl: '/path/to/avatar.jpg',
      email: 'john@example.com',
    }),
  },
});

const meta: Meta<typeof UserProfile> = {
  title: 'UI/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <Provider
        store={configureStore({
          reducer: {
            user: () => ({
              username: 'JaneSmith',
              avatarUrl: undefined,
              email: 'jane@example.com',
            }),
          },
        })}
      >
        <Story />
      </Provider>
    ),
  ],
};
