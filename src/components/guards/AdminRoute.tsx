'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAppSelector } from '@/hooks/use-app-selector';

type ProtectedRouteProps = {
  children: ReactNode;
};

function AdminRoute(props: ProtectedRouteProps) {
  const role = useAppSelector((state) => state.user.role);
  const router = useRouter();

  useEffect(() => {
    if (role !== 'admin') {
      router.replace('/profiles');
    }
  }, [role, router]);

  if (role !== 'admin') return null;

  return <>{props.children}</>;
}

export default AdminRoute;
