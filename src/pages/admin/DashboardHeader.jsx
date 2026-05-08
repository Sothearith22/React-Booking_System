import DashboardIcon from './DashboardIcon';

export default function DashboardHeader({ title, subtitle }) {
  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-zinc-400">
          Admin workspace
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-3xl text-sm text-zinc-500">{subtitle}</p> : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex min-w-0 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-400 shadow-sm sm:min-w-[280px]">
          <DashboardIcon name="search" className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search anything"
            className="w-full bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400"
          />
        </label>

        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 shadow-sm transition hover:text-zinc-900">
          <DashboardIcon name="bell" className="h-4 w-4" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <button className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-sm transition hover:border-zinc-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sm font-bold text-sky-700">
            RH
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-zinc-950">Ruben Herwitz</p>
            <p className="text-xs text-zinc-400">Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
}
