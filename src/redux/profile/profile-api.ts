import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import { IMessageResponse } from '@/types/messages';
import { IProfile } from '@/types/profile';
import { IUpdateFormWithIdParams } from '@/types/request';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    myProfiles: builder.query<IProfile[], void>({
      query: () => ({
        url: `/profile/my-profiles`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Profile', id: 'LIST' }],
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
  useCreateProfileMutation,
  useUpdateProfileByIdMutation,
  useDeleteProfileByIdMutation,
} = profileApi;
