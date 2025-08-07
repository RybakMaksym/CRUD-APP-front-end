'use client';

import { Badge, Menu } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';

import Notifications from '@/components/features/Notifications/Notifications';
import CustomIconButton from '@/components/ui/CustomIconButton/CustomIconButton';
import { NotificationEvents } from '@/enums/notification';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getSocket } from '@/lib/sockets/socket';
import notificationSelectors from '@/redux/notification/notification-selectors';
import {
  addNotification,
  clearSocketNotifications,
} from '@/redux/notification/notification-slice';
import socketSelectors from '@/redux/socket/socket-selectors';
import type { INotification } from '@/types/notification';

function NotificationButton() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const hasNew = useAppSelector(notificationSelectors.getHasNewNotifications);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setShouldRefetch(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShouldRefetch(true);
    dispatch(clearSocketNotifications());
  };

  const open = Boolean(anchorEl);

  const isSocketConnected = useAppSelector(
    socketSelectors.getIsSocketConnected,
  );

  useEffect(() => {
    if (!isSocketConnected) return;

    const socket: Socket | undefined = getSocket();

    socket?.on(
      NotificationEvents.NOTIFICATION,
      (notification: INotification) => {
        dispatch(addNotification(notification));
      },
    );

    return () => {
      socket?.off(NotificationEvents.NOTIFICATION);
    };
  }, [dispatch, isSocketConnected]);

  return (
    <>
      <Badge
        color="error"
        variant="dot"
        invisible={!hasNew}
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CustomIconButton
          onClick={handleOpen}
          icon="/assets/icons/notifications.png"
        />
      </Badge>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
            maxHeight: 500,
            paddingTop: 1,
            overflowY: 'auto',
            backgroundColor: 'var(--color-gray)',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Notifications shouldRefetch={shouldRefetch} />
      </Menu>
    </>
  );
}

export default NotificationButton;
