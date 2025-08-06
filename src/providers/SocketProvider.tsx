'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/use-app-selector';
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from '@/lib/web-sockets/socket';
import authSelectors from '@/redux/auth/auth-selectors';
import userSelectors from '@/redux/user/user-selectors';

function SocketProvider({ children }: { children: ReactNode }) {
  const refreshToken = useAppSelector(authSelectors.getRefreshToken);
  const userId = useAppSelector(userSelectors.getUserId);

  useEffect(() => {
    if (refreshToken) {
      connectSocket(refreshToken, userId ?? '');
      const socket = getSocket();

      socket?.on('connect', () => {
        console.log('connect');
        socket.on('notification', (notification: any) => {
          console.log('🔔 Notification:', notification);
        });
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [refreshToken, userId]);

  return <>{children}</>;
}

export default SocketProvider;
