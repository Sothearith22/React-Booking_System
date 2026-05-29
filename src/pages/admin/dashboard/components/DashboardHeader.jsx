import DashboardIcon from './DashboardIcon';
import { useAuth } from '../../../../features/auth';

export default function DashboardHeader({ title, subtitle }) {
  const { user } = useAuth();
  const userInitials = user?.name?.slice(0, 2).toUpperCase() || 'AD';
  const userRole = typeof user?.role === 'string' ? user.role : 'Staff';
  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div className="animate-in fade-in slide-in-from-left-4 duration-700">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600">
          Admin Workspace
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-zinc-950">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-zinc-500">{subtitle}</p> : null}
      </div>

      <div className="flex w-full flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-700 sm:flex-row sm:items-center xl:w-auto xl:justify-end">
        <label className="group relative flex w-full max-w-md flex-1 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-400 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] transition-all duration-300 focus-within:border-sky-400 focus-within:shadow-[0_8px_30px_-10px_rgba(14,165,233,0.15)] sm:min-w-[320px] xl:flex-none xl:w-[360px]">
          <DashboardIcon name="search" className="h-4 w-4 shrink-0 transition-colors group-focus-within:text-sky-500" />
          <input
            type="text"
            placeholder="Search bookings, guests..."
            className="w-full bg-transparent text-sm font-medium text-zinc-700 outline-none placeholder:text-zinc-400"
          />
        </label>

        <div className="flex items-center gap-3">
          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all duration-300 hover:bg-zinc-50 hover:text-sky-500 hover:shadow-md active:scale-95">
            <DashboardIcon name="bell" className="h-5 w-5" />
            <span className="absolute right-3.5 top-3.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <button className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-1 pr-4 shadow-sm transition-all duration-300 hover:border-sky-200 hover:bg-sky-50/50 hover:shadow-md active:scale-95">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 font-bold text-white shadow-lg shadow-sky-100 transition-transform group-hover:scale-105">
              {userInitials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-bold text-zinc-950 transition-colors group-hover:text-sky-600">{user?.name || 'Admin'}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{userRole}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
