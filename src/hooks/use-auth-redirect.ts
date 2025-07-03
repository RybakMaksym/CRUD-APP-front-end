import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/use-app-selector';

export function useAuthRedirect(redirectTo = '/log-in') {
  const router = useRouter();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace(redirectTo);
    }
  }, [accessToken, router, redirectTo]);

  return accessToken;
}
