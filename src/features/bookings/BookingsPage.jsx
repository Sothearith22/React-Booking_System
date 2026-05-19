import { useMemo, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Plus,
} from 'lucide-react';

import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { formatCurrency, formatDate } from '../../utils/format';
import BookingFilters from './components/BookingFillters';
import { BookingModal } from './components/BookingModal';
import BookingTable from './components/BookingTable';
import StatCard from './components/StatCard';
import { useBookings } from './hooks/useBooking';
import { getBookingCode, getStaySummary } from './utils/booking.utils';
import { PAYMENT_CONFIG } from './utils/payment.config';
import { STATUS_CONFIG } from './utils/status.config';

const ROWS_PER_PAGE = 8;

const getTodayLabel = () =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date());

const BookingDetailModal = ({ booking, isOpen, onClose }) => {
  if (!booking) return null;

  const status = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
  const payment = PAYMENT_CONFIG[booking.payment] || PAYMENT_CONFIG.unpaid;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Details" className="max-w-2xl">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              {getBookingCode(booking)}
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{booking.room_name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {booking.booking_type} booking for {booking.guest_name}
            </p>
          </div>
          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${status.bg} ${status.text} ${status.border}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Guest
            </p>
            <p className="mt-2 font-bold text-slate-950">{booking.guest_name}</p>
            <p className="text-sm text-slate-500">User #{booking.user_id}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Stay
            </p>
            <p className="mt-2 font-bold text-slate-950">{formatDate(booking.check_in)}</p>
            <p className="text-sm text-indigo-600">{getStaySummary(booking)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Total
            </p>
            <p className="mt-2 text-xl font-black text-slate-950">
              {formatCurrency(booking.total_price)}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Payment
            </p>
            <span
              className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${payment.bg} ${payment.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${payment.dot}`} />
              {payment.label}
            </span>
          </div>
        </div>

        {booking.note ? (
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Note
            </p>
            <p className="mt-2 text-sm text-slate-600">{booking.note}</p>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default function BookingsPage() {
  const { bookings, setBookings, loading, error, refetch } = useBookings();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);

  const stats = useMemo(() => {
    const total = bookings.length;
    const active = bookings.filter((booking) => booking.status === 'confirmed').length;
    const pending = bookings.filter((booking) => booking.status === 'pending').length;
    const revenue = bookings
      .filter((booking) => booking.payment === 'paid')
      .reduce((sum, booking) => sum + Number(booking.total_price || 0), 0);

    return { total, active, pending, revenue };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !query ||
        [
          getBookingCode(booking),
          booking.guest_name,
          booking.room_name,
          booking.room_number,
          booking.booking_type,
        ].some((value) => String(value || '').toLowerCase().includes(query));
      const matchesStatus = status === 'all' || booking.status === status;
      const matchesDateFrom = !dateFrom || booking.check_in >= dateFrom;
      const matchesDateTo = !dateTo || booking.check_in <= dateTo;

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [bookings, dateFrom, dateTo, search, status]);

  const visibleBookings = filteredBookings.slice(0, ROWS_PER_PAGE);

  const handleNewBooking = (booking) => {
    setBookings((current) => [booking, ...current]);
  };

  const handleExport = () => {
    const header = 'Booking ID,Guest,Type,Item,Date,Summary,Total,Payment,Status\n';
    const rows = filteredBookings
      .map((booking) =>
        [
          getBookingCode(booking),
          booking.guest_name,
          booking.booking_type,
          booking.room_name,
          formatDate(booking.check_in),
          getStaySummary(booking),
          booking.total_price,
          booking.payment,
          booking.status,
        ].map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bookings_export.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-500">
        Loading bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
        <p className="font-bold text-rose-700">{error}</p>
        <p className="mt-1 text-sm text-rose-600">
          The booking API returned an error. Please check the backend logs.
        </p>
        <Button className="mt-4" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-slate-950">Bookings</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950">
            Bookings Management
          </h1>
        </div>
        <Button
          className="gap-2 rounded-xl bg-indigo-700 px-5 py-3 shadow-lg shadow-indigo-700/20 hover:bg-indigo-800"
          onClick={() => setIsNewBookingOpen(true)}
        >
          <Plus size={18} /> New Booking
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <StatCard
          icon={Calendar}
          label="Total Bookings"
          value={stats.total.toLocaleString()}
          subtitle="+12% from last month"
          iconClass="bg-indigo-50 text-indigo-700"
        />
        <StatCard
          icon={CheckCircle2}
          label="Active Check-ins"
          value={stats.active}
          subtitle={`Today, ${getTodayLabel()}`}
          iconClass="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={AlertCircle}
          label="Pending Requests"
          value={stats.pending}
          subtitle="Requires action"
          iconClass="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={DollarSign}
          label="Monthly Revenue"
          value={formatCurrency(stats.revenue)}
          subtitle="+8% target"
          iconClass="bg-violet-50 text-violet-700"
        />
      </div>

      <BookingFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        onExport={handleExport}
      />

      <BookingTable data={visibleBookings} onView={setSelectedBooking} />

      <BookingDetailModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />

      <BookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onSubmit={handleNewBooking}
      />
    </div>
  );
}
