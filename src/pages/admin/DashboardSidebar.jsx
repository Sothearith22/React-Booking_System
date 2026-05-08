import { NavLink } from 'react-router-dom';
import DashboardIcon from './DashboardIcon';

export default function DashboardSidebar({ navItems }) {
  return (
    <aside className="border-b border-[#264764] bg-[#10263a] text-white xl:sticky xl:top-0 xl:min-h-screen xl:w-72 xl:border-b-0 xl:border-r">
      <div className="flex h-full flex-col">
        <div className="border-b border-[#264764] px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-[#19b57a] text-white">
              <DashboardIcon name="rooms" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                Hotel admin
              </p>
              <h2 className="text-lg font-semibold">RoomFlow</h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-[#264764] bg-[#264764] text-sm">
            <div className="bg-[#17324a] px-3 py-3">
              <p className="text-slate-300">Live occupancy</p>
              <p className="mt-2 text-xl font-semibold text-white">84%</p>
            </div>
            <div className="bg-[#17324a] px-3 py-3">
              <p className="text-slate-300">Open actions</p>
              <p className="mt-2 text-xl font-semibold text-white">23</p>
            </div>
          </div>
        </div>

        <div className="px-3 py-4">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Workspace
          </p>
          <nav className="mt-3 grid gap-1 md:grid-cols-2 xl:grid-cols-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-3 px-3 py-3 text-left transition ${
                    isActive
                      ? 'bg-[#e6fbf1] text-[#10263a]'
                      : 'text-slate-100 hover:bg-[#17324a]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex min-w-0 items-center gap-3">
                      <DashboardIcon
                        name={item.icon}
                        className={`h-4 w-4 ${isActive ? 'text-[#19b57a]' : 'text-slate-400'}`}
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{item.label}</span>
                        <span className={`block truncate text-xs ${isActive ? 'text-[#496178]' : 'text-slate-400'}`}>
                          {item.helper}
                        </span>
                      </span>
                    </span>
                    <span
                      className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold ${
                        isActive
                          ? 'bg-white text-[#0f7b55]'
                          : 'bg-[#1d3b57] text-slate-100'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-[#264764] px-5 py-5">
          <div className="space-y-3 text-sm text-slate-100">
            <div>
              <p className="text-slate-400">Property</p>
              <p className="font-medium text-white">The Meridian Phnom Penh</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Currency</span>
              <span>USD / KHR</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Timezone</span>
              <span>Asia/Phnom_Penh</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
