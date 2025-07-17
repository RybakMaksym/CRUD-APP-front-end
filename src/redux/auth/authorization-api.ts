import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import type { IAuthResponse, ILogInForm } from '@/types/auth';

export const authorizationApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, FormData>({
      query: (formData) => ({
        url: '/auth/register',
        method: 'POST',
        body: formData,
      }),
    }),
    logIn: builder.mutation<IAuthResponse, ILogInForm>({
      query: (body) => ({
        url: '/auth/log-in',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLogInMutation } = authorizationApi;
