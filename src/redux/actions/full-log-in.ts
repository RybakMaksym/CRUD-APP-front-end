import { setTokens } from '@/redux/auth/auth-slice';
import { AppDispatch } from '@/redux/store';
import { setUser } from '@/redux/user/user-slice';
import { IAuthResponse } from '@/types/auth';

export const fullLogIn = (data: IAuthResponse) => (dispatch: AppDispatch) => {
  dispatch(
    setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),
  );

  dispatch(setUser(data.user));
};
