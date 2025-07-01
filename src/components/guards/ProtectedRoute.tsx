'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAppSelector } from '@/hooks/use-app-selector';

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute(props: ProtectedRouteProps) {
  const router = useRouter();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace('/log-in');
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null;
  }

  return <>{props.children}</>;
}

export default ProtectedRoute;
