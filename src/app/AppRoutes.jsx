import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';
import { getDefaultRedirectPath } from '../utils/auth';

// Components
import PageLoader from '../components/common/Loader';
import { ProtectedRoute } from './ProtectedRoute';

// Layouts
const AuthRoute = lazy(() => import('../pages/auth/AuthRoute').then((module) => ({ default: module.AuthRoute })));
const AdminLayout = lazy(() => import('../layouts/AdminLayout').then((module) => ({ default: module.AdminLayout })));
const MainLayout = lazy(() => import('../layouts/MainLayout').then((module) => ({ default: module.MainLayout })));

// Admin Pages
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const UsersPage = lazy(() => import('../pages/admin/Users.jsx'));
const BookingsPage = lazy(() => import('../pages/admin/Bookings.jsx'));
const RoomsPage = lazy(() => import('../pages/admin/Rooms.jsx'));
const ReviewsPage = lazy(() => import('../pages/admin/Reviews.jsx'));
const RoomCategoriesPage = lazy(() => import('../pages/admin/RoomCategories.jsx'));
const InventoryPage = lazy(() => import('../pages/admin/Inventory.jsx'));
const ServiceAvailabilityPage = lazy(() => import('../pages/admin/ServiceAvailability.jsx'));

// Customer Pages
const HomePage = lazy(() => import('../pages/customer/HomePage').then((module) => ({ default: module.HomePage })));
const ProfilePage = lazy(() => import('../pages/customer/ProfilePage').then((module) => ({ default: module.ProfilePage })));

// Common
const NotFound = lazy(() => import('../components/common/EmptyState.jsx').then((module) => ({ default: module.EmptyState })));

const RootRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <PageLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <PageLoader />;
  }

  return <Navigate to={getDefaultRedirectPath(user)} replace />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        <Route path="/" element={<RootRedirect />} />

        {/* Auth */}
        <Route path="/login" element={<AuthRoute initialMode="login" />} />
        <Route path="/register" element={<AuthRoute initialMode="register" />} />

        {/* Admin */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN,ROLES.MANAGER,ROLES.STAFF,]}/>
          }
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={<Navigate to="dashboard" replace />}
            />

            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="categories" element={<RoomCategoriesPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="availability" element={<ServiceAvailabilityPage />} />
          </Route>
        </Route>

        {/* Customer & User*/}
        <Route path="/customer" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />





            
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
