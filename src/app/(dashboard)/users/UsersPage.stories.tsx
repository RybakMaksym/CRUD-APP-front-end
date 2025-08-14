import type { Meta, StoryObj } from '@storybook/react';

import UsersPage from '@/app/(dashboard)/users/page';

const meta: Meta<typeof UsersPage> = {
  title: 'Pages/UsersPage',
  component: UsersPage,
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
type Story = StoryObj<typeof UsersPage>;

export const Default: Story = {};
