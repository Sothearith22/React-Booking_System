import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from '../features/dashboard/components/DashboardHeader';
import DashboardSidebar from '../features/dashboard/components/DashboardSidebar';
import { navItems } from '../features/dashboard/dashboardData';

export const AdminLayout = () => {
  const location = useLocation();

  const currentPage =
    navItems.find((item) => item.to === location.pathname) || navItems[0];

  const dateLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950">
      <div className="mx-auto flex min-h-screen max-w-[1720px] flex-col xl:flex-row">
        <DashboardSidebar navItems={navItems} />

        <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8 xl:py-6">
          <DashboardHeader
            dateLabel={dateLabel}
            title={currentPage.headerTitle}
            subtitle={currentPage.headerSubtitle}
          />

          <div className="mt-6 space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
