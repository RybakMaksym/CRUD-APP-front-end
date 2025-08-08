'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/use-app-selector';
import { connectSocket, disconnectSocket } from '@/lib/sockets/socket';
import authSelectors from '@/redux/auth/auth-selectors';
import userSelectors from '@/redux/user/user-selectors';
import { useDispatch } from 'react-redux';

function SocketProvider({ children }: { children: ReactNode }) {
  const accessToken = useAppSelector(authSelectors.getAccessToken);
  const userId = useAppSelector(userSelectors.getUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket(accessToken!, userId!, dispatch);

    return () => {
      disconnectSocket(dispatch);
    };
  }, [accessToken, userId]);

  return <>{children}</>;
}

export default SocketProvider;
