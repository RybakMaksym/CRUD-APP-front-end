import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/queries/base-query';
import type { ILanguage } from '@/types/languages';
import type { IMessageResponse } from '@/types/messages';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery,
  tagTypes: ['Settings'],
  endpoints: (builder) => ({
    updateSettings: builder.mutation<IMessageResponse, ILanguage>({
      query: (body) => ({
        url: `/user/update-settings`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useUpdateSettingsMutation } = settingsApi;
