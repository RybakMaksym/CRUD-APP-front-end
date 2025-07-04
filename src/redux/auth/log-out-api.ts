import { createApi } from '@reduxjs/toolkit/query/react';

import { queryWithRefreshToken } from '@/redux/queries/refresh-token-query';
import { IMessageResponse } from '@/types/messages';

export const logOutApi = createApi({
  reducerPath: 'logOutApi',
  baseQuery: queryWithRefreshToken,
  endpoints: (builder) => ({
    logOut: builder.mutation<IMessageResponse, void>({
      query: () => ({
        url: '/auth/log-out',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLogOutMutation } = logOutApi;
