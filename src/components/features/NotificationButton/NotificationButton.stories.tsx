import type { Meta, StoryObj } from '@storybook/react';

import NotificationButton from '@/components/features/NotificationButton/NotificationButton';

const meta: Meta<typeof NotificationButton> = {
  title: 'Features/NotificationButton',
  component: NotificationButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotificationButton>;

export const Default: Story = {};
