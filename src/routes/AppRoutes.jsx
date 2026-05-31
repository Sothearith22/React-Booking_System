import { Navigate, Route, Routes } from 'react-router-dom';

import { ROLES, ROUTES } from '../constants/appConstants';

import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';

// Layouts
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { CustomerLayout } from '../layouts/CustomerLayout';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import NotFoundPage from '../pages/auth/NotFoundPage';

// Admin Feature Pages
import DashboardPage from '../pages/admin/DashboardPage';
import UsersPage from '../features/users/UsersPage';
import BookingsPage from '../features/bookings/BookingsPage';
import RoomsPage from '../features/rooms/page/RoomsPage';
import RoomCategoriesPage from '../features/category/RoomCategoryPage';
import ReviewsPage from '../features/reviews/ReviewsPage';
import InventoryPage from '../features/inventory/InventoryPage';
import ServiceAvailabilityPage from '../features/services/ServiceAvailabilityPage';

// Customer Feature Pages
import { HomePage } from '../features/customers/pages/HomePage';
import { ProfilePage } from '../features/customers/pages/ProfilePage';
import { RoomPage } from '../features/customers/pages/RoomPage';
import { AboutPage } from '../features/customers/pages/AboutPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route
        path={ROUTES.REGISTER}
        element={
          <GuestRoute>
            <AuthLayout initialMode="register" />
          </GuestRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.ADMIN,
              ROLES.MANAGER,
              ROLES.STAFF,
            ]}
          />
        }
      >
        <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route path="dashboard" element={<DashboardPage />} />
          {/* <Route path="" element={}/> */}
          <Route path="users" element={<UsersPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="service" element={<Navigate to={ROUTES.ADMIN_CATEGORIES} replace />} />
          <Route path="services" element={<Navigate to={ROUTES.ADMIN_CATEGORIES} replace />} />
          <Route path="categories" element={<RoomCategoriesPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route
            path="availability"
            element={<ServiceAvailabilityPage />}
          />
        </Route>
      </Route>

      {/* Customer Routes */}
      <Route path={ROUTES.CUSTOMER} element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.CUSTOMER_ABOUT.slice(1)} element={<AboutPage />} />
        <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route path={ROUTES.CUSTOMER_PROFILE.slice(1)} element={<ProfilePage />} />
          <Route path={ROUTES.CUSTOMER_ROOM.slice(1)} element={<RoomPage />} />
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
