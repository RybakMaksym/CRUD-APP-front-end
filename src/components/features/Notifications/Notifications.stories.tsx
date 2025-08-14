import type { Meta, StoryObj } from '@storybook/react';

import Notifications from '@/components/features/Notifications/Notifications';

const meta: Meta<typeof Notifications> = {
  title: 'Features/Notifications',
  component: Notifications,
  tags: ['autodocs'],
  argTypes: {
    shouldRefetch: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {
  render: (args) => {
    return <Notifications shouldRefetch={args.shouldRefetch} />;
  },
  args: {
    shouldRefetch: false,
  },
};
