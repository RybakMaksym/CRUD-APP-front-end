import type { ReactNode } from 'react';

import SideBar from '@/components/features/SideBar/SideBar';
import ProtectedRoute from '@/components/guards/ProtectedRoute';
import SocketProvider from '@/providers/SocketProvider';
import styles from '@/styles/dashboard-pages.module.scss';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <SocketProvider>
        <div className={styles.dashboard}>
          <SideBar />
          <div className={styles.main}>{children}</div>
        </div>
      </SocketProvider>
    </ProtectedRoute>
  );
}

export default DashboardLayout;
