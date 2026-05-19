import { Eye } from 'lucide-react';

import { formatCurrency, formatDate } from '../../../utils/format';
import { getBookingCode, getStaySummary } from '../utils/booking.utils';
import { PAYMENT_CONFIG } from '../utils/payment.config';
import { STATUS_CONFIG } from '../utils/status.config';

const HEADINGS = [
  'Booking ID',
  'Guest Name',
  'Room',
  'Stay Dates',
  'Total Price',
  'Payment',
  'Status',
  'Actions',
];

export const BookingTable = ({ data = [], onView }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {HEADINGS.map((heading) => (
              <th
                key={heading}
                className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 last:text-right"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.length > 0 ? (
            data.map((booking) => {
              const payment = PAYMENT_CONFIG[booking.payment] || PAYMENT_CONFIG.unpaid;
              const status = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;

              return (
                <tr key={booking.id} className="transition hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-black text-slate-950">
                    {getBookingCode(booking)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-[10px] font-black text-white">
                        {booking.guest_initials}
                      </div>
                      <span className="font-bold text-slate-900">{booking.guest_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-950">{booking.room_name}</p>
                    <p className="text-xs text-slate-400">
                      {booking.booking_type} #{booking.room_number}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {formatDate(booking.check_in)}
                      {booking.booking_type === 'Service'
                        ? ''
                        : ` - ${formatDate(booking.check_out)}`}
                    </p>
                    <p className="text-xs font-bold text-indigo-700">{getStaySummary(booking)}</p>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-950">
                    {formatCurrency(booking.total_price)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black ${payment.bg} ${payment.text}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${payment.dot}`} />
                      {payment.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black ${status.bg} ${status.text} ${status.border}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onView?.(booking)}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-700 transition hover:text-indigo-900"
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={HEADINGS.length} className="px-6 py-16 text-center">
                <p className="font-black text-slate-950">No bookings found</p>
                <p className="mt-1 text-sm text-slate-500">Try changing your filters.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default BookingTable;
