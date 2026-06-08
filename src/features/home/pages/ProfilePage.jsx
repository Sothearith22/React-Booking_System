import {
  Mail,
  ShieldCheck,
  User,
  Calendar,
  MapPin,
  Phone,
  Edit,
  Camera,
  Clock3,
  Star,
  Wallet,
  Bell,
  Settings,
  CheckCircle2,
  Activity,
  CreditCard,
} from 'lucide-react';

import { useAuth } from '../../auth';
import StatusBadge from '../../../components/common/StatusBadge';

export const ProfilePage = () => {
  const { user } = useAuth();

  const roles = Array.isArray(user?.roles)
    ? user.roles
    : user?.role
      ? [user.role]
      : [];

  const displayRole =
    typeof user?.role === 'string'
      ? user.role
      : user?.role?.name || 'Customer';

  const stats = [
    {
      label: 'Bookings',
      value: 12,
      icon: Calendar,
    },
    {
      label: 'Reviews',
      value: 8,
      icon: Star,
    },
    {
      label: 'Wallet',
      value: '$420',
      icon: Wallet,
    },
    {
      label: 'Activity',
      value: '98%',
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* ================= HERO PROFILE ================= */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl">
        
        {/* Background Decorations */}
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          
          {/* Left */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 text-5xl font-bold backdrop-blur">
                {user?.name?.charAt(0)?.toUpperCase() || 'G'}
              </div>

              <button className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900 shadow-lg transition hover:scale-105">
                <Camera size={18} />
              </button>
            </div>

            {/* User Info */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
                <CheckCircle2 size={16} />
                Verified Account
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight">
                {user?.name || 'Guest User'}
              </h1>

              <p className="mt-2 max-w-xl text-sky-100">
                Welcome back to your personalized dashboard. Manage bookings,
                account settings, and monitor your activity in one place.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-sky-100">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {user?.email || 'No email'}
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} />
                  {displayRole}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  Last login: Today
                </div>
              </div>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02] hover:bg-slate-100">
              <Edit size={16} />
              Edit Profile
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-sky-50 p-3 text-sky-600">
                  <Icon size={22} />
                </div>

                <span className="text-xs font-medium text-emerald-600">
                  +12%
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-bold text-slate-900">
                {item.value}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {item.label}
              </p>
            </div>
          );
        })}
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          
          {/* Personal Information */}
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your profile details and contact information.
                </p>
              </div>

              <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Edit
              </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              
              {[
                {
                  label: 'Full Name',
                  value: user?.name || 'Unknown User',
                  icon: User,
                },
                {
                  label: 'Email Address',
                  value: user?.email || 'No Email',
                  icon: Mail,
                },
                {
                  label: 'Phone Number',
                  value: user?.phone || '+855 12 345 678',
                  icon: Phone,
                },
                {
                  label: 'Location',
                  value: 'Phnom Penh, Cambodia',
                  icon: MapPin,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-sky-50/40"
                  >
                    <div className="flex items-center gap-2 text-slate-500">
                      <Icon size={18} />
                      <span className="text-sm">{item.label}</span>
                    </div>

                    <p className="mt-3 text-lg font-semibold text-slate-900 break-all">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest actions and account activities.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              
              {[
                'Booked Deluxe Room',
                'Updated profile information',
                'Completed payment successfully',
                'Added new review',
              ].map((activity, index) => (
                <div
                  key={activity}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={20} />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-slate-900">
                      {activity}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {index + 1} hour ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6">
          
          {/* Roles */}
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              User Roles
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {roles.length > 0 ? (
                roles.map((role) => (
                  <StatusBadge
                    key={
                      typeof role === 'string'
                        ? role
                        : role?.name || role?.slug || 'role'
                    }
                    label={
                      typeof role === 'string'
                        ? role
                        : role?.name || role?.slug || 'Role'
                    }
                    tone="info"
                  />
                ))
              ) : (
                <StatusBadge label="customer" tone="neutral" />
              )}
            </div>
          </section>

          {/* Account Status */}
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Account Status
            </h2>

            <div className="mt-6 space-y-4">
              
              <div className="rounded-2xl bg-emerald-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Session Status
                    </p>

                    <p className="mt-1 text-lg font-semibold text-emerald-700">
                      Active
                    </p>
                  </div>

                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Membership
                    </p>

                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      Premium
                    </p>
                  </div>

                  <CreditCard size={20} className="text-slate-400" />
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Notifications
              </h2>

              <Bell size={20} className="text-slate-400" />
            </div>

            <div className="mt-6 space-y-4">
              
              {[
                'Your booking has been confirmed.',
                'New promotional offer available.',
                'Password updated successfully.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
                >
                  <p className="text-sm leading-6 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};