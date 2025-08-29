import type { Meta, StoryObj } from '@storybook/react';

import RegisterForm from '@/components/features/RegisterForm/RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  title: 'Forms/RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
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
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  args: {
    title: 'Register',
  },
};
