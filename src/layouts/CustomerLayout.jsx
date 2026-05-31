import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { getDefaultRedirectPath, isAdminUser } from '../features/auth/utils/auth.utils';

export const CustomerLayout = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <Loader message="Checking access..." />;
  }

  if (isAuthenticated && isAdminUser(user)) {
    return <Navigate to={getDefaultRedirectPath(user)} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar/>
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const MainLayout = CustomerLayout;
