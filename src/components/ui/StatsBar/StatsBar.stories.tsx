import type { Meta, StoryObj } from '@storybook/react';

import StatsBar from '@/components/ui/StatsBar/StatsBar';

const mockIcons = {
  users: '/assets/icons/users-group.svg',
  profiles: '/assets/icons/profile.svg',
  abults: '/assets/icons/adults.svg',
};

const meta: Meta<typeof StatsBar> = {
  title: 'UI/StatsBar',
  component: StatsBar,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: Object.values(mockIcons),
      mapping: mockIcons,
    },
    label: {
      control: 'text',
    },
    count: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatsBar>;

const Template: Story = {
  render: (args) => <StatsBar {...args} />,
};

export const Default: Story = {
  ...Template,
  args: {
    icon: mockIcons.users,
    label: 'Total Users',
    count: 1243,
  },
};

export const ProfilesStats: Story = {
  ...Template,
  args: {
    icon: mockIcons.profiles,
    label: 'Profiles',
    count: 56,
  },
};

export const UserStats: Story = {
  ...Template,
  args: {
    icon: mockIcons.users,
    label: 'Total Users',
    count: 125000,
  },
};

export const ZeroCount: Story = {
  ...Template,
  args: {
    ...Default.args,
    count: 0,
  },
};

export const LongLabel: Story = {
  ...Template,
  args: {
    ...Default.args,
    label: 'Very Long Statistic Label That Wraps',
  },
};
