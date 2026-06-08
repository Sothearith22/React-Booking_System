import DashboardIcon from './DashboardIcon';

export default function StatCard({ item }) {
  return (
    <article className="rounded-lg border border-[#dee2ef] bg-white px-8 py-7 shadow-[0_2px_8px_rgba(17,24,39,0.14)]">
      <div className="flex items-start justify-between gap-5">
        <p className="max-w-[150px] text-xl font-medium uppercase leading-snug tracking-[0.04em] text-[#151827]">
          {item.title}
        </p>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d9dfff] text-[#064ed0]">
          <DashboardIcon name={item.icon} className="h-7 w-7" />
        </div>
      </div>

      <div className="mt-7 flex items-end gap-3">
        <p className="text-[40px] font-bold leading-none tracking-normal text-[#111318]">{item.value}</p>
        {item.trend ? <span className="mb-1 text-base font-semibold text-[#006b63]">{item.trend}</span> : null}
        {item.detail ? <span className="mb-0.5 text-base font-medium text-[#24263a]">{item.detail}</span> : null}
      </div>
    </article>
  );
}
