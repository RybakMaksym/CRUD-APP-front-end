import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '@/redux/store';
import { IAuthResponse, ILogInForm, IRegisterForm } from '@/types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken ?? state.auth.refreshToken;

      if (token) headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, IRegisterForm>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    logIn: builder.mutation<IAuthResponse, ILogInForm>({
      query: (body) => ({
        url: '/auth/log-in',
        method: 'POST',
        body,
      }),
    }),
    refreshTokens: builder.query<IAuthResponse, void>({
      query: () => ({
        url: '/token/refresh',
        method: 'GET',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLogInMutation, useRefreshTokensQuery } =
  authApi;
