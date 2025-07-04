import SideBar from '@/components/features/SideBar/SideBar';
import AdminRoute from '@/components/guards/AdminRoute';
import ProtectedRoute from '@/components/guards/ProtectedRoute';

function page() {
  return (
    <ProtectedRoute>
      <AdminRoute>
        <SideBar />
      </AdminRoute>
    </ProtectedRoute>
  );
}

export default page;
