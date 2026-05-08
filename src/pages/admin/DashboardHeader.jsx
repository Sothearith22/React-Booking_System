import { Link } from 'react-router-dom';
import DashboardIcon from './DashboardIcon';

export default function DashboardHeader({
  dateLabel,
  title,
  subtitle,
  primaryActionLabel = 'New booking',
  primaryActionTo = '/dashboard/bookings',
}) {
  return (
    <header className="border border-zinc-200 bg-white">
      <div className="flex flex-col gap-5 px-5 py-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Booking room and service admin
          </p>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">{title}</h1>
            <p className="text-sm text-zinc-500">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex min-w-0 items-center gap-3 border border-zinc-200 bg-zinc-50 px-3 py-2 lg:min-w-[280px]">
            <DashboardIcon name="search" className="h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search rooms, guests, invoices"
              className="w-full min-w-0 bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600 lg:block">
              {dateLabel}
            </div>
            <button className="inline-flex h-11 items-center justify-center border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
              <span className="mr-2">
                <DashboardIcon name="download" className="h-4 w-4" />
              </span>
              Export
            </button>
            <Link
              to={primaryActionTo}
              className="inline-flex h-11 items-center justify-center bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              <span className="mr-2">
                <DashboardIcon name="plus" className="h-4 w-4" />
              </span>
              {primaryActionLabel}
            </Link>
            <button className="flex h-11 w-11 items-center justify-center border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50">
              <DashboardIcon name="bell" className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 border border-zinc-200 px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center bg-emerald-600 text-sm font-semibold text-white">
                AD
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900">Alicia Dorsey</p>
                <p className="truncate text-xs text-zinc-500">General manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
