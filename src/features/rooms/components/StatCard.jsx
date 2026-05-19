import React from 'react';

const SUMMARY_CARD_STYLES = {
  total: {
    icon: 'bg-violet-100 text-violet-700',
    badge: 'bg-violet-100 text-violet-700',
  },
  available: {
    icon: 'bg-emerald-100 text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  booked: {
    icon: 'bg-amber-100 text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
  },
  maintenance: {
    icon: 'bg-rose-100 text-rose-700',
    badge: 'bg-rose-100 text-rose-700',
  },
};

export default function StatCard({ icon: Icon, label, value, badge, tone }) {
  const style = SUMMARY_CARD_STYLES[tone];

  return (
    <article className="rounded-[24px] border border-[#e6e0f7] bg-white p-5 shadow-[0_20px_50px_-34px_rgba(76,29,149,0.4)] transition hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${style.icon}`}>
          <Icon className="h-5 w-5" />
        </div>

        <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${style.badge}`}>
          {badge}
        </span>
      </div>

      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-4xl font-black text-slate-950">{value}</p>
    </article>
  );
}