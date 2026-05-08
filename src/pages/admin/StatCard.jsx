import DashboardIcon from './DashboardIcon';

export default function StatCard({ item }) {
  return (
    <div className="rounded-[1.4rem] border border-sky-100 bg-white p-4 shadow-[0_18px_45px_-32px_rgba(58,94,160,0.45)]">
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.iconTone}`}>
          <DashboardIcon name={item.icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-zinc-400">{item.title}</p>
              <p className="mt-1 text-[1.75rem] font-bold leading-none text-zinc-950">{item.value}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${item.trendTone}`}>
              {item.trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
