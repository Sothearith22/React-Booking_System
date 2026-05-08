import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import DashboardIcon from './DashboardIcon';

export default function DashboardSidebar({ navItems = [] }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="w-full xl:w-[260px]">
      <div className="flex h-full flex-col rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-[0_22px_60px_-40px_rgba(58,94,160,0.38)]">
        <div className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <DashboardIcon name="logo" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-zinc-950">Travelie</p>
              <p className="text-xs text-zinc-400">Travel dashboard</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 grid gap-1.5 md:grid-cols-2 xl:grid-cols-1">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-[0_14px_30px_-18px_rgba(59,130,246,0.9)]'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }`
              }
            >
              <DashboardIcon name={item.icon} className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-2xl border border-zinc-200 px-4 py-3 text-left text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 xl:mt-auto"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
