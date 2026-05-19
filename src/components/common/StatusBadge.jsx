const toneClasses = {
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-rose-50 text-rose-600',
  info: 'bg-sky-50 text-sky-600',
  neutral: 'bg-zinc-100 text-zinc-600',
};

export default function StatusBadge({ label, tone = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center rounded-xl px-3 py-1 text-[10px] font-bold ${toneClasses[tone] || toneClasses.neutral}`}
    >
      {label}
    </span>
  );
}
