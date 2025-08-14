import type { Meta, StoryObj } from '@storybook/react';

import CustomPagination from '@/components/ui/CustomPagination/CustomPagination';

const meta: Meta<typeof CustomPagination> = {
  title: 'UI/CustomPagination',
  component: CustomPagination,
  tags: ['autodocs'],
  argTypes: {
    totalPages: { control: 'number' },
    page: { control: 'number' },
    onChange: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomPagination>;

export const Default: Story = {
  args: {
    totalPages: 10,
    page: 1,
    onChange: () => {},
  },
};

export const MiddlePage: Story = {
  args: {
    totalPages: 20,
    page: 10,
    onChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    totalPages: 5,
    page: 5,
    onChange: () => {},
  },
};
