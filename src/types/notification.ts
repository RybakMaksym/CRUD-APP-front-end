import type { NotificationType } from '@/enums/notification';

export interface INotification {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: Date;
  ownerId: string;
  isNew: boolean;
}

export type INotificationState = {
  hasNew: boolean;
  notifications: INotification[];
};
