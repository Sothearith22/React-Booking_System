import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { validateForm } from '../../utils/validateForm';

export default function LoginPage() {
  const { login } = useAuth();
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

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Sign in</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">Welcome back</h2>
        <p className="mt-2 text-slate-600">Use your email and password to continue.</p>
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
          {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email}</p> : null}
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
          {errors.password ? <p className="mt-2 text-sm text-rose-600">{errors.password}</p> : null}
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
          onClick={() => navigate('/register', { replace: true })}
          className="font-semibold text-sky-600"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
