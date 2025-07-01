import ProtectedRoute from '@/components/guards/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <></>
    </ProtectedRoute>
  );
}
