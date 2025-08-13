import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import UserProfile from '@/components/ui/UserProfile/UserProfile';

const mockStore = configureStore({
  reducer: {
    user: () => ({
      username: 'JohnDoe',
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
  args: {},
};
