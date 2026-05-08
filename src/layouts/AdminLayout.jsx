import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from '../pages/admin/DashboardHeader';
import DashboardSidebar from '../pages/admin/DashboardSidebar';
import { navItems } from '../pages/admin/dashboardData';

export const AdminLayout = () => {
  const location = useLocation();

  const currentPage =
    navItems.find((item) => item.to === location.pathname) || navItems[0];

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <div className="mx-auto flex min-h-screen max-w-[1580px] flex-col gap-8 px-4 py-6 xl:flex-row xl:px-8">
        <DashboardSidebar navItems={navItems} />

        <main className="min-w-0 flex-1 py-2">
          <DashboardHeader
            title={currentPage.headerTitle}
            subtitle={currentPage.headerSubtitle}
          />
          <div className="mt-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
