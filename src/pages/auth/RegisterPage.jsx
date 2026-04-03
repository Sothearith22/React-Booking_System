import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { validateForm } from '../../utils/validateForm';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const {
    data: status,
    loading: isSubmitting,
    run: submitRegistration,
    reset,
  } = useFetch(register);

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
    const nextErrors = validateForm('register', values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    submitRegistration({ ...values });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
          Register
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-slate-600">
          Join to start planning your next trip.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="register-name"
          >
            Full name
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
            placeholder="Your full name"
          />
          {errors.name || status?.errors?.name ? (
            <p className="mt-2 text-sm text-rose-600">{errors.name || status?.errors?.name}</p>
          ) : null}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="register-email"
          >
            Email
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
            placeholder="you@example.com"
          />
          {errors.email || status?.errors?.email ? (
            <p className="mt-2 text-sm text-rose-600">{errors.email || status?.errors?.email}</p>
          ) : null}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="register-password"
          >
            Password
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
            placeholder="At least 6 characters"
          />
          {errors.password || status?.errors?.password ? (
            <p className="mt-2 text-sm text-rose-600">{errors.password || status?.errors?.password}</p>
          ) : null}
        </div>

        {status?.message ? (
          <p
            className={`text-sm ${status.status === 'error' ? 'text-rose-600' : 'text-emerald-600'}`}
          >
            {status.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-slate-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login', { replace: true })}
          className="font-semibold text-emerald-600"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
