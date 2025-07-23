import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import type { IMessageResponse } from '@/types/messages';
import type {
  IPaginatedResponse,
  IPagination,
  ISearch,
} from '@/types/navigation';
import type { IProfile } from '@/types/profile';
import type { IUpdateFormWithIdParams } from '@/types/request';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    myProfiles: builder.query<IPaginatedResponse<IProfile>, IPagination>({
      query: ({ page, limit }) => ({
        url: `/profile/my-profiles?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Profile', id: 'LIST' }],
    }),
    searchProfiles: builder.query<IProfile[], ISearch>({
      query: ({ query }) => ({
        url: `/profile/search?query=${query}`,
        method: 'GET',
      }),
    }),
    createProfile: builder.mutation<IProfile, FormData>({
      query: (formData) => ({
        url: `/profile/create`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: () => [{ type: 'Profile', id: 'LIST' }],
    }),
    updateProfileById: builder.mutation<IProfile, IUpdateFormWithIdParams>({
      query: ({ id, formData }) => ({
        url: `/profile/update/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: () => [{ type: 'Profile', id: 'LIST' }],
    }),
    deleteProfileById: builder.mutation<IMessageResponse, string>({
      query: (id) => ({
        url: `/profile/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Profile', id: 'LIST' }],
    }),
  }),
});

export const {
  useMyProfilesQuery,
  useSearchProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileByIdMutation,
  useDeleteProfileByIdMutation,
} = profileApi;
