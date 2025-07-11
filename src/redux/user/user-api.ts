import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import { UpdateUserByIdParams } from '@/redux/user/user-types';
import { IMessageResponse } from '@/types/messages';
import { IPagination, ISearch } from '@/types/navigation';
import { IUser } from '@/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    usersList: builder.query<IUser[], IPagination>({
      query: ({ page, limit }) => ({
        url: `/user/list?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
    usersTotal: builder.query<number, void>({
      query: () => ({
        url: `/user/total`,
        method: 'GET',
      }),
      providesTags: [{ type: 'User', id: 'TOTAL' }],
    }),
    searchUsers: builder.query<IUser[], ISearch>({
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
      providesTags: [{ type: 'User', id: 'ID' }],
    }),
    updateUserById: builder.mutation<IUser, UpdateUserByIdParams>({
      query: ({ id, formData }) => ({
        url: `/user/update/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: () => [
        { type: 'User', id: 'LIST' },
        { type: 'User', id: 'ID' },
      ],
    }),
    deleteUserById: builder.mutation<IMessageResponse, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [
        { type: 'User', id: 'LIST' },
        { type: 'User', id: 'TOTAL' },
      ],
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
