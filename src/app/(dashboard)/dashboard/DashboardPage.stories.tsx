import type { Meta, StoryObj } from '@storybook/react';

import DashBaordPage from '@/app/(dashboard)/dashboard/page';

const meta: Meta<typeof DashBaordPage> = {
  title: 'Pages/DashBaordPage',
  component: DashBaordPage,
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
type Story = StoryObj<typeof DashBaordPage>;

export const Default: Story = {};
