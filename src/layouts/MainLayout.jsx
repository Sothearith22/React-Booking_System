import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  CUSTOMER_HOME_PATH,
  CUSTOMER_PROFILE_PATH,
  DASHBOARD_HOME_PATH,
  isAdminUser,
} from '../utils/auth';

export const MainLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const navigationItems = [
    { label: 'Home', to: CUSTOMER_HOME_PATH, end: true },
    ...(isAuthenticated ? [{ label: 'Profile', to: CUSTOMER_PROFILE_PATH }] : []),
  ];

  const linkClassName = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
    }`;

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="text-lg font-bold tracking-tight text-slate-950">
            React Booking
          </NavLink>

          <nav className="flex items-center gap-2">
            {navigationItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={linkClassName}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 btn">
            {isAuthenticated ? (
              <>
                <span className="hidden text-sm text-slate-600 sm:inline">
                  {user?.name || user?.email}
                </span>
                {isAdminUser(user) ? (
                  <NavLink to={DASHBOARD_HOME_PATH} className={linkClassName}>
                    Dashboard
                  </NavLink>
                ) : null}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={linkClassName}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};
