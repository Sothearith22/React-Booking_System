import { Navigate, Route, Routes } from 'react-router-dom';

import PageLoader from '../components/common/Loader';
import { ROLES } from '../constants/appConstants';
import { ROUTES } from '../constants/routes';

import { useAuth } from '../features/auth';
import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { getDefaultRedirectPath } from '../features/auth/utils/auth.utils';

// Layouts
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { CustomerLayout } from '../layouts/CustomerLayout';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import NotFoundPage from '../pages/auth/NotFoundPage';

// Admin Feature Pages
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import UsersPage from '../features/users/UsersPage';
import BookingsPage from '../features/bookings/BookingsPage';
import RoomsPage from '../features/rooms/page/RoomsPage';
import RoomCategoriesPage from '../features/rooms/page/RoomCategoriesPage';
import ReviewsPage from '../features/reviews/ReviewsPage';
import InventoryPage from '../features/inventory/InventoryPage';
import ServiceAvailabilityPage from '../features/services/ServiceAvailabilityPage';

// Customer Feature Pages
import { HomePage } from '../features/customers/pages/HomePage';
import { ProfilePage } from '../features/customers/pages/ProfilePage';
import { RoomPage } from '../features/customers/pages/RoomPage';

/**
 * Redirect user based on authentication and role
 */
const RootRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!user) {
    return <PageLoader />;
  }

  return <Navigate to={getDefaultRedirectPath(user)} replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path={ROUTES.ROOT} element={<RootRedirect />} />

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
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="room" element={<RoomPage />} />
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
