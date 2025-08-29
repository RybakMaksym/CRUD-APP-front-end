import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '@/components/ui/Avatar/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: '/assets/avatars/default-avatar.png',
    alt: 'User avatar',
    width: 100,
    height: 100,
  },
};

export const Small: Story = {
  args: {
    src: '/assets/avatars/default-avatar.png',
    alt: 'User avatar',
    width: 40,
    height: 40,
  },
};

export const Large: Story = {
  args: {
    src: '/assets/avatars/default-avatar.png',
    alt: 'User avatar',
    width: 150,
    height: 150,
  },
};
