import type { Meta, StoryObj } from '@storybook/react';
import { usePathname } from 'next/navigation';
import { mocked } from 'storybook/test';

import MenuItem from '@/components/ui/MenuItem/MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'UI/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    path: { control: 'text' },
    label: { control: 'text' },
    iconUrl: { control: 'text' },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
  beforeEach: () => {
    mocked(usePathname).mockReturnValue('/profiles');
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    path: '/home',
    label: 'Home',
  },
};

export const WithIcon: Story = {
  args: {
    path: '/home',
    label: 'Home',
    iconUrl: '/assets/icons/profile.svg',
  },
};

export const Active: Story = {
  args: {
    path: '/profiles',
    label: 'Profile',
    iconUrl: '/assets/icons/profile.svg',
  },
};
