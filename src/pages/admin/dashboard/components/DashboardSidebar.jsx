import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/appConstants';
import { useAuth } from '../../../../features/auth';
import DashboardIcon from './DashboardIcon';

export default function DashboardSidebar({ navItems = [] }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <aside className="w-full border-r border-[#c7cbe0] bg-[#f0f2ff] xl:h-screen xl:w-[313px] xl:shrink-0">
      <div className="flex h-full min-h-0 flex-col px-7 py-6">
        <div className="flex items-center gap-5">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"
            alt=""
            className="h-[50px] w-[50px] rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-[25px] font-bold leading-tight text-[#064ed0]">StayManager Pro</p>
            <p className="mt-1 text-lg font-medium text-[#151827]">Property Admin</p>
          </div>
        </div>

        <nav className="mt-12 min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group flex min-w-0 items-center gap-5 rounded-lg px-5 py-3.5 text-base font-semibold transition ${
                    isActive
                      ? 'bg-[#2f67e8] text-white shadow-[0_8px_18px_rgba(47,103,232,0.22)]'
                      : 'text-[#1f2433] hover:bg-white/70 hover:text-[#064ed0]'
                  }`
                }
              >
                <DashboardIcon name={item.icon} className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="mt-8 space-y-4">
          <NavLink
            to="/admin/bookings"
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1155cc] px-5 py-3 text-base font-semibold text-white shadow-[0_8px_18px_rgba(17,85,204,0.22)] transition hover:bg-[#064ed0]"
          >
            <DashboardIcon name="plus" className="h-5 w-5" />
            Quick Booking
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-[#c7cbe0] px-5 py-3 text-sm font-semibold text-[#5b6070] transition hover:border-[#064ed0] hover:text-[#064ed0]"
          >
            Logout {user?.name ? `(${user.name})` : ''}
          </button>
        </div>
      </div>
    </aside>
  );
}
