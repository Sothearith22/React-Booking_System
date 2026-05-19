import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../features/auth';
import { getDefaultRedirectPath, getUserRoles } from '../features/auth/utils/auth.utils';

export function ProtectedRoute({ allowedRoles = [], children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <Loader message="Checking access..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles.length > 0) {
    const normalizedAllowedRoles = allowedRoles.map((role) => String(role).toLowerCase());
    const userRoles = getUserRoles(user);

    if (!userRoles.some((role) => normalizedAllowedRoles.includes(role))) {
      return <Navigate to={getDefaultRedirectPath(user)} replace />;
    }
  }

  return children || <Outlet />;
}
