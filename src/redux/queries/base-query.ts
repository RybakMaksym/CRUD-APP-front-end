import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { logout, setTokens } from '@/redux/auth/auth-slice';
import { queryWithAccessToken } from '@/redux/queries/access-token-query';
import { queryWithRefreshToken } from '@/redux/queries/refresh-token-query';
import { RootState } from '@/redux/store';
import { ITokens } from '@/types/auth';

const mutex = new Mutex();

export const baseQuery: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await queryWithAccessToken(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;

        if (!refreshToken) {
          api.dispatch(logout());

          return result;
        }

        const refreshResult = await queryWithRefreshToken(
          {
            url: '/token/refresh',
            method: 'GET',
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { accessToken, refreshToken } = refreshResult.data as ITokens;

          api.dispatch(setTokens({ accessToken, refreshToken }));

          result = await queryWithAccessToken(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await queryWithAccessToken(args, api, extraOptions);
    }
  }

  return result;
};
