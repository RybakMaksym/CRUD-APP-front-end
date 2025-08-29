import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import Notifications from '@/components/features/Notifications/Notifications';
import { NotificationType } from '@/enums/notification';

const mockNotifications = [
  {
    id: '1',
    type: NotificationType.MADE_ADMIN,
    message: 'You were made an admin',
    createdAt: new Date(),
    ownerId: '123',
    isNew: true,
  },
  {
    id: '2',
    type: NotificationType.PROFILE_EDIT,
    message: 'Your profile was updated',
    createdAt: new Date(),
    ownerId: '123',
    isNew: false,
  },
  {
    id: '3',
    type: NotificationType.PROFILE_DELETE,
    message: 'A profile you follow was deleted',
    createdAt: new Date(),
    ownerId: '123',
  },
];

const meta: Meta<typeof Notifications> = {
  title: 'Features/Notifications',
  component: Notifications,
  tags: ['autodocs'],
  argTypes: {
    shouldRefetch: { control: 'boolean' },
  },
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/notification`, () => {
          return HttpResponse.json({
            data: mockNotifications,
            page: 1,
            limit: 10,
            total: mockNotifications.length,
            nextPage: null,
          });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {
  render: (args) => {
    return <Notifications shouldRefetch={args.shouldRefetch} />;
  },
  args: {
    shouldRefetch: false,
  },
};
