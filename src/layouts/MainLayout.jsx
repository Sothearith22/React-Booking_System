import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { isAdminUser } from '../utils/auth';

export const MainLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const linkClassName = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
    }`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="text-lg font-bold tracking-tight text-slate-950">
            React Booking
          </NavLink>

          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={linkClassName}>
              Home
            </NavLink>
            <NavLink to="/explore" className={linkClassName}>
              Explore
            </NavLink>
            <NavLink to="/about" className={linkClassName}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClassName}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 btn">
            {isAuthenticated ? (
              <>
                <span className="hidden text-sm text-slate-600 sm:inline">
                  {user?.name || user?.email}
                </span>
                {isAdminUser(user) ? (
                  <NavLink to="/dashboard" className={linkClassName}>
                    Dashboard
                  </NavLink>
                ) : null}
                <button
                  type="button"
                  onClick={logout}
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
