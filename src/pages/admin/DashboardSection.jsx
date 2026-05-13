export default function DashboardSection({
  eyebrow,
  title,
  subtitle,
  action = null,
  children,
}) {
  return (
    <section className="rounded-[2rem] border border-zinc-200">
      <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-600">
              {eyebrow}
            </p>
          ) : null}
          <div>
            <h2 className="text-2xl font-bold text-zinc-950">{title}</h2>
            {subtitle ? (
              <p className="mt-2 max-w-3xl text-sm text-zinc-500">{subtitle}</p>
            ) : null}
          </div>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      <div>{children}</div>
    </section>
  );
}
