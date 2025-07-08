'use client';

import { ReactNode } from 'react';

import { useAuthRedirect } from '@/hooks/use-auth-redirect';

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute(props: ProtectedRouteProps) {
  const accessToken = useAuthRedirect();

  if (!accessToken) return null;

  return <>{props.children}</>;
}

export default ProtectedRoute;
