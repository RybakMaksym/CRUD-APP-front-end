import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import type { IMessageResponse } from '@/types/messages';
import type { IPaginatedResponse, IPagination } from '@/types/navigation';
import type { INotification } from '@/types/notification';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery,
  tagTypes: ['Notification'],
  endpoints: (builder) => ({
    myNotifications: builder.query<
      IPaginatedResponse<INotification>,
      IPagination
    >({
      query: ({ page, limit }) => ({
        url: `/notification?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
    makeNotificationsWatched: builder.mutation<IMessageResponse, string[]>({
      query: (ids) => ({
        url: `/notification`,
        method: 'PATCH',
        body: { ids },
      }),
    }),
  }),
});

export const { useMyNotificationsQuery, useMakeNotificationsWatchedMutation } =
  notificationApi;
