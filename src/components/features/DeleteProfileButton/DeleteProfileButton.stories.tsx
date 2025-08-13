import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import DeleteProfileButton from '@/components/features/DeleteProfileButton/DeleteProfileButton';
import { store } from '@/redux/store';

const meta: Meta<typeof DeleteProfileButton> = {
  title: 'Features/DeleteProfileButton',
  component: DeleteProfileButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    profileId: '123',
    onConfirm: () => alert('Profile deleted'),
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DeleteProfileButton>;

export const Default: Story = {};
