import { Navigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../features/auth';
import { getDefaultRedirectPath } from '../features/auth/utils/auth.utils';

export function GuestRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <Loader message="Loading session..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={getDefaultRedirectPath(user)} replace />;
  }

  return children;
}
