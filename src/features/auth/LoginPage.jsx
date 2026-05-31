import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/appConstants';
import useFetch from '../../hooks/useFetch';
import { validateForm } from '../../utils/validateForm';
import { useAuth } from './hooks/useAuth';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const {
    data: status,
    loading: isSubmitting,
    run: submitLogin,
    reset,
  } = useFetch(login);

  useEffect(() => {
    if (status?.status === 'success' && status.redirectTo) {
      navigate(status.redirectTo, { replace: true });
    }
  }, [navigate, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm('login', values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    submitLogin({ ...values });
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google sign-in failed', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Sign in</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">Welcome back</h2>
        <p className="mt-2 text-slate-600">Use your email and password to continue.</p>
      </div>

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="mx-4 flex-shrink text-xs font-medium uppercase text-slate-400">Or</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
            placeholder="you@example.com"
          />
          {(errors.email || status?.errors?.email) ? (
            <p className="mt-2 text-sm text-rose-600">{errors.email || status?.errors?.email}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
            placeholder="Enter your password"
          />
          {(errors.password || status?.errors?.password) ? (
            <p className="mt-2 text-sm text-rose-600">
              {errors.password || status?.errors?.password}
            </p>
          ) : null}
        </div>

        {status?.message ? (
          <p className={`text-sm ${status.status === 'error' ? 'text-rose-600' : 'text-emerald-600'}`}>
            {status.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="text-sm text-slate-600">
        Need an account?{' '}
        <button
          type="button"
          onClick={() => navigate(ROUTES.REGISTER, { replace: true })}
          className="font-semibold text-sky-600"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
