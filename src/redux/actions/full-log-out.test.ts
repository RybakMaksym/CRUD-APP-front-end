import { fullLogOut } from '@/redux/actions/full-log-out';
import { logout } from '@/redux/auth/auth-slice';
import { clearUser } from '@/redux/user/user-slice';

jest.mock('@/redux/auth/auth-slice', () => ({
  logout: jest.fn(),
}));
jest.mock('@/redux/user/user-slice', () => ({
  clearUser: jest.fn(),
}));

describe('fullLogOut thunk', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should dispatch logout and clearUser actions', () => {
    fullLogOut()(mockDispatch);

    expect(logout).toHaveBeenCalled();
    expect(clearUser).toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(mockDispatch).toHaveBeenCalledWith(clearUser());
  });
});
