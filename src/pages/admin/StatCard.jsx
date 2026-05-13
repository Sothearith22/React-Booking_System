import DashboardIcon from './DashboardIcon';

export default function StatCard({ item }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-100 bg-white p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.iconTone} shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <DashboardIcon name={item.icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.title}</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-2xl font-black tracking-tight text-zinc-950">{item.value}</p>
            <span className={`rounded-lg px-2 py-1 text-[10px] font-black tracking-tighter ${item.trendTone} shadow-sm`}>
              {item.trend}
            </span>
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className={`absolute -bottom-6 -right-6 h-16 w-16 rounded-full opacity-[0.03] transition-transform duration-500 group-hover:scale-150 ${item.iconTone.split(' ')[0]}`} />
    </div>
  );
}
