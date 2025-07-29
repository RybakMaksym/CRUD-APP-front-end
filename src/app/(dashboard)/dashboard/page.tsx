import StatsBoard from '@/components/features/StatsBoard/StatsBoard';
import AdminRoute from '@/components/guards/AdminRoute';
import styles from '@/styles/dashboard-page.module.scss';

function DashBaordPage() {
  return (
    <div className={styles.container}>
      <AdminRoute>
        <StatsBoard />
      </AdminRoute>
    </div>
  );
}

export default DashBaordPage;
