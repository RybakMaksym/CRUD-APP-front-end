import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import LogOutButton from '@/components/features/LogOutButton/LogOutButton';
import { store } from '@/redux/store';

const meta: Meta<typeof LogOutButton> = {
  title: 'Features/LogOutButton',
  component: LogOutButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogOutButton>;

export const Default: Story = {};
