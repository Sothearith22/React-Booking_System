const toneClasses = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  danger: 'border-rose-200 bg-rose-50 text-rose-700',
  info: 'border-sky-200 bg-sky-50 text-sky-700',
  neutral: 'border-zinc-200 bg-zinc-100 text-zinc-700',
};

export default function StatusBadge({ label, tone = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${toneClasses[tone] || toneClasses.neutral}`}
    >
      {label}
    </span>
  );
}
