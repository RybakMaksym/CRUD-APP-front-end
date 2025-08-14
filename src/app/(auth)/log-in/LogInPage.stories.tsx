import type { Meta, StoryObj } from '@storybook/react';

import LogInPage from '@/app/(auth)/log-in/page';

const meta: Meta<typeof LogInPage> = {
  title: 'Pages/LogInPage',
  component: LogInPage,
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
type Story = StoryObj<typeof LogInPage>;

export const Default: Story = {};
