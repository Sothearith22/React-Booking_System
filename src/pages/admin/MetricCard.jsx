import DashboardIcon from './DashboardIcon';

const deltaClasses = {
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  info: 'bg-sky-50 text-sky-700',
};

const accentClasses = {
  emerald: 'bg-emerald-600 text-white',
  amber: 'bg-amber-500 text-white',
  zinc: 'bg-zinc-900 text-white',
  sky: 'bg-sky-600 text-white',
  rose: 'bg-rose-600 text-white',
};

export default function MetricCard({
  title,
  value,
  detail,
  delta,
  deltaTone = 'info',
  accent = 'zinc',
  icon = 'overview',
}) {
  return (
    <article className="border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-zinc-500">{title}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">{value}</h2>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${accentClasses[accent] || accentClasses.zinc}`}
        >
          <DashboardIcon name={icon} />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">{detail}</p>
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${deltaClasses[deltaTone] || deltaClasses.info}`}
        >
          {delta}
        </span>
      </div>
    </article>
  );
}
