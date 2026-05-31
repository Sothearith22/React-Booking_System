import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants/appConstants';
import { useAuth } from '../../features/auth';
import { AuthLayout } from '../../layouts/AuthLayout';
import { getDefaultRedirectPath } from '../../features/auth/utils/auth.utils';

export function AuthRoute({ initialMode = 'login' }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-600">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={getDefaultRedirectPath(user)} replace />;
  }

  return <AuthLayout initialMode={initialMode} />;
}
