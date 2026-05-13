import { X } from 'lucide-react';

const TONE_STYLES = {
  error: 'border-rose-200 bg-rose-50 text-rose-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  info: 'border-sky-200 bg-sky-50 text-sky-700',
};

const Alert = ({ type = 'info', children, onClose }) => (
  <div
    className={`flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
      TONE_STYLES[type] || TONE_STYLES.info
    }`}
    role="alert"
  >
    <div>{children}</div>
    {onClose ? (
      <button
        type="button"
        onClick={onClose}
        className="rounded-full p-1 transition hover:bg-black/5"
        aria-label="Dismiss alert"
      >
        <X size={16} />
      </button>
    ) : null}
  </div>
);

export default Alert;
