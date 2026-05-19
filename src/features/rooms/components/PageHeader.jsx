import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../../../components/ui/Button';

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  actionLabel,
  onAction,
  icon: Icon,
}) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              <span className={b.active ? 'text-slate-700' : ''}>{b.label}</span>
              {idx !== breadcrumbs.length - 1 && <ChevronRight size={12} />}
            </React.Fragment>
          ))}
        </div>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          {description}
        </p>
      </div>

      <Button
        onClick={onAction}
        className="flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm shadow-lg shadow-violet-500/20"
      >
        {Icon && <Icon size={18} />}
        {actionLabel}
      </Button>
    </div>
  );
}