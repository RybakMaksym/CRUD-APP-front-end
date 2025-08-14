import type { Meta, StoryObj } from '@storybook/react';

import StatsBox from '@/components/features/StatsBox/StatsBox';

const meta: Meta<typeof StatsBox> = {
  title: 'Features/StatsBox',
  component: StatsBox,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StatsBox>;

export const Default: Story = {};
