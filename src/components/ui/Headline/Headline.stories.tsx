import type { Meta, StoryObj } from '@storybook/react';

import Headline from '@/components/ui/Headline/Headline';

const meta: Meta<typeof Headline> = {
  title: 'UI/Headline',
  component: Headline,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['45px', '35px', '32px', '18px'],
    },
    color: {
      control: 'select',
      options: ['white', 'dark'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Headline>;

export const Default: Story = {
  args: {
    children: 'This is a headline',
    size: '45px',
    color: 'white',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
};

export const SmallDark: Story = {
  args: {
    children: 'Small Dark Headline',
    size: '18px',
    color: 'dark',
  },
};
