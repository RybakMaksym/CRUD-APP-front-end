import { setTokens } from '@/redux/auth/auth-slice';
import type { AppDispatch } from '@/redux/store';
import { setUser } from '@/redux/user/user-slice';
import type { IAuthResponse } from '@/types/auth';

export const fullLogIn = (data: IAuthResponse) => (dispatch: AppDispatch) => {
  dispatch(
    setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),
  );

  dispatch(setUser(data.user));
};
