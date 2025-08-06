'use client';

import { useEffect, useState } from 'react';

import InfinityScrollWrapper from '@/components/features/InfinityScrollWrapper/InfinityScrollWrapper';
import styles from '@/components/features/Notifications/Notifications.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Notification from '@/components/ui/Notification/Notification';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { DEFAULT_NOTIFICATIONS_PAGE_LIMIT } from '@/lib/constants/notification';
import { useMyNotificationsQuery } from '@/redux/notification/notification-api';
import type { INotification } from '@/types/notification';

function Notifications() {
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data: paginatedData,
    isLoading: isAllNotificationsLoading,
    isError: isAllNotificationsError,
  } = useMyNotificationsQuery({
    page,
    limit: DEFAULT_NOTIFICATIONS_PAGE_LIMIT,
  });

  useEffect(() => {
    if (!paginatedData || isAllNotificationsLoading) return;

    setAllNotifications((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const unique = paginatedData.data.filter((p) => !existingIds.has(p.id));

      return [...prev, ...unique];
    });

    setIsFetchingMore(false);
  }, [paginatedData, isAllNotificationsLoading]);

  const isInitialLoading = isAllNotificationsLoading && page === 1;
  const isLastPage = !paginatedData?.nextPage;
  const canLoadMore = !isAllNotificationsLoading && !isLastPage;

  return (
    <div className={styles.notifications}>
      <div className={styles.headline}>
        <Headline color="dark" size="18px">
          Notifications
        </Headline>
      </div>

      {allNotifications && (
        <InfinityScrollWrapper
          onLoadMore={() => {
            if (isFetchingMore) return;

            setIsFetchingMore(true);
            setPage((prev) => prev + 1);
          }}
          additionalConditions={canLoadMore}
        >
          {allNotifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </InfinityScrollWrapper>
      )}

      {(isInitialLoading || isAllNotificationsLoading) && <Loader />}
      {isAllNotificationsError && (
        <Paragraph color="error">Could not find any notifications</Paragraph>
      )}
      {!allNotifications && (
        <Paragraph color="dark" size="14px">
          You have no notifications
        </Paragraph>
      )}
    </div>
  );
}

export default Notifications;
