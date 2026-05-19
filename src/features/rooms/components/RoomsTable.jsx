import { ChevronLeft, ChevronRight, Edit, ImageOff, Trash2 } from 'lucide-react';
import EmptyState from '../../../components/common/EmptyState';
import Table from '../../../components/ui/Table';
import { formatCurrency } from '../../../utils/format';

const getOrdinal = (value) => {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return null;
  }

  const modulo = numeric % 100;

  if (modulo >= 11 && modulo <= 13) {
    return `${numeric}th`;
  }

  switch (numeric % 10) {
    case 1:
      return `${numeric}st`;
    case 2:
      return `${numeric}nd`;
    case 3:
      return `${numeric}rd`;
    default:
      return `${numeric}th`;
  }
};

const getFloorLabel = (floor) => {
  if (floor === '' || floor === null || floor === undefined) {
    return null;
  }

  if (typeof floor === 'string' && /floor/i.test(floor)) {
    return floor;
  }

  const ordinal = getOrdinal(floor);
  return ordinal ? `${ordinal} Floor` : String(floor);
};

const getPageItems = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
};

const getAmenityLabel = (amenity) => String(amenity || '').replaceAll('_', ' ').replaceAll('-', ' ').trim();

export default function RoomsTable({
  rooms,
  statusConfig,
  pagination,
  onEdit,
  onDelete,
}) {
  const pageItems = getPageItems(pagination.currentPage, pagination.totalPages);

  return (
    <div className="overflow-hidden">
      <Table className="bg-white">
        <thead className="bg-[#f7f4ff]">
          <tr className="border-b border-[#e9e3fb]">
            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
              Room & Location
            </th>
            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
              Base Price
            </th>
            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
              Type
            </th>
            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
              Amenities
            </th>
            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
              Status
            </th>
            <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#eee8ff]">
          {rooms.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-14">
                <EmptyState
                  icon={ImageOff}
                  title="No rooms found"
                  description="Try adjusting the search terms or status filters."
                />
              </td>
            </tr>
          ) : (
            rooms.map((room) => {
              const state = statusConfig[room.status] || statusConfig.available;
              const floorLabel = getFloorLabel(room.floor);
              const metaParts = [
                room.room_number ? `Room ${room.room_number}` : null,
                floorLabel,
                room.location || null,
              ].filter(Boolean);
              const visibleAmenities = room.amenities.slice(0, 3);
              const hiddenAmenities = Math.max(room.amenities.length - visibleAmenities.length, 0);

              return (
                <tr key={room.id} className="transition-colors hover:bg-[#fcfaff]">
                  <td className="px-5 py-4">
                    <div className="flex min-w-[300px] items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e3dcff] bg-[#f7f4ff]">
                        {room.image ? (
                          <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
                        ) : (
                          <ImageOff size={18} className="text-violet-400" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-slate-950">{room.name}</p>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {metaParts.length > 0 ? metaParts.join(' • ') : 'Room details unavailable'}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <div>
                      <p className="text-sm font-black text-slate-950">{formatCurrency(room.price_per_night)}</p>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                        Per night
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {room.room_type}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {room.amenities.length > 0 ? (
                      <div className="flex max-w-[280px] flex-wrap gap-1.5">
                        {visibleAmenities.map((amenity) => (
                          <span
                            key={`${room.id}-${amenity}`}
                            className="rounded-full bg-[#f1ecff] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500"
                            title={getAmenityLabel(amenity)}
                          >
                            {getAmenityLabel(amenity)}
                          </span>
                        ))}
                        {hiddenAmenities > 0 ? (
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
                            +{hiddenAmenities}
                          </span>
                        ) : null}
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">No amenities listed</span>
                    )}
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-black ${state.bg} ${state.text} ${state.border}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${state.dot}`} />
                      {state.label}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right align-middle">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(room)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-[#ddd4ff] hover:bg-[#f6f1ff] hover:text-violet-600"
                        title="Edit room"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(room)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600"
                        title="Delete room"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      {pagination.totalItems > 0 ? (
        <div className="flex flex-col gap-4 border-t border-[#e9e3fb] bg-[#faf7ff] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-slate-500">
            Showing <span className="font-black text-slate-900">{pagination.start} - {pagination.end}</span> of{' '}
            <span className="font-black text-slate-900">{pagination.totalItems}</span> rooms
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
              disabled={pagination.currentPage === 1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ddd4ff] bg-white text-slate-400 transition hover:border-violet-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {pageItems.map((item, index) => (
              item === 'ellipsis' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex h-9 min-w-9 items-center justify-center px-1 text-xs font-black text-slate-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => pagination.onPageChange(item)}
                  className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-xs font-black transition ${
                    item === pagination.currentPage
                      ? 'bg-violet-700 text-white shadow-[0_10px_22px_-12px_rgba(91,33,182,0.7)]'
                      : 'border border-transparent text-slate-500 hover:border-[#ddd4ff] hover:bg-white hover:text-slate-900'
                  }`}
                >
                  {item}
                </button>
              )
            ))}

            <button
              type="button"
              onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
              disabled={pagination.currentPage === pagination.totalPages}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ddd4ff] bg-white text-slate-400 transition hover:border-violet-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
