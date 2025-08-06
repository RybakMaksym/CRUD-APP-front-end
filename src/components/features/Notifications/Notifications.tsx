'use client';

import styles from '@/components/features/Notifications/Notifications.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Notification from '@/components/ui/Notification/Notification';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { DEFAULT_NOTIFICATIONS_PAGE_LIMIT } from '@/lib/constants/notification';
import { useMyNotificationsQuery } from '@/redux/notification/notification-api';

function Notifications() {
  const { data: notifications } = useMyNotificationsQuery({
    page: 1,
    limit: DEFAULT_NOTIFICATIONS_PAGE_LIMIT,
  });

  return (
    <div className={styles.notifications}>
      <div className={styles.headline}>
        <Headline color="dark" size="18px">
          Notifications
        </Headline>
      </div>
      {notifications?.data ? (
        notifications.data.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))
      ) : (
        <Paragraph color="dark" size="14px">
          You have no notifications
        </Paragraph>
      )}
    </div>
  );
}

export default Notifications;
