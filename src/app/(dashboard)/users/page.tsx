import UsersBoard from '@/components/features/UsersBoard/UsersBoard';
import AdminRoute from '@/components/guards/AdminRoute';
import styles from '@/styles/users-page.module.scss';

function UsersPage() {
  return (
    <div className={styles.container}>
      <AdminRoute>
        <UsersBoard />
      </AdminRoute>
    </div>
  );
}

export default UsersPage;
