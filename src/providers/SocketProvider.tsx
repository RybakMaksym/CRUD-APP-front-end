'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/use-app-selector';
import { connectSocket, disconnectSocket } from '@/lib/sockets/socket';
import authSelectors from '@/redux/auth/auth-selectors';
import userSelectors from '@/redux/user/user-selectors';

function SocketProvider({ children }: { children: ReactNode }) {
  const accessToken = useAppSelector(authSelectors.getAccessToken);
  const userId = useAppSelector(userSelectors.getUserId);

  useEffect(() => {
    connectSocket(accessToken!, userId!);

    return () => {
      disconnectSocket();
    };
  }, [accessToken, userId]);

  return <>{children}</>;
}

export default SocketProvider;
