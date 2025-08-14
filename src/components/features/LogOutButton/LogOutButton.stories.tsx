import type { Meta, StoryObj } from '@storybook/react';

import LogOutButton from '@/components/features/LogOutButton/LogOutButton';

const meta: Meta<typeof LogOutButton> = {
  title: 'Features/LogOutButton',
  component: LogOutButton,
  tags: ['autodocs'],
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogOutButton>;

export const Default: Story = {};
