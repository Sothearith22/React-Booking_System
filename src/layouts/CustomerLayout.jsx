// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
// import { useAuth } from '../features/auth';
// import {
//   CUSTOMER_HOME_PATH,
//   CUSTOMER_PROFILE_PATH,
//   DASHBOARD_HOME_PATH,
//   isAdminUser,
// } from '../features/auth/utils/auth.utils';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

export const CustomerLayout = () => {
  // const { isAuthenticated, user, logout } = useAuth();
  // const navigate = useNavigate();
  // const navigationItems = [
  //   { label: 'Home', to: CUSTOMER_HOME_PATH, end: true },
  //   ...(isAuthenticated ? [{ label: 'Profile', to: CUSTOMER_PROFILE_PATH }] : []),
  // ];

  // const linkClassName = ({ isActive }) =>
  //   `rounded-full px-4 py-2 text-sm font-medium transition ${
  //     isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
  //   }`;

  // const handleLogout = async () => {
  //   await logout();
  //   navigate(ROUTES.LOGIN, { replace: true });
  // };

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
