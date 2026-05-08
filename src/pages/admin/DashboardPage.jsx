import StatCard from './StatCard';
import DashboardIcon from './DashboardIcon';
import {
  destinationBreakdown,
  messageThreads,
  packages,
  revenuePoints,
  stats,
  tripSummary,
  upcomingTrips,
} from './dashboardData';

const maxRevenue = Math.max(...revenuePoints.map((point) => point.value));

function DashboardCard({ title, action, children, className = '' }) {
  return (
    <section
      className={`rounded-[1.75rem] border border-sky-100 bg-white p-5 shadow-[0_22px_60px_-40px_rgba(58,94,160,0.38)] ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-zinc-950">{title}</h2>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function RevenueChart() {
  const linePoints = revenuePoints
    .map((point, index) => {
      const x = (index / (revenuePoints.length - 1)) * 100;
      const y = 100 - (point.value / maxRevenue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,100 ${linePoints} 100,100`;
  const highlightIndex = revenuePoints.findIndex((point) => point.highlight);
  const highlight = revenuePoints[highlightIndex];
  const highlightX = (highlightIndex / (revenuePoints.length - 1)) * 100;
  const highlightY = 100 - (highlight.value / maxRevenue) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-bold text-zinc-950">${highlight.value}</p>
          <p className="text-xs text-zinc-400">12 Jul, 2026</p>
        </div>
        <button className="rounded-xl bg-sky-500 px-3 py-2 text-xs font-semibold text-white">
          Weekly
        </button>
      </div>

      <div className="rounded-2xl bg-[#f8fbff] p-4">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-52 w-full overflow-visible">
          {[0, 25, 50, 75, 100].map((line) => (
            <line
              key={line}
              x1="0"
              y1={line}
              x2="100"
              y2={line}
              stroke="#dbe7f4"
              strokeDasharray="2 4"
            />
          ))}
          <polygon points={areaPoints} fill="rgba(96, 165, 250, 0.12)" />
          <polyline
            points={linePoints}
            fill="none"
            stroke="#62aef8"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <line x1={highlightX} y1="0" x2={highlightX} y2="100" stroke="#b7d4ef" strokeDasharray="3 4" />
          <circle cx={highlightX} cy={highlightY} r="3.4" fill="#3b82f6" />
        </svg>

        <div className="mt-3 grid grid-cols-7 text-center text-xs text-zinc-400">
          {revenuePoints.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DestinationChart() {
  const segments = destinationBreakdown.reduce(
    (result, item) => {
      result.items.push({
        ...item,
        dashArray: `${item.percent} ${100 - item.percent}`,
        dashOffset: -result.offset,
      });
      return {
        items: result.items,
        offset: result.offset + item.percent,
      };
    },
    { items: [], offset: 0 }
  ).items;

  return (
    <div className="grid gap-5 xl:grid-cols-[170px_minmax(0,1fr)] xl:items-center">
      <div className="mx-auto">
        <svg viewBox="0 0 42 42" className="h-40 w-40 -rotate-90">
          <circle cx="21" cy="21" r="15.915" fill="none" stroke="#eef5fb" strokeWidth="5" />
          {segments.map((item) => (
            <circle
              key={item.name}
              cx="21"
              cy="21"
              r="15.915"
              fill="none"
              strokeLinecap="round"
              strokeWidth="5"
              strokeDasharray={item.dashArray}
              strokeDashoffset={item.dashOffset}
              className={item.tone.replace('bg-', 'stroke-')}
            />
          ))}
        </svg>
      </div>

      <div className="space-y-4">
        {destinationBreakdown.map((item) => (
          <div key={item.name} className="flex items-start gap-3">
            <span className={`mt-1 h-3 w-3 rounded-full ${item.tone}`} />
            <div>
              <p className="text-sm font-semibold text-zinc-950">
                {item.name} <span className="text-zinc-400">({item.percent}%)</span>
              </p>
              <p className="text-xs text-zinc-400">{item.participants}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniCalendar() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-zinc-950">July 2026</p>
          <p className="text-xs text-zinc-400">Plan upcoming trips</p>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <button className="rounded-lg border border-zinc-200 p-1.5">
            <DashboardIcon name="chevron-left" className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-lg border border-zinc-200 p-1.5">
            <DashboardIcon name="chevron-right" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-[11px] text-zinc-400">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}

        {days.map((day) => {
          const selected = day === 12 || day === 19;
          return (
            <span
              key={day}
              className={`flex h-8 items-center justify-center rounded-xl text-xs font-semibold ${
                selected ? 'bg-sky-500 text-white' : 'text-zinc-600'
              }`}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_320px]">
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_380px]">
            <DashboardCard title="Revenue Overview" action={<button className="rounded-xl bg-sky-500 px-3 py-2 text-xs font-semibold text-white">Weekly</button>}>
              <RevenueChart />
            </DashboardCard>

            <DashboardCard title="Top Destinations" action={<button className="rounded-xl bg-sky-500 px-3 py-2 text-xs font-semibold text-white">This Month</button>}>
              <DestinationChart />
            </DashboardCard>
          </div>

          <DashboardCard title="Total Trips">
            <div className="flex flex-wrap items-center gap-5">
              <div>
                <p className="text-3xl font-bold text-zinc-950">1,200</p>
                <p className="text-xs text-zinc-400">Active this month</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {tripSummary.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-zinc-500">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
                    <span>{item.label}</span>
                    <span className="font-semibold text-zinc-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_340px]">
            <DashboardCard
              title="Travel Packages"
              action={
                <div className="flex items-center gap-2">
                  <button className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-500">
                    Sort by: Latest
                  </button>
                  <button className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700">
                    View All
                  </button>
                </div>
              }
            >
              <div className="grid gap-4 md:grid-cols-3">
                {packages.map((item) => (
                  <article key={item.name} className="overflow-hidden rounded-[1.4rem] border border-zinc-200">
                    <div className="relative h-44">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-x-0 top-0 flex justify-between p-3">
                        <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-zinc-700 backdrop-blur">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-lg font-bold text-zinc-950">{item.name}</p>
                      <p className="mt-1 text-sm text-zinc-500">{item.location}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                        <span>{item.detail}</span>
                        <DashboardIcon name="chevron-right" className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Messages">
              <div className="space-y-3">
                {messageThreads.map((thread) => (
                  <div key={thread.name} className="flex items-start gap-3 rounded-2xl border border-zinc-100 px-3 py-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xs font-bold ${thread.accent}`}>
                      {thread.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-zinc-950">{thread.name}</p>
                        <span className="text-[11px] text-zinc-400">{thread.time}</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">{thread.preview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>

        <div className="space-y-6">
          <DashboardCard title="Calendar">
            <MiniCalendar />
          </DashboardCard>

          <DashboardCard
            title="Upcoming Trips"
            action={
              <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-white">
                <DashboardIcon name="plus" className="h-4 w-4" />
              </button>
            }
          >
            <div className="space-y-4">
              {upcomingTrips.map((trip) => (
                <article key={trip.title} className="flex items-start gap-3 rounded-2xl border border-zinc-100 p-3">
                  <img src={trip.image} alt={trip.title} className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600">
                      {trip.category}
                    </p>
                    <p className="mt-1 text-sm font-bold text-zinc-950">{trip.title}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <DashboardIcon name="sparkle" className="h-3.5 w-3.5" />
                        {trip.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <DashboardIcon name="calendar" className="h-3.5 w-3.5" />
                        {trip.dates}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
