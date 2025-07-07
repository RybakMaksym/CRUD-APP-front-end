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
    getUserById: builder.query<IUser, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useUsersListQuery, useGetUserByIdQuery } = userApi;
