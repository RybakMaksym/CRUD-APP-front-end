import { ReactNode } from 'react';

import SideBar from '@/components/features/SideBar/SideBar';
import ProtectedRoute from '@/components/guards/ProtectedRoute';

function layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <SideBar />
      {children}
    </ProtectedRoute>
  );
}

export default layout;
