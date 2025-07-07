import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import { IUser } from '@/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    usersList: builder.query<IUser[], void>({
      query: () => ({
        url: '/user/list',
        method: 'GET',
      }),
    }),
  }),
});

export const { useUsersListQuery } = userApi;
