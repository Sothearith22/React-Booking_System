export default function DashboardSection({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  className = '',
}) {
  return (
    <section className={`border border-zinc-200 bg-white ${className}`}>
      <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {eyebrow}
            </p>
          ) : null}
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
            {subtitle ? <p className="text-sm text-zinc-500">{subtitle}</p> : null}
          </div>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
