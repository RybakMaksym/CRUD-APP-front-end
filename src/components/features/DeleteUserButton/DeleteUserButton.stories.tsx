import type { Meta, StoryObj } from '@storybook/react';

import DeleteUserButton from '@/components/features/DeleteUserButton/DeleteUserButton';

const meta: Meta<typeof DeleteUserButton> = {
  title: 'Features/DeleteUserButton',
  component: DeleteUserButton,
  tags: ['autodocs'],
  argTypes: {
    userId: { control: 'text' },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (path: string) => console.log(`Navigating to: ${path}`),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeleteUserButton>;

export const Default: Story = {
  args: {
    userId: '123',
  },
};
