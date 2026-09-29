import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/Useauth';
import LoaderOverlay from '../components/Common/LoadingState/Loader';

/** Layout route for pages like /login: signed-in users are sent to the home page. */
export function PublicOnlyRoute() {
  const { status } = useAuth();

  if (status === 'loading') return <LoaderOverlay fullPage={true} />;
  if (status === 'authenticated') return <Navigate to="/" replace />;

  return <Outlet />;
}
