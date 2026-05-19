import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from '../features/dashboard/components/DashboardHeader';
import DashboardSidebar from '../features/dashboard/components/DashboardSidebar';
import { navItems } from '../features/dashboard/constants/dashboard.data';

export const AdminLayout = () => {
  const location = useLocation();

  const currentPage =
    navItems.find((item) => item.to === location.pathname) || navItems[0];

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans selection:bg-sky-100 selection:text-sky-900 xl:h-screen xl:overflow-hidden">
      <div className="flex min-h-screen w-full flex-col gap-6 px-4 py-4 sm:px-6 xl:h-full xl:flex-row xl:items-stretch xl:gap-8 xl:px-6 xl:py-6">
        <DashboardSidebar navItems={navItems} />

        <main className="min-w-0 flex-1 pb-8 xl:h-full xl:overflow-y-auto xl:py-2 xl:pr-2">
          <DashboardHeader
            title={currentPage.headerTitle}
            subtitle={currentPage.headerSubtitle}
          />
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
