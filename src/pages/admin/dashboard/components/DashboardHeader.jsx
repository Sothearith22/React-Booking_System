import DashboardIcon from './DashboardIcon';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#c7cbe0] bg-[#fbf9ff]/95 px-5 py-3.5 backdrop-blur sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <label className="flex h-[52px] w-full max-w-[560px] items-center gap-5 rounded-full border border-[#bfc5d9] bg-[#eff1fb] px-4 text-[#1f2433]">
          <DashboardIcon name="search" className="h-7 w-7 shrink-0" />
          <input
            type="text"
            placeholder="Search bookings, guests, rooms..."
            className="min-w-0 flex-1 bg-transparent text-xl font-medium text-[#1f2433] outline-none placeholder:text-[#676b7b]"
          />
        </label>

        <button className="relative flex h-12 w-12 shrink-0 items-center justify-center text-[#151827] transition hover:text-[#064ed0]">
          <DashboardIcon name="bell" className="h-7 w-7" />
          <span className="absolute right-2.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#c71717]" />
        </button>
      </div>
    </header>
  );
}
