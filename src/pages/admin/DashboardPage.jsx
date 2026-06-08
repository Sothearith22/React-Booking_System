import StatCard from './dashboard/components/StatCard';
import DashboardIcon from './dashboard/components/DashboardIcon';
import {
  recentActivities,
  revenuePoints,
  stats,
  upcomingCheckIns,
} from './dashboard/constants/dashboard.data';

const maxRevenue = Math.max(...revenuePoints.map((point) => point.value));

function Panel({ title, action, children, className = '' }) {
  return (
    <section className={`rounded-lg border border-[#dee2ef] bg-white shadow-[0_2px_8px_rgba(17,24,39,0.12)] ${className}`}>
      <div className="flex items-center justify-between gap-4 px-8 py-7">
        <h2 className="text-[26px] font-bold tracking-normal text-black">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function RevenueTrends() {
  return (
    <Panel
      title="Revenue Trends"
      className="min-h-[446px]"
      action={
        <button className="flex items-center gap-2 text-lg font-medium text-[#064ed0]">
          This Week
          <DashboardIcon name="chevron-down" className="h-4 w-4" />
        </button>
      }
    >
      <div className="px-8 pb-7 pt-14">
        <div className="flex h-64 items-end gap-2 border-b border-[#e5e7ef] sm:gap-3">
          {revenuePoints.map((point) => (
            <div key={point.label} className="flex h-full flex-1 items-end">
              <div
                className={`w-full rounded-t-sm ${point.highlight ? 'bg-[#1155cc] shadow-[inset_0_0_0_2px_rgba(0,57,155,0.25)]' : 'bg-[#e4e5f0]'}`}
                style={{ height: `${Math.max(28, (point.value / maxRevenue) * 100)}%` }}
                title={`${point.label}: ${point.value}`}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-7 text-center text-base font-medium text-[#151827]">
          {revenuePoints.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function RecentActivity() {
  return (
    <Panel title="Recent Activity" className="min-h-[446px]">
      <div className="space-y-7 px-8 pb-8 pt-1">
        {recentActivities.map((activity) => (
          <article key={activity.id} className="flex items-start gap-5">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.iconTone}`}>
              <DashboardIcon name={activity.icon} className="h-5 w-5" />
            </div>
            <div className="min-w-0 text-[#151827]">
              <p className="text-lg font-medium leading-snug">
                {activity.title}{' '}
                {activity.highlight ? (
                  <span className="font-semibold text-[#064ed0]">{activity.highlight}</span>
                ) : null}
              </p>
              <p className="mt-1 text-base font-medium text-[#151827]">{activity.meta}</p>
            </div>
          </article>
        ))}

        <button className="h-12 w-full rounded-lg border border-[#c5ccdd] text-lg font-medium text-black transition hover:border-[#064ed0] hover:text-[#064ed0]">
          View All
        </button>
      </div>
    </Panel>
  );
}

function UpcomingCheckIns() {
  return (
    <Panel
      title="Upcoming Check-ins"
      action={<button className="text-lg font-medium text-[#064ed0]">Manage Arrivals</button>}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-[#f0f1fa] text-lg font-medium text-[#24263a]">
            <tr>
              <th className="px-8 py-3.5 font-medium">Guest Name</th>
              <th className="px-8 py-3.5 font-medium">Room</th>
              <th className="px-8 py-3.5 font-medium">ETA</th>
              <th className="px-8 py-3.5 font-medium">Status</th>
              <th className="px-8 py-3.5 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {upcomingCheckIns.map((guest) => (
              <tr key={guest.id} className="border-t border-[#e7e8f0] text-xl text-[#171827]">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e3e6f0] text-sm font-bold text-[#3b4053]">
                      {guest.initials}
                    </span>
                    <span className="font-medium text-black">{guest.guest}</span>
                  </div>
                </td>
                <td className="px-8 py-5 font-medium">{guest.room}</td>
                <td className="px-8 py-5 font-medium">{guest.eta}</td>
                <td className="px-8 py-5">
                  <span className={`rounded-full px-3 py-1 text-base font-medium ${guest.statusTone}`}>
                    {guest.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="inline-flex h-8 w-8 items-center justify-center text-[#064ed0]">
                    <DashboardIcon name="more-vertical" className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-[40px] font-bold leading-tight tracking-normal text-[#151720]">Overview</h1>
        <p className="mt-1 text-xl font-medium text-[#24263a]">Welcome back to StayManager Pro.</p>
      </section>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[minmax(0,2.05fr)_370px]">
        <RevenueTrends />
        <RecentActivity />
      </section>

      <UpcomingCheckIns />
    </div>
  );
}
