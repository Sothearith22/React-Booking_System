import { useAuth } from '../../hooks/useAuth';
import StatusBadge from '../admin/StatusBadge';

export const ProfilePage = () => {
  const { user } = useAuth();
  const roles = Array.isArray(user?.roles)
    ? user.roles
    : user?.role
      ? [user.role]
      : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Profile</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
          {user?.name || 'Guest account'}
        </h1>
        <p className="mt-2 text-slate-600">
          {user?.email || 'No email is available for this account yet.'}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Primary role</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {typeof user?.role === 'string' ? user.role : user?.role?.name || 'Customer'}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Account status</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Active session</p>
          </div>
        </div>
      </section>

      <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Assigned roles</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {roles.length > 0 ? (
            roles.map((role) => (
              <StatusBadge
                key={typeof role === 'string' ? role : role?.name || role?.slug || 'role'}
                label={typeof role === 'string' ? role : role?.name || role?.slug || 'Role'}
                tone="info"
              />
            ))
          ) : (
            <StatusBadge label="customer" tone="neutral" />
          )}
        </div>
        <p className="mt-6 text-sm leading-6 text-slate-600">
          This protected page confirms the auth context is loaded and the current user can
          access signed-in routes successfully.
        </p>
      </aside>
    </div>
  );
};
