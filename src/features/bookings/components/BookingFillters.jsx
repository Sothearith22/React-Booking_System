import { Calendar, Download, Search } from 'lucide-react';

import Button from '../../../components/ui/Button';

const BookingFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onExport,
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <label className="relative block w-full xl:max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          placeholder="Search by Guest, ID or Room..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative">
          <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-bold text-slate-600 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
          />
        </label>
        <span className="hidden text-xs font-bold text-slate-400 sm:inline">to</span>
        <label className="relative">
          <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-bold text-slate-600 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-11 gap-2 rounded-xl border-indigo-700 px-4 text-xs font-black text-indigo-700 hover:bg-indigo-50"
          onClick={onExport}
        >
          <Download size={15} /> Export
        </Button>
      </div>
    </div>
  </div>
);

export default BookingFilters;
