import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import { IMessageResponse } from '@/types/messages';
import { IUser } from '@/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    usersList: builder.query<IUser[], { page: number; limit: number }>({
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
      invalidatesTags: (_result, _error, id) => [
        { type: 'User', id },
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
