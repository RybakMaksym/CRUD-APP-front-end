import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import { IMessageResponse } from '@/types/messages';
import { IUser } from '@/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    usersList: builder.query<IUser[], { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/user/list?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
    usersTotal: builder.query<number, void>({
      query: () => ({
        url: `/user/total`,
        method: 'GET',
      }),
    }),
    searchUsers: builder.query<IUser[], { query: string }>({
      query: ({ query }) => ({
        url: `/user/search?query=${query}`,
        method: 'GET',
      }),
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
    }),
    updateUserById: builder.mutation<
      IMessageResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/user/update/${id}`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    deleteUserById: builder.mutation<IMessageResponse, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUsersListQuery,
  useUsersTotalQuery,
  useSearchUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
