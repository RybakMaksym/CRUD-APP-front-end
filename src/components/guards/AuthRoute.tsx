'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { PAGES_URL } from '@/enums/pages-url';
import { useAppSelector } from '@/hooks/use-app-selector';
import authSelectors from '@/redux/auth/auth-selectors';

type AuthRouteProps = {
  children: ReactNode;
};

function AuthRoute(props: AuthRouteProps) {
  const router = useRouter();
  const accessToken = useAppSelector(authSelectors.getAccessToken);

  useEffect(() => {
    if (accessToken) {
      router.replace(PAGES_URL.NOT_FROUND);
    }
  }, [accessToken, router]);

  if (accessToken) return null;

  return <>{props.children}</>;
}

export default AuthRoute;
