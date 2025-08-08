import { io, type Socket } from 'socket.io-client';

import { setIsSocketConnected } from '@/redux/socket/socket-slice';
import type { AppDispatch } from '@/redux/store';

let socket: Socket | undefined;

export const connectSocket = (
  token: string,
  userId: string,
  dispatch: AppDispatch,
) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: {
        token,
      },
      query: { userId },
    });

    socket.on('connect', () => {
      dispatch(setIsSocketConnected(true));
    });

    socket.on('disconnect', () => {
      dispatch(setIsSocketConnected(false));
    });
  }
};

export const getSocket = (): Socket | undefined => {
  return socket;
};

export const disconnectSocket = (dispatch: AppDispatch) => {
  if (socket) {
    socket.disconnect();
    socket = undefined;
    dispatch(setIsSocketConnected(false));
  }
};
