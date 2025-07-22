import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import type { IMessageResponse } from '@/types/messages';
import type { IProfile } from '@/types/profile';
import type { IFormWithIdParams } from '@/types/request';

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
    getProfilesByUserId: builder.query<IProfile[], string>({
      query: (id) => ({
        url: `/profile/profiles/${id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Profile', id: 'USERS-PROFILES' }],
    }),
    createProfile: builder.mutation<IProfile, IFormWithIdParams>({
      query: ({ id, formData }) => ({
        url: `/profile/create/${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: () => [
        { type: 'Profile', id: 'LIST' },
        { type: 'Profile', id: 'USERS-PROFILES' },
      ],
    }),
    updateProfileById: builder.mutation<IProfile, IFormWithIdParams>({
      query: ({ id, formData }) => ({
        url: `/profile/update/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: () => [
        { type: 'Profile', id: 'LIST' },
        { type: 'Profile', id: 'USERS-PROFILES' },
      ],
    }),
    deleteProfileById: builder.mutation<IMessageResponse, string>({
      query: (id) => ({
        url: `/profile/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [
        { type: 'Profile', id: 'LIST' },
        { type: 'Profile', id: 'USERS-PROFILES' },
      ],
    }),
  }),
});

export const {
  useMyProfilesQuery,
  useGetProfilesByUserIdQuery,
  useCreateProfileMutation,
  useUpdateProfileByIdMutation,
  useDeleteProfileByIdMutation,
} = profileApi;
