import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthRoute } from '../pages/auth/AuthRoute';
import { Home } from '../public-site/pages/Home';
import About from '../public-site/pages/About';
import { Contact } from '../public-site/pages/Contact';
import { Explore } from '../public-site/pages/Explore';
import Dashboard from '../features/dashboard/Dashboard';
import BookingsPage from '../features/dashboard/pages/BookingsPage';
import FinancePage from '../features/dashboard/pages/FinancePage';
import GuestsPage from '../features/dashboard/pages/GuestsPage';
import ReportsPage from '../features/dashboard/pages/ReportsPage';
import RoomsPage from '../features/dashboard/pages/RoomsPage';
import ServicesPage from '../features/dashboard/pages/ServicesPage';
import SettingsPage from '../features/dashboard/pages/SettingsPage';
import StaffPage from '../features/dashboard/pages/StaffPage';
import { RoleRoute } from '../routes/RoleRoute';
export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<Explore />} />

        </Route>


        <Route path="/register" element={<AuthRoute initialMode="register" />} />
        <Route path="/login" element={<AuthRoute initialMode="login" />} />





        {/*  Dashboard Admin */}
        <Route path="/dashboard"
          element={
            <RoleRoute roles={["admin"]}>
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="guests" element={<GuestsPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
