'use client';

import { useMutation } from '@tanstack/react-query';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import { PAGES_URL } from '@/lib/config/pages-url';
import { isAxiosErrorLike } from '@/lib/helpers/is-axios-error-like';
import { authService } from '@/lib/services/auth/auth.service';
import { IRegisterForm } from '@/types/auth';

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
