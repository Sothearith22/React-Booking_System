import { Link } from 'react-router-dom';

const toneClasses = {
  light: 'border border-zinc-300 text-zinc-700 hover:bg-zinc-50',
  dark: 'border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white',
};

export function DashboardActionButton({
  label,
  to,
  onClick,
  tone = 'light',
  type = 'button',
}) {
  const className = `inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
    toneClasses[tone] || toneClasses.light
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
