import type { Meta, StoryObj } from '@storybook/react';

import UserDetailsPage from '@/app/(dashboard)/users/[id]/page';

const meta: Meta<typeof UserDetailsPage> = {
  title: 'Pages/UserDetailsPage',
  component: UserDetailsPage,
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
type Story = StoryObj<typeof UserDetailsPage>;

export const Default: Story = {};
