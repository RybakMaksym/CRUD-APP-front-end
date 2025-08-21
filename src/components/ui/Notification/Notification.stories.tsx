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
  message: 'You have been made an admin',
  createdAt: new Date(),
  ownerId: 'user-1',
  isNew: true,
};

export const MadeAdmin: Story = {
  args: {
    notification: {
      ...baseNotification,
      type: NotificationType.MADE_ADMIN,
      message: 'You have been made an admin',
    },
  },
};

export const ProfileEdit: Story = {
  args: {
    notification: {
      ...baseNotification,
      type: NotificationType.PROFILE_EDIT,
      message: 'Your profile has been updated',
    },
  },
};

export const ProfileDelete: Story = {
  args: {
    notification: {
      ...baseNotification,
      type: NotificationType.PROFILE_DELETE,
      message: 'Your profile has been deleted',
    },
  },
};

export const OldNotification: Story = {
  args: {
    notification: {
      ...baseNotification,
      isNew: false,
      message: 'This is an old notification',
    },
  },
};
