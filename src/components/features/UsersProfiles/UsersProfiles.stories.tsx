import type { Meta, StoryObj } from '@storybook/react';

import UsersProfiles from '@/components/features/UsersProfiles/UsersProfiles';

const meta: Meta<typeof UsersProfiles> = {
  title: 'Features/UsersProfiles',
  component: UsersProfiles,
  tags: ['autodocs'],
  argTypes: {
    userId: { control: 'text' },
  },
  args: {
    userId: '123',
  },
};

export default meta;
type Story = StoryObj<typeof UsersProfiles>;

export const Default: Story = {};
