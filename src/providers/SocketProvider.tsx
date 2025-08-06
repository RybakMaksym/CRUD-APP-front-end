'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/use-app-selector';
import { connectSocket, disconnectSocket } from '@/lib/web-sockets/socket';
import authSelectors from '@/redux/auth/auth-selectors';
import userSelectors from '@/redux/user/user-selectors';

function SocketProvider({ children }: { children: ReactNode }) {
  const refreshToken = useAppSelector(authSelectors.getRefreshToken);
  const userId = useAppSelector(userSelectors.getUserId);

  useEffect(() => {
    if (refreshToken) {
      connectSocket(refreshToken, userId ?? '');

      return () => {
        disconnectSocket();
      };
    }
  }, [refreshToken, userId]);

  return <>{children}</>;
}

export default SocketProvider;
