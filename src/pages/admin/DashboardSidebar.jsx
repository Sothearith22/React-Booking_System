import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import DashboardIcon from './DashboardIcon';

export default function DashboardSidebar({ navItems = [] }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="w-full xl:w-[280px] xl:shrink-0">
      <div className="flex flex-col rounded-[2.25rem] border border-zinc-200 bg-white p-5 shadow-[0_22px_60px_-40px_rgba(58,94,160,0.38)] sm:p-6 xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)] xl:rounded-[2.5rem]">
        {/* Logo Section */}
        <div className="mb-6 px-2 xl:mb-8">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-200">
              <DashboardIcon name="logo" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight text-zinc-950">Travelie</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-1.5 xl:overflow-y-auto xl:pr-1 scrollbar-hide">
          <p className="mb-3 px-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Main Menu</p>
          <div className="grid gap-1.5 md:grid-cols-2 xl:grid-cols-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group relative flex min-w-0 items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'active bg-sky-500 text-white shadow-[0_12px_24px_-8px_rgba(14,165,233,0.5)]'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                  }`
                }
              >
                <DashboardIcon
                  name={item.icon}
                  className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110`}
                />
                <span className="truncate">{item.label}</span>
                {/* Active Indicator Pin */}
                <div className={`absolute right-4 h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-opacity duration-300 group-[.active]:opacity-100`} />
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom Section: Profile & Logout — pinned to bottom via mt-auto */}
        <div className="mt-6 border-t border-zinc-100 pt-6 xl:mt-auto">
          <div className="mb-4 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-sm font-bold text-zinc-600">
              {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-zinc-950">{user?.name || 'Admin User'}</p>
              <p className="truncate text-xs text-zinc-400">{user?.email || 'admin@travelie.com'}</p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold text-rose-500 transition-all duration-300 hover:bg-rose-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 transition-colors group-hover:bg-rose-200">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
