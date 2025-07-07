'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { PAGES_URL } from '@/enums/pages-url';
import { Role } from '@/enums/role';
import { useAppSelector } from '@/hooks/use-app-selector';

type ProtectedRouteProps = {
  children: ReactNode;
};

function AdminRoute(props: ProtectedRouteProps) {
  const role = useAppSelector((state) => state.user.role);
  const router = useRouter();

  useEffect(() => {
    if (role !== Role.ADMIN) {
      router.replace(PAGES_URL.NOT_FROUND);
    }
  }, [role, router]);

  if (role !== Role.ADMIN) return null;

  return <>{props.children}</>;
}

export default AdminRoute;
