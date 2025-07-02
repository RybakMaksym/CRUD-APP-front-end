import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/redux/base-query';
import { IAuthResponse, ILogInForm, IRegisterForm } from '@/types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
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
  }),
});

export const { useRegisterMutation, useLogInMutation } = authApi;
