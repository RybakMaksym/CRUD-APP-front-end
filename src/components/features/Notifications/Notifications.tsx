'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import InfinityScrollWrapper from '@/components/features/InfinityScrollWrapper/InfinityScrollWrapper';
import styles from '@/components/features/Notifications/Notifications.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Notification from '@/components/ui/Notification/Notification';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { DEFAULT_NOTIFICATIONS_PAGE_LIMIT } from '@/lib/constants/notification';
import { useMyNotificationsQuery } from '@/redux/notification/notification-api';
import notificationSelectors from '@/redux/notification/notification-selectors';
import { setHasNewNotification } from '@/redux/notification/notification-slice';
import type { INotification } from '@/types/notification';

type NotificationsProps = {
  shouldRefetch: boolean;
};

function Notifications(props: NotificationsProps) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data: paginatedData,
    isLoading: isAllNotificationsLoading,
    isError: isAllNotificationsError,
    refetch,
  } = useMyNotificationsQuery({
    page,
    limit: DEFAULT_NOTIFICATIONS_PAGE_LIMIT,
  });

  useEffect(() => {
    if (props.shouldRefetch) {
      refetch();
      dispatch(setHasNewNotification(false));
    }
  }, [props.shouldRefetch, refetch, dispatch]);

  useEffect(() => {
    if (!paginatedData || isAllNotificationsLoading) return;

    setAllNotifications((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const unique = paginatedData.data.filter((p) => !existingIds.has(p.id));

      return [...prev, ...unique];
    });

    setIsFetchingMore(false);
  }, [paginatedData, isAllNotificationsLoading]);

  const newNotifications = useAppSelector(
    notificationSelectors.getNewNotifications,
  );

  useEffect(() => {
    if (!newNotifications.length) return;

    setAllNotifications((prev) => {
      const existingIds = new Set(prev.map((n) => n.id));
      const newOnes = newNotifications.filter((n) => !existingIds.has(n.id));

      if (!newOnes.length) return prev;

      return [...newOnes, ...prev];
    });
  }, [newNotifications]);

  const isInitialLoading = isAllNotificationsLoading && page === 1;
  const isLastPage = !paginatedData?.nextPage;
  const canLoadMore = !isAllNotificationsLoading && !isLastPage;

  return (
    <div className={styles.notifications}>
      <div className={styles.headline}>
        <Headline color="dark" size="18px">
          {t('profilesPage.notifications')}
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
