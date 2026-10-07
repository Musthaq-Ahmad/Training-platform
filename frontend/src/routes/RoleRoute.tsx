import { Navigate, Outlet } from 'react-router';
import type { UserRole } from '@itp/types';
import { useAuth } from '../context/Useauth';

/** Renders child routes only for the given role; sends the other role to its
own home. */
export function RoleRoute({ role }: { role: UserRole }) {
  const { user } = useAuth();
  if (user && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }
  return <Outlet />;
}
