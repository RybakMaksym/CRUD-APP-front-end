type AxiosErrorLike = {
  isAxiosError: true;
  response?: {
    data?: {
      message?: string | string[];
    };
  };
};

export const isAxiosErrorLike = (error: unknown): error is AxiosErrorLike => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as Record<string, unknown>).isAxiosError === true
  );
};
