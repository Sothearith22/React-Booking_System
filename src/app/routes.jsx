import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { MainLayout } from '../layouts/MainLayout';
import DashboardSection from '../pages/admin/DashboardSection';
import { DashboardActionButton } from '../pages/admin/DashboardPrimitives';
import DashboardPage from '../pages/admin/DashboardPage';
import StatusBadge from '../pages/admin/StatusBadge';
import { AuthRoute } from '../pages/auth/AuthRoute';
import { HomePage } from '../pages/customer/HomePage';
import { ProfilePage } from '../pages/customer/ProfilePage';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';

const exploreRows = [
  {
    name: 'Skyline Suites',
    detail: 'Riverside view, breakfast included, free airport pickup',
    status: 'Limited rooms',
    tone: 'warning',
  },
  {
    name: 'Family Escape Package',
    detail: 'Two connecting rooms with late checkout and city tour perks',
    status: 'Popular',
    tone: 'info',
  },
  {
    name: 'Weekend Business Stay',
    detail: 'Flexible cancellation, meeting room credits, fast Wi-Fi',
    status: 'Available',
    tone: 'success',
  },
];

const bookingsRows = [
  {
    name: 'Ocean view suite',
    detail: '3 arrivals scheduled before 2:00 PM',
    status: 'Ready to confirm',
    tone: 'success',
  },
  {
    name: 'Long-stay apartments',
    detail: '2 extensions pending housekeeping review',
    status: 'Needs review',
    tone: 'warning',
  },
  {
    name: 'Late-night arrivals',
    detail: 'Airport transfer details missing for 4 guests',
    status: 'Follow up',
    tone: 'danger',
  },
];

const servicesRows = [
  {
    name: 'Spa reservations',
    detail: '12 appointments booked across peak evening slots',
    status: 'On track',
    tone: 'success',
  },
  {
    name: 'Airport pickups',
    detail: 'Driver assignments still needed for 3 arrivals',
    status: 'Pending',
    tone: 'warning',
  },
  {
    name: 'Dining add-ons',
    detail: 'Upsell conversion improved 14% week over week',
    status: 'Improving',
    tone: 'info',
  },
];

const guestsRows = [
  {
    name: 'VIP arrivals',
    detail: 'Personalized welcome kits prepared for 6 guests',
    status: 'Prepared',
    tone: 'success',
  },
  {
    name: 'Loyalty members',
    detail: '9 profiles missing updated room preferences',
    status: 'Incomplete',
    tone: 'warning',
  },
  {
    name: 'Guest feedback',
    detail: '2 unresolved service notes from last night',
    status: 'Action needed',
    tone: 'danger',
  },
];

const financeRows = [
  {
    name: 'Outstanding invoices',
    detail: '7 corporate invoices due within the next 48 hours',
    status: 'Monitor',
    tone: 'warning',
  },
  {
    name: 'Daily revenue snapshot',
    detail: 'Room revenue is pacing 8% above the weekly baseline',
    status: 'Healthy',
    tone: 'success',
  },
  {
    name: 'Refund requests',
    detail: '1 disputed minibar charge awaiting approval',
    status: 'Review',
    tone: 'info',
  },
];

const staffRows = [
  {
    name: 'Front desk coverage',
    detail: 'Evening shift is fully staffed for late arrivals',
    status: 'Covered',
    tone: 'success',
  },
  {
    name: 'Housekeeping rotations',
    detail: '2 team members requested schedule swaps for Saturday',
    status: 'Pending',
    tone: 'warning',
  },
  {
    name: 'Training queue',
    detail: 'New concierge onboarding checklist is 75% complete',
    status: 'In progress',
    tone: 'info',
  },
];

const reportsRows = [
  {
    name: 'Occupancy forecast',
    detail: 'Weekend demand remains strongest in deluxe categories',
    status: 'Updated',
    tone: 'success',
  },
  {
    name: 'Channel mix',
    detail: 'Direct bookings now account for 41% of monthly revenue',
    status: 'Growing',
    tone: 'info',
  },
  {
    name: 'Guest satisfaction',
    detail: 'Average post-stay rating held at 4.8/5 this week',
    status: 'Excellent',
    tone: 'success',
  },
];

const settingsRows = [
  {
    name: 'Cancellation policy',
    detail: 'Current grace period is 24 hours before check-in',
    status: 'Published',
    tone: 'neutral',
  },
  {
    name: 'Notification rules',
    detail: 'Late checkout alerts still send only to email recipients',
    status: 'Adjust',
    tone: 'warning',
  },
  {
    name: 'Payment methods',
    detail: 'Visa, Mastercard, and ABA QR remain enabled',
    status: 'Configured',
    tone: 'success',
  },
];

function MarketingPage({ eyebrow, title, description, rows, actionLabel, actionTo }) {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 text-white sm:px-10 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">{description}</p>
        {actionLabel ? (
          <div className="mt-8">
            <DashboardActionButton label={actionLabel} to={actionTo} tone="dark" />
          </div>
        ) : null}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {rows.map((row) => (
          <article key={row.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">{row.name}</h2>
              <StatusBadge label={row.status} tone={row.tone} />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{row.detail}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function AdminWorkspacePage({
  eyebrow,
  title,
  subtitle,
  actionLabel,
  rows,
}) {
  return (
    <DashboardSection
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      action={<DashboardActionButton label={actionLabel} tone="light" />}
    >
      <div className="divide-y divide-zinc-200">
        {rows.map((row) => (
          <div
            key={row.name}
            className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto] md:items-center"
          >
            <div>
              <p className="text-sm font-semibold text-zinc-950">{row.name}</p>
              <p className="mt-1 text-sm text-zinc-500">{row.detail}</p>
            </div>
            <p className="text-sm text-zinc-600">{subtitle}</p>
            <div className="md:justify-self-end">
              <StatusBadge label={row.status} tone={row.tone} />
            </div>
          </div>
        ))}
      </div>
    </DashboardSection>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/explore"
          element={
            <MarketingPage
              eyebrow="Explore"
              title="Discover flexible stays built around the way you travel."
              description="Browse room types, travel bundles, and guest perks curated for quick city breaks, business trips, and longer family stays."
              actionLabel="Create an account"
              actionTo="/register"
              rows={exploreRows}
            />
          }
        />
        <Route
          path="/about"
          element={
            <MarketingPage
              eyebrow="About"
              title="A simple booking experience for guests and hotel teams."
              description="React Booking brings guest registration, room planning, and internal operations into a single interface so reservations stay clear from first click to checkout."
              rows={[
                {
                  name: 'Fast guest flows',
                  detail: 'Sign up, sign in, and manage access without leaving the main booking experience.',
                  status: 'Core feature',
                  tone: 'success',
                },
                {
                  name: 'Shared admin workspace',
                  detail: 'Keep bookings, services, staff, and reports organized under one dashboard.',
                  status: 'Operational',
                  tone: 'info',
                },
                {
                  name: 'API-ready auth',
                  detail: 'Cookie-based session handling is already wired for backend integration.',
                  status: 'Integrated',
                  tone: 'neutral',
                },
              ]}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <MarketingPage
              eyebrow="Contact"
              title="Keep your reservations team, operations desk, and guests aligned."
              description="Use this area as the public contact hub for support hours, escalation paths, and pre-arrival coordination details."
              rows={[
                {
                  name: 'Reservations desk',
                  detail: 'Best for new bookings, room changes, and pre-arrival requests.',
                  status: 'Open daily',
                  tone: 'success',
                },
                {
                  name: 'Operations team',
                  detail: 'Use for late check-ins, airport pickup changes, or in-stay support.',
                  status: '24/7',
                  tone: 'info',
                },
                {
                  name: 'Corporate sales',
                  detail: 'For group stays, recurring travel, and account-based billing.',
                  status: 'Weekdays',
                  tone: 'neutral',
                },
              ]}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/register" element={<AuthRoute initialMode="register" />} />
      <Route path="/login" element={<AuthRoute initialMode="login" />} />

      <Route
        path="/dashboard"
        element={
          <RoleRoute roles={['admin']}>
            <AdminLayout />
          </RoleRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route
          path="bookings"
          element={
            <AdminWorkspacePage
              eyebrow="Reservations"
              title="Booking operations"
              subtitle="Review upcoming arrivals, unresolved details, and reservation handoffs."
              actionLabel="Create booking"
              rows={bookingsRows}
            />
          }
        />
        <Route
          path="services"
          element={
            <AdminWorkspacePage
              eyebrow="Add-ons"
              title="Service coordination"
              subtitle="Track guest requests tied to transfers, dining, spa, and concierge activity."
              actionLabel="Add service"
              rows={servicesRows}
            />
          }
        />
        <Route
          path="guests"
          element={
            <AdminWorkspacePage
              eyebrow="Guests"
              title="Guest experience queue"
              subtitle="Keep VIP notes, feedback, and profile updates visible for the front office team."
              actionLabel="Add guest note"
              rows={guestsRows}
            />
          }
        />
        <Route
          path="finance"
          element={
            <AdminWorkspacePage
              eyebrow="Finance"
              title="Revenue and billing"
              subtitle="Watch payment issues, invoice aging, and the daily room revenue snapshot."
              actionLabel="Export report"
              rows={financeRows}
            />
          }
        />
        <Route
          path="staff"
          element={
            <AdminWorkspacePage
              eyebrow="Operations"
              title="Staff planning"
              subtitle="Coordinate coverage, swaps, and onboarding tasks across core hotel teams."
              actionLabel="Update rota"
              rows={staffRows}
            />
          }
        />
        <Route
          path="reports"
          element={
            <AdminWorkspacePage
              eyebrow="Insights"
              title="Reporting snapshot"
              subtitle="Share occupancy trends, channel performance, and guest sentiment in one place."
              actionLabel="Generate report"
              rows={reportsRows}
            />
          }
        />
        <Route
          path="settings"
          element={
            <AdminWorkspacePage
              eyebrow="Configuration"
              title="Platform settings"
              subtitle="Review the guest-facing rules and team notifications that shape the booking flow."
              actionLabel="Save changes"
              rows={settingsRows}
            />
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
