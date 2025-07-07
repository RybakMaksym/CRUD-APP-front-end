import { ReactNode } from 'react';

import SideBar from '@/components/features/SideBar/SideBar';
import ProtectedRoute from '@/components/guards/ProtectedRoute';
import styles from '@/styles/dashboard-pages.module.scss';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className={styles.dashboard}>
        <SideBar />
        {children}
      </div>
    </ProtectedRoute>
  );
}

export default DashboardLayout;
