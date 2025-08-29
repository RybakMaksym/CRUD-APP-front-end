import type { Meta, StoryObj } from '@storybook/react';

import StatsBoard from '@/components/features/StatsBoard/StatsBoard';

const meta: Meta<typeof StatsBoard> = {
  title: 'Features/StatsBoard',
  component: StatsBoard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StatsBoard>;

export const Default: Story = {};
