import SideBar from '@/components/features/SideBar/SideBar';
import ProtectedRoute from '@/components/guards/ProtectedRoute';

function page() {
  return (
    <ProtectedRoute>
      <SideBar />
    </ProtectedRoute>
  );
}

export default page;
