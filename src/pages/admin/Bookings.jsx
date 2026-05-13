import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../../services/api';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import {
  Loader2,
  Search,
  Calendar,
  ChevronRight,
  Plus,
  Download,
  Eye,
  ChevronLeft,
  TrendingUp,
  Clock,
  AlertCircle,
  DollarSign,
  X,
  CheckCircle2,
  XCircle,
  Ban,
  RotateCcw,
} from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const nightsBetween = (a, b) => {
  const msDay = 86400000;
  return Math.round((new Date(b) - new Date(a)) / msDay);
};

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

// ── Status / Payment badge configs ────────────────────────────────

const STATUS_CONFIG = {
  confirmed: {
    label: 'Confirmed',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  pending: {
    label: 'Pending',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    dot: 'bg-red-500',
  },
};

const PAYMENT_CONFIG = {
  paid: {
    label: 'Paid',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  unpaid: {
    label: 'Unpaid',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  refunded: {
    label: 'Refunded',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
  },
};

// ── Stat Card ────────────────────────────────────────────────────

const StatCard = ({ icon, iconColor, label, value, subtitle, subtitleColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-3">
      <div className={`p-1.5 rounded-lg ${iconColor}`}>
        {icon ? React.createElement(icon, { size: 16 }) : null}
      </div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
    {subtitle && (
      <p className={`text-xs font-semibold mt-1 ${subtitleColor || 'text-gray-400'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// ── Booking Detail Modal ─────────────────────────────────────────

const BookingDetailModal = ({ booking, isOpen, onClose, onUpdateStatus }) => {
  if (!booking) return null;
  const nights = nightsBetween(booking.check_in, booking.check_out);
  const sc = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
  const pc = PAYMENT_CONFIG[booking.payment] || PAYMENT_CONFIG.unpaid;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="space-y-6 -mt-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Booking #BK-{booking.id}</h2>
            <p className="text-sm text-gray-500 mt-0.5">Created on {formatDate(booking.check_in)}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
            {sc.label}
          </span>
        </div>

        {/* Guest Info */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
            {booking.guest_initials}
          </div>
          <div>
            <p className="font-bold text-gray-900">{booking.guest_name}</p>
            <p className="text-xs text-gray-500">Guest ID: #{booking.user_id}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Room</p>
            <p className="font-bold text-gray-900 text-sm">{booking.room_name} ({booking.room_number})</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
            <p className="font-bold text-gray-900 text-sm">{nights} Night{nights !== 1 ? 's' : ''}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-in</p>
            <p className="font-bold text-gray-900 text-sm">{formatDate(booking.check_in)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-out</p>
            <p className="font-bold text-gray-900 text-sm">{formatDate(booking.check_out)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
            <p className="font-extrabold text-gray-900 text-lg">{formatCurrency(booking.total_price)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Payment</p>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${pc.bg} ${pc.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
              {pc.label}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          {booking.status === 'pending' && (
            <Button
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => { onUpdateStatus(booking.id, 'confirmed'); onClose(); }}
            >
              <CheckCircle2 size={16} /> Confirm
            </Button>
          )}
          {booking.status !== 'cancelled' && (
            <Button
              variant="danger"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => { onUpdateStatus(booking.id, 'cancelled'); onClose(); }}
            >
              <Ban size={16} /> Cancel
            </Button>
          )}
          {booking.status === 'cancelled' && (
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => { onUpdateStatus(booking.id, 'pending'); onClose(); }}
            >
              <RotateCcw size={16} /> Reopen
            </Button>
          )}
          <Button variant="ghost" onClick={onClose} className="flex-1">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// ── New Booking Modal ────────────────────────────────────────────

const NewBookingModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    guest_name: '',
    room_name: '',
    room_number: '',
    check_in: '',
    check_out: '',
    total_price: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = form.guest_name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    onSubmit({
      id: Math.floor(9000 + Math.random() * 999),
      user_id: Math.floor(10 + Math.random() * 90),
      room_id: Math.floor(1 + Math.random() * 20),
      guest_name: form.guest_name,
      guest_initials: initials,
      room_name: form.room_name,
      room_number: form.room_number,
      check_in: form.check_in,
      check_out: form.check_out,
      status: 'pending',
      payment: 'unpaid',
      total_price: parseFloat(form.total_price) || 0,
    });

    setForm({ guest_name: '', room_name: '', room_number: '', check_in: '', check_out: '', total_price: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Booking">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Guest Name</label>
          <input name="guest_name" value={form.guest_name} onChange={handleChange} required
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Emma Miller" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Room Name</label>
            <input name="room_name" value={form.room_name} onChange={handleChange} required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Deluxe Suite" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Room #</label>
            <input name="room_number" value={form.room_number} onChange={handleChange} required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. 302" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Check-in</label>
            <input name="check_in" type="date" value={form.check_in} onChange={handleChange} required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Check-out</label>
            <input name="check_out" type="date" value={form.check_out} onChange={handleChange} required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Total Price ($)</label>
          <input name="total_price" type="number" step="0.01" value={form.total_price} onChange={handleChange} required
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="0.00" />
        </div>
        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1 flex items-center justify-center gap-2">
            <Plus size={16} /> Create Booking
          </Button>
          <Button variant="ghost" type="button" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// ── Main Page ────────────────────────────────────────────────────

const ROWS_PER_PAGE = 6;

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);

  // Fetch
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await adminService.getBookings();
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    await adminService.updateBookingStatus(id, status);
    fetchBookings();
  };

  const handleNewBooking = (booking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  // Derived stats
  const stats = useMemo(() => {
    const total = bookings.length;
    const active = bookings.filter((b) => b.status === 'confirmed').length;
    const pending = bookings.filter((b) => b.status === 'pending').length;
    const revenue = bookings
      .filter((b) => b.payment === 'paid')
      .reduce((sum, b) => sum + b.total_price, 0);
    return { total, active, pending, revenue };
  }, [bookings]);

  // Filter + search
  const filteredBookings = useMemo(() => {
    let list = [...bookings];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (b) =>
          b.guest_name.toLowerCase().includes(q) ||
          b.id.toString().includes(q) ||
          b.room_name.toLowerCase().includes(q) ||
          b.room_number.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      list = list.filter((b) => b.status === statusFilter);
    }
    if (dateFrom) {
      list = list.filter((b) => b.check_in >= dateFrom);
    }
    if (dateTo) {
      list = list.filter((b) => b.check_out <= dateTo);
    }
    return list;
  }, [bookings, searchTerm, statusFilter, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / ROWS_PER_PAGE));
  const pagedBookings = filteredBookings.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFrom, dateTo]);

  // Export CSV stub
  const handleExport = () => {
    const header = 'Booking ID,Guest,Room,Check-in,Check-out,Total,Payment,Status\n';
    const rows = filteredBookings
      .map((b) =>
        `#BK-${b.id},${b.guest_name},"${b.room_name} (${b.room_number})",${b.check_in},${b.check_out},${b.total_price},${b.payment},${b.status}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Render ───────────────────────────────────────────────────

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-gray-500 font-medium">Loading bookings…</p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">Bookings</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Bookings Management
          </h1>
        </div>
        <Button
          className="flex items-center gap-2 shadow-lg shadow-blue-500/20"
          onClick={() => setIsNewBookingOpen(true)}
        >
          <Plus size={18} /> New Booking
        </Button>
      </div>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Calendar}
          iconColor="bg-blue-50 text-blue-600"
          label="Total Bookings"
          value={stats.total.toLocaleString()}
          subtitle="↗ +12% from last month"
          subtitleColor="text-emerald-600"
        />
        <StatCard
          icon={CheckCircle2}
          iconColor="bg-emerald-50 text-emerald-600"
          label="Active Check-ins"
          value={stats.active}
          subtitle={`Today, ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
          subtitleColor="text-gray-400"
        />
        <StatCard
          icon={AlertCircle}
          iconColor="bg-amber-50 text-amber-600"
          label="Pending Requests"
          value={stats.pending}
          subtitle="Requires action"
          subtitleColor="text-amber-600"
        />
        <StatCard
          icon={DollarSign}
          iconColor="bg-indigo-50 text-indigo-600"
          label="Monthly Revenue"
          value={formatCurrency(stats.revenue)}
          subtitle="↗ +8% target"
          subtitleColor="text-emerald-600"
        />
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Guest, ID or Room…"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Date Range */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="pl-8 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-36"
              />
            </div>
            <span className="text-xs text-gray-400 font-bold">to</span>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="pl-8 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-36"
              />
            </div>
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Export */}
          <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={handleExport}>
            <Download size={14} /> Export
          </Button>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Guest Name
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Room
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Stay Dates
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Total Price
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <Clock size={48} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-base font-bold text-gray-900">No bookings found</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Try adjusting your search or filter criteria.
                    </p>
                  </td>
                </tr>
              ) : (
                pagedBookings.map((b) => {
                  const nights = nightsBetween(b.check_in, b.check_out);
                  const sc = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
                  const pc = PAYMENT_CONFIG[b.payment] || PAYMENT_CONFIG.unpaid;

                  return (
                    <tr
                      key={b.id}
                      className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedBooking(b);
                        setIsDetailOpen(true);
                      }}
                    >
                      {/* Booking ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">#BK-{b.id}</span>
                      </td>

                      {/* Guest */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                            {b.guest_initials}
                          </div>
                          <span className="font-medium text-gray-800">{b.guest_name}</span>
                        </div>
                      </td>

                      {/* Room */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-800">{b.room_name}</p>
                          <p className="text-xs text-gray-400">({b.room_number})</p>
                        </div>
                      </td>

                      {/* Stay Dates */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-gray-800">
                            {formatDate(b.check_in)} – {formatDate(b.check_out)}
                          </p>
                          <p className="text-xs text-blue-500 font-medium">
                            {nights} Night{nights !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">
                          {formatCurrency(b.total_price)}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${pc.bg} ${pc.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                          {pc.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${sc.bg} ${sc.text} ${sc.border}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(b);
                            setIsDetailOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBookings.length > ROWS_PER_PAGE && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Showing{' '}
              <span className="font-bold text-gray-900">
                {(currentPage - 1) * ROWS_PER_PAGE + 1}–
                {Math.min(currentPage * ROWS_PER_PAGE, filteredBookings.length)}
              </span>{' '}
              of <span className="font-bold text-gray-900">{filteredBookings.length}</span> results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    page === currentPage
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ──────────────────────────────────────────────── */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onSubmit={handleNewBooking}
      />
    </div>
  );
};

export default BookingsPage;
