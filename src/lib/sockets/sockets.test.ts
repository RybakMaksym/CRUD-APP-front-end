import { io } from 'socket.io-client';

import { connectSocket } from '@/lib/sockets/socket';

jest.mock('socket.io-client', () => ({
  io: jest.fn(),
}));

const mockOn = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  (io as jest.Mock).mockReturnValue({
    on: mockOn,
    disconnect: mockDisconnect,
  });
});

it('should connect socket and dispatch events', () => {
  const dispatch = jest.fn();

  connectSocket('token', 'userId', dispatch);

  expect(io).toHaveBeenCalled();
  expect(mockOn).toHaveBeenCalledWith('connect', expect.any(Function));
  expect(mockOn).toHaveBeenCalledWith('disconnect', expect.any(Function));
});
