import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { logout, setTokens } from '@/redux/auth/auth-slice';
import { RootState } from '@/redux/store';

const mutex = new Mutex();

export const baseQuery: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();

  const queryWithAccessToken = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });

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

        const refreshResult = await queryWithAccessToken(
          {
            url: '/token/refresh',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { accessToken, refreshToken } = refreshResult.data as {
            accessToken: string;
            refreshToken: string;
          };

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
