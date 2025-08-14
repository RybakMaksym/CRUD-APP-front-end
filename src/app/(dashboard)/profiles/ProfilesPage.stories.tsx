import type { Meta, StoryObj } from '@storybook/react';

import ProfilesPage from '@/app/(dashboard)/profiles/page';

const meta: Meta<typeof ProfilesPage> = {
  title: 'Pages/ProfilesPage',
  component: ProfilesPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfilesPage>;

export const Default: Story = {};
