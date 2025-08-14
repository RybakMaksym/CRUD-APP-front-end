import type { Meta, StoryObj } from '@storybook/react';

import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import { Gender } from '@/enums/gender';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';

const meta: Meta<typeof ProfileCard> = {
  title: 'UI/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  argTypes: {
    profile: { control: 'object' },
    actionSuccess: { action: 'confirmed' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
  args: {
    profile: {
      id: '1',
      name: 'John Doe',
      gender: Gender.Male,
      birthDate: new Date(),
      country: 'USA',
      city: 'New York',
      avatarUrl: DEFAULT_AVATAR,
      ownerId: '1',
    },
  },
};

export const WithoutAvatar: Story = {
  args: {
    profile: {
      id: '2',
      name: 'Jane Smith',
      gender: Gender.Female,
      birthDate: new Date(),
      country: 'Canada',
      city: 'Toronto',
      avatarUrl: undefined,
      ownerId: '1',
    },
  },
};
