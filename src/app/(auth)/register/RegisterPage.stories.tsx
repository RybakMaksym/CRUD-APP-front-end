import type { Meta, StoryObj } from '@storybook/react';

import RegisterPage from '@/app/(auth)/register/page';

const meta: Meta<typeof RegisterPage> = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
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
type Story = StoryObj<typeof RegisterPage>;

export const Default: Story = {};
