import type { Meta, StoryObj } from '@storybook/react';

import Notification from '@/components/ui/Notification/Notification';
import { NotificationType } from '@/enums/notification';
import type { INotification } from '@/types/notification';

const meta: Meta<typeof Notification> = {
  title: 'UI/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    notification: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

const baseNotification: INotification = {
  id: '1',
  type: NotificationType.MADE_ADMIN,
  createdAt: new Date(),
  ownerId: 'user-1',
  isNew: true,
  admin: 'Admin',
};

export const MadeAdmin: Story = {
  args: {
    notification: {
      ...baseNotification,
      type: NotificationType.MADE_ADMIN,
    },
  },
};

export const ProfileEdit: Story = {
  args: {
    notification: {
      ...baseNotification,
      type: NotificationType.PROFILE_EDIT,
      profile: 'Profile',
    },
  },
};

export const ProfileDelete: Story = {
  args: {
    notification: {
      ...baseNotification,
      type: NotificationType.PROFILE_DELETE,
      profile: 'Profile',
    },
  },
};

export const OldNotification: Story = {
  args: {
    notification: {
      ...baseNotification,
      isNew: false,
      profile: 'Profile',
    },
  },
};
