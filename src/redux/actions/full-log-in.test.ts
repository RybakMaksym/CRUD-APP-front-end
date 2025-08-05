import { Role } from '@/enums/role';
import { fullLogIn } from '@/redux/actions/full-log-in';
import { setTokens } from '@/redux/auth/auth-slice';
import { setUser } from '@/redux/user/user-slice';
import type { IAuthResponse } from '@/types/auth';

jest.mock('@/redux/auth/auth-slice', () => ({
  setTokens: jest.fn(),
}));
jest.mock('@/redux/user/user-slice', () => ({
  setUser: jest.fn(),
}));

describe('fullLogIn thunk', () => {
  const mockDispatch = jest.fn();
  const mockData: IAuthResponse = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    user: {
      id: '123',
      email: 'test@example.com',
      username: 'TestUser',
      avatarUrl: undefined,
      role: Role.USER,
      profiles: [],
    },
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should dispatch setTokens and setUser actions', () => {
    fullLogIn(mockData)(mockDispatch);

    expect(setTokens).toHaveBeenCalledWith({
      accessToken: mockData.accessToken,
      refreshToken: mockData.refreshToken,
    });
    expect(setUser).toHaveBeenCalledWith(mockData.user);
    expect(mockDispatch).toHaveBeenCalledWith(setTokens(mockData));
    expect(mockDispatch).toHaveBeenCalledWith(setUser(mockData.user));
  });
});
