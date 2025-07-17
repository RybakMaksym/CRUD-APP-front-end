import { logout } from '@/redux/auth/auth-slice';
import type { AppDispatch } from '@/redux/store';
import { clearUser } from '@/redux/user/user-slice';

export const fullLogOut = () => (dispatch: AppDispatch) => {
  dispatch(logout());
  dispatch(clearUser());
};
