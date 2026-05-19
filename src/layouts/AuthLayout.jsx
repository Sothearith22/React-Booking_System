import { useAuth } from '../features/auth';
import Login from '../features/auth/LoginPage';
import Register from '../features/auth/RegisterPage';

export function AuthLayout({ initialMode = 'login' }) {
  const { isAuthenticated, loading, user, logout } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-600 font-sans">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="mx-auto flex w-full max-w-[1200px] overflow-hidden rounded-[32px] bg-white shadow-2xl min-h-[700px]">
        {/* Left Side - Image & Text */}
        <section className="relative hidden w-1/2 lg:block">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3"
            alt="Travel Landscape"
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
            <div>
              <h1 className="text-4xl font-bold leading-tight">
                Welcome Adventurer! The World Awaits.<br />
                <span className="text-2xl font-medium opacity-90 text-slate-200">Embark On Your Next Journey</span>
              </h1>
            </div>

            <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md border border-white/20 max-w-md">
              <h2 className="text-2xl font-bold">Wander, Explore, Experience</h2>
              <p className="mt-2 text-slate-200">
                Unlock New Destinations, Exclusive Deals, And Travel Inspiration Tailored Just For You.
              </p>
            </div>
          </div>
        </section>

        {/* Right Side - Form */}
        <section className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-16">
          <div className="mx-auto w-full max-w-md">
            {isAuthenticated ? (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                    Signed in
                  </p>
                  <h2 className="mt-4 text-3xl font-bold text-slate-900">Welcome back, {user.name}.</h2>
                  <p className="mt-2 text-slate-600">
                    Your email is <span className="font-medium text-slate-900">{user.email}</span>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              initialMode === 'login' ? (
                <Login />
              ) : (
                <Register />
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
