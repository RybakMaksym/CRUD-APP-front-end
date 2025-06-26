'use client';

import { PAGES_URL } from '@/shared/config/pages-url.config';
import { isAxiosErrorLike } from '@/shared/helpers/is-axios-error-like';
import { authService } from '@/shared/services/auth/auth.service';
import { IRegisterForm } from '@/shared/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: async (data: IRegisterForm) => authService.register(data),
    onSuccess() {
      push(PAGES_URL.PROFILES);
    },
  });

  const onSubmit = (
    data: IRegisterForm,
    { setStatus, setSubmitting }: FormikHelpers<IRegisterForm>,
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

  return { onSubmit };
};
