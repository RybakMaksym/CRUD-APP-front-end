import type { Meta, StoryObj } from '@storybook/react';

import CustomIconButton from '@/components/ui/CustomIconButton/CustomIconButton';

const meta: Meta<typeof CustomIconButton> = {
  title: 'UI/CustomIconButton',
  component: CustomIconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};

export default meta;
type Story = StoryObj<typeof CustomIconButton>;

export const Default: Story = {
  args: {
    icon: '/assets/icons/notifications.svg',
  },
};

export const Disabled: Story = {
  args: {
    icon: '/assets/icons/notifications.svg',
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    icon: '/assets/icons/notifications.svg',
    size: 'small',
  },
};
