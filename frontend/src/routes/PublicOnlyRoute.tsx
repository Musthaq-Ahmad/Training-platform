import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/Useauth';
// import { FullPageLoader } from './FullPageLoader';

/** Layout route for pages like /login: signed-in users are sent to the home page. */
export function PublicOnlyRoute() {
  const { status } = useAuth();

  if (status === 'loading') return <p>Loading..</p>;
  if (status === 'authenticated') return <Navigate to="/" replace />;

  return <Outlet />;
}
