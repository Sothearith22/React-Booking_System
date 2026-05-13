import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  CUSTOMER_PROFILE_PATH,
  DASHBOARD_HOME_PATH,
  isAdminUser,
} from '../../utils/auth';

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  const primaryAction = isAuthenticated
    ? isAdminUser(user)
      ? { label: 'Open dashboard', to: DASHBOARD_HOME_PATH }
      : { label: 'View profile', to: CUSTOMER_PROFILE_PATH }
    : { label: 'Sign in', to: '/login' };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 text-white sm:px-10 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
          Booking experience
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Manage stays, guest details, and hotel operations from one calm workspace.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          This project combines public booking flows with an authenticated admin dashboard,
          so guests and staff can move through the same system without friction.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={primaryAction.to}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {primaryAction.label}
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Create account
            </Link>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: 'Smooth guest entry',
            description: 'Handle sign-up, sign-in, and protected routes without sending users through disconnected screens.',
          },
          {
            title: 'Operational visibility',
            description: 'Give admins a dashboard view for bookings, services, finance, staffing, and reporting.',
          },
          {
            title: 'API-ready auth flow',
            description: 'Session cookies and the current user bootstrap are already wired for backend-driven access control.',
          },
        ].map((item) => (
          <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};
