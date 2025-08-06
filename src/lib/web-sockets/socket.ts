import { io, type Socket } from 'socket.io-client';

let socket: Socket | undefined;

export const connectSocket = (token: string, userId: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: {
        token,
      },
      query: { userId },
    });
  }
};

export const getSocket = (): Socket | undefined => {
  if (!socket) {
    throw new Error('Socket is not connected');
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = undefined;
  }
};
