import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthRoute } from '../pages/auth/AuthRoute';
import { Home } from '../public-site/pages/Home';
import About from '../public-site/pages/About';
import { Contact } from '../public-site/pages/Contact';
import { Explore } from '../public-site/pages/Explore';
import { Dashboard } from '../dashboard/Dashboard';
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
          

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
