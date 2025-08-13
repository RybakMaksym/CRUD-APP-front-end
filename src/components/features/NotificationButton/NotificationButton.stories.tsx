import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import NotificationButton from '@/components/features/NotificationButton/NotificationButton';
import { store } from '@/redux/store';

const meta: Meta<typeof NotificationButton> = {
  title: 'Features/NotificationButton',
  component: NotificationButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotificationButton>;

export const Default: Story = {};
