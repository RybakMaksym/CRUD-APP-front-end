import { useTranslation } from 'react-i18next';

import type { NotificationType } from '@/enums/notification';

export const useNotificationMessage = () => {
  const { t } = useTranslation();

  const translateMessage = (
    type: NotificationType,
    admin: string,
    profile?: string,
  ) => {
    return t(`notifications.${type}`, { admin, profile });
  };

  return {
    translateMessage,
  };
};
