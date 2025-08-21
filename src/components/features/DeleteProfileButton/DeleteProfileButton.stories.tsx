import type { Meta, StoryObj } from '@storybook/react';

import DeleteProfileButton from '@/components/features/DeleteProfileButton/DeleteProfileButton';

const meta: Meta<typeof DeleteProfileButton> = {
  title: 'Features/DeleteProfileButton',
  component: DeleteProfileButton,
  tags: ['autodocs'],
  args: {
    profileId: '123',
  },
  argTypes: {
    profileId: { control: 'text' },
    onConfirm: { action: 'confirmed' },
  },
};

export default meta;
type Story = StoryObj<typeof DeleteProfileButton>;

export const Default: Story = {};
