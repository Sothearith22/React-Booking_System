import { Outlet } from 'react-router-dom';
import DashboardHeader from '../pages/admin/dashboard/components/DashboardHeader';
import DashboardSidebar from '../pages/admin/dashboard/components/DashboardSidebar';
import { navItems } from '../pages/admin/dashboard/constants/dashboard.data';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#fbf9ff] font-sans selection:bg-blue-100 selection:text-blue-900 xl:h-screen xl:overflow-hidden">
      <div className="flex min-h-screen w-full flex-col xl:h-full xl:flex-row xl:items-stretch">
        <DashboardSidebar navItems={navItems} />

        <main className="min-w-0 flex-1 xl:h-full xl:overflow-y-auto">
          <DashboardHeader />
          <div className="px-5 py-11 sm:px-8 lg:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
