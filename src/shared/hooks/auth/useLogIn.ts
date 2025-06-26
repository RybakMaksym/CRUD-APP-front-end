'use client';

import { useMutation } from '@tanstack/react-query';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import { PAGES_URL } from '@/shared/config/pages-url.config';
import { isAxiosErrorLike } from '@/shared/helpers/is-axios-error-like';
import { authService } from '@/shared/services/auth/auth.service';
import { ILogInForm } from '@/shared/types/auth.types';

export const useLogIn = () => {
  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: async (data: ILogInForm) => authService.logIn(data),
    onSuccess() {
      push(PAGES_URL.PROFILES);
    },
  });

  const onSubmit = (
    data: ILogInForm,
    { setStatus, setSubmitting }: FormikHelpers<ILogInForm>,
  ) => {
    mutate(data, {
      onError: (error: unknown) => {
        let message = 'Unknown error occurred';

        if (isAxiosErrorLike(error)) {
          const rawMessage = error.response?.data?.message;
          if (typeof rawMessage === 'string') message = rawMessage;
          else if (Array.isArray(rawMessage)) message = rawMessage[0];
        }

        setStatus(message);
        setSubmitting(false);
      },
    });
  };

  return {
    onSubmit,
  };
};
