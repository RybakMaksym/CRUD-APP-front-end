import type { RootState } from '@/redux/store';

const getHasNewNotifications = (state: RootState) => state.notification.hasNew;
const getNewNotifications = (state: RootState) =>
  state.notification.notifications;

const notificationSelectors = {
  getHasNewNotifications,
  getNewNotifications,
};

export default notificationSelectors;
