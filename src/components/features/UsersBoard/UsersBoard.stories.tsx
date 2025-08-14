import type { Meta, StoryObj } from '@storybook/react';

import UsersBoard from '@/components/features/UsersBoard/UsersBoard';

const meta: Meta<typeof UsersBoard> = {
  title: 'Features/UsersBoard',
  component: UsersBoard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof UsersBoard>;

export const Default: Story = {};
