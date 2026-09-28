import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/Useauth';
// import { FullPageLoader } from './FullPageLoader';

/** Layout route: renders child routes only for authenticated users. */
export function ProtectedRoute() {
  const { status } = useAuth();

  // Wait for /me before deciding, otherwise a page refresh would flash the login page
  if (status === 'loading') return <p>Loading..</p>;
  if (status === 'unauthenticated') return <Navigate to="/login" replace />;

  return <Outlet />;
}
