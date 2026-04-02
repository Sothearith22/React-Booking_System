import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Dashboard</p>
            <h1 className="text-xl font-semibold text-white">Welcome, {user?.name || 'Traveler'}</h1>
          </div>

          <div className="flex items-center gap-3">
  
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      
      </main>
    </div>
  );
};
