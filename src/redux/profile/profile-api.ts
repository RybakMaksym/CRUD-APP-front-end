import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import type { FilterableFields, FilterFields } from '@/types/filter.type';
import type { IMessageResponse } from '@/types/messages';
import type { ISearch } from '@/types/navigation';
import type { IProfile } from '@/types/profile';
import type { IFieldQueryParams, IFormWithIdParams } from '@/types/request';

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
    searchProfiles: builder.query<IProfile[], ISearch>({
      query: ({ query }) => ({
        url: `/profile/search?query=${query}`,
        method: 'GET',
      }),
    }),
    getSuggestions: builder.query<
      string[],
      IFieldQueryParams<FilterableFields>
    >({
      query: ({ field, query }) => ({
        url: `/profile/suggestions?field=${field}&query=${query}`,
        method: 'GET',
      }),
    }),
    filterProfiles: builder.query<IProfile[], IFieldQueryParams<FilterFields>>({
      query: ({ field, query }) => ({
        url: `/profile/filter?field=${field}&query=${query}`,
        method: 'GET',
      }),
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
  useSearchProfilesQuery,
  useLazyGetSuggestionsQuery,
  useLazyFilterProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileByIdMutation,
  useDeleteProfileByIdMutation,
} = profileApi;
