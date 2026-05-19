import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">404</p>
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="max-w-md text-sm text-slate-600">
        The page you were looking for does not exist or has been moved into the new feature-based structure.
      </p>
      <Link
        to={ROUTES.ROOT}
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Return home
      </Link>
    </div>
  );
}

