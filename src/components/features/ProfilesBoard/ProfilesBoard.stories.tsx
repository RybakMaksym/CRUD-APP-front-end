import type { Meta, StoryObj } from '@storybook/react';

import ProfilesBoard from '@/components/features/ProfilesBoard/ProfilesBoard';

const meta: Meta<typeof ProfilesBoard> = {
  title: 'Features/ProfilesBoard',
  component: ProfilesBoard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProfilesBoard>;

export const Default: Story = {};
