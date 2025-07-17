import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PAGES_URL } from '@/enums/pages-url';
import { useAppSelector } from '@/hooks/use-app-selector';
import authSelectors from '@/redux/auth/auth-selectors';

export function useAuthRedirect(redirectTo = PAGES_URL.LOG_IN) {
  const router = useRouter();
  const accessToken = useAppSelector(authSelectors.getAccessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace(redirectTo);
    }
  }, [accessToken, router, redirectTo]);

  return accessToken;
}
