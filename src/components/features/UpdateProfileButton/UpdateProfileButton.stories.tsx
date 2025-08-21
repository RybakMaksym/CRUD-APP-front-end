import type { Meta, StoryObj } from '@storybook/react';

import UpdateProfileButton from '@/components/features/UpdateProfileButton/UpdateProfileButton';
import { Gender } from '@/enums/gender';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import type { IProfile } from '@/types/profile';

const meta: Meta<typeof UpdateProfileButton> = {
  title: 'Features/UpdateProfileButton',
  component: UpdateProfileButton,
  tags: ['autodocs'],
  argTypes: {
    profile: { control: 'object' },
    onConfirm: { action: 'ocnfirmed' },
  },
};

export default meta;
type Story = StoryObj<typeof UpdateProfileButton>;

const mockProfile: IProfile = {
  id: '1',
  name: 'Jane Doe',
  gender: Gender.Female,
  birthDate: new Date('1990-01-01'),
  country: 'USA',
  city: 'New York',
  avatarUrl: DEFAULT_AVATAR,
  ownerId: 'user1',
};

export const Default: Story = {
  args: {
    profile: mockProfile,
  },
};
