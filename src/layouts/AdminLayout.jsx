import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from '../pages/admin/DashboardHeader';
import DashboardSidebar from '../pages/admin/DashboardSidebar';
import { navItems } from '../pages/admin/dashboardData';

export const AdminLayout = () => {
  const location = useLocation();

  const currentPage =
    navItems.find((item) => item.to === location.pathname) || navItems[0];

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans selection:bg-sky-100 selection:text-sky-900">
      <div className="mx-auto flex min-h-screen max-w-[1680px] flex-col gap-6 px-4 py-4 sm:px-6 xl:flex-row xl:items-start xl:gap-10 xl:px-10 xl:py-6">
        <DashboardSidebar navItems={navItems} />

        <main className="min-w-0 flex-1 pb-8 xl:py-2">
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
