import type { Meta, StoryObj } from '@storybook/react';

import CustomLink from '@/components/ui/CustomLink/CustomLink';

const meta: Meta<typeof CustomLink> = {
  title: 'UI/CustomLink',
  component: CustomLink,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    linkVariant: {
      control: 'select',
      options: ['white', 'red'],
    },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomLink>;

export const RedVariant: Story = {
  args: {
    href: '/home',
    linkVariant: 'red',
    children: 'Red Link',
  },
};

export const WhiteVariant: Story = {
  args: {
    href: '/about',
    linkVariant: 'white',
    children: 'White Link',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
};
