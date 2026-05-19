import { Download, Search } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { ROOM_STATUS_OPTIONS } from '../constants/room.constants';

export default function RoomFilters({
  searchTerm,
  onSearchTermChange,
  filterType,
  onFilterTypeChange,
  filterStatus,
  onFilterStatusChange,
  roomTypes = [],
  onExport,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={16} />
        <input
          type="text"
          placeholder="Search by name or room number..."
          className="w-full rounded-xl border border-[#dcd3ff] bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
        <Select
          value={filterType}
          onChange={(event) => onFilterTypeChange(event.target.value)}
          className="min-h-11 rounded-xl border-[#dcd3ff] bg-white px-3 text-xs font-bold text-slate-700 shadow-none focus:border-violet-400 focus:ring-violet-500/10"
        >
          <option value="all">All Types</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>

        <Select
          value={filterStatus}
          onChange={(event) => onFilterStatusChange(event.target.value)}
          className="min-h-11 rounded-xl border-[#dcd3ff] bg-white px-3 text-xs font-bold text-slate-700 shadow-none focus:border-violet-400 focus:ring-violet-500/10"
        >
          <option value="all">All Status</option>
          {ROOM_STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>

        <Button
          variant="outline"
          size="sm"
          className="min-h-11 rounded-xl border-[#dcd3ff] bg-white px-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 hover:bg-[#f6f1ff]"
          onClick={onExport}
        >
          <Download size={14} /> Export
        </Button>
      </div>
    </div>
  );
}
