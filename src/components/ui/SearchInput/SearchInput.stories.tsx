import type { Meta, StoryObj } from '@storybook/react';

import SearchInput from '@/components/ui/SearchInput/SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'UI/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      defaultValue: 'Search...',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled search',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Full width search',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const DarkBackground: Story = {
  args: {
    placeholder: 'Search on dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
