import { Link } from 'react-router-dom';

const progressToneClasses = {
  emerald: 'bg-emerald-600',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  sky: 'bg-sky-600',
  zinc: 'bg-zinc-900',
};

const buttonToneClasses = {
  light: 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50',
  dark: 'bg-zinc-950 text-white hover:bg-zinc-800',
};

export function ProgressBar({ value, tone = 'emerald' }) {
  return (
    <div className="mt-3 flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden bg-zinc-100">
        <div
          className={`h-full ${progressToneClasses[tone] || progressToneClasses.emerald}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-semibold text-zinc-600">{value}%</span>
    </div>
  );
}

export function TinyStat({ label, value }) {
  return (
    <div className="bg-white px-4 py-4">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-zinc-950">{value}</p>
    </div>
  );
}

export function Toggle({ enabled }) {
  return (
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? 'bg-emerald-600' : 'bg-zinc-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform bg-white transition ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </span>
  );
}

export function DashboardActionButton({
  label,
  to,
  onClick,
  tone = 'light',
  type = 'button',
}) {
  const className = `inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition ${
    buttonToneClasses[tone] || buttonToneClasses.light
  }`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {label}
    </button>
  );
}
