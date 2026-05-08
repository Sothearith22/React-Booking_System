import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../../../services/api';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import {
  Loader2,
  Plus,
  Search,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Edit,
  Home,
  Download,
  DoorOpen,
  CheckCircle2,
  CalendarCheck,
  Wrench,
} from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────────────

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);


const STATUS_CONFIG = {
  available: {
    label: 'Available',
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  booked: {
    label: 'Booked',
    dot: 'bg-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  occupied: {
    label: 'Booked',
    dot: 'bg-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  maintenance: {
    label: 'Maintenance',
    dot: 'bg-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
};

const ROOM_TYPE_MAP = {
  'Grand Royal Suite': 'Suite',
  'Ocean View Villa': 'Deluxe',
  'Alpine Mountain Lodge': 'Standard',
  'Modern City Penthouse': 'Suite',
};

// ── Stat Card ────────────────────────────────────────────────────

const StatCard = ({ label, value, subtitle, subtitleColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      {subtitle && (
        <span className={`text-xs font-semibold ${subtitleColor || 'text-gray-400'}`}>
          {subtitle}
        </span>
      )}
    </div>
  </div>
);

// ── Main Page ────────────────────────────────────────────────────

const ROWS_PER_PAGE = 5;

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [roomForm, setRoomForm] = useState({
    room_number: '',
    room_type: '',
    price_per_night: '',
    floor: '',
    status: 'available',
    location: 'Main Wing',
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await adminService.getRooms();
      setRooms(res.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRoomForm({ room_number: '', room_type: '', price_per_night: '', floor: '', status: 'available', location: 'Main Wing' });
    setEditRoom(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (room) => {
    setEditRoom(room);
    setRoomForm({
      room_number: room.room_number || '',
      room_type: room.room_type || '',
      price_per_night: room.price_per_night || '',
      floor: room.floor || '',
      status: room.status || 'available',
      location: room.location || 'Main Wing',
    });
    setIsModalOpen(true);
  };

  const handleSaveRoom = async () => {
    if (!roomForm.room_type || !roomForm.price_per_night) return;

    if (editRoom) {
      await adminService.updateRoom(editRoom.id, {
        ...roomForm,
        price_per_night: Number(roomForm.price_per_night),
        floor: Number(roomForm.floor),
      });
    } else {
      await adminService.addRoom({
        ...roomForm,
        price_per_night: Number(roomForm.price_per_night),
        floor: Number(roomForm.floor),
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
      });
    }

    fetchRooms();
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await adminService.deleteRoom(id);
      fetchRooms();
    }
  };

  // Stats
  const stats = useMemo(() => {
    const total = rooms.length;
    const available = rooms.filter((r) => r.status === 'available').length;
    const booked = rooms.filter((r) => r.status === 'booked' || r.status === 'occupied').length;
    const maintenance = rooms.filter((r) => r.status === 'maintenance').length;
    const pct = total > 0 ? Math.round((available / total) * 100) : 0;
    return { total, available, booked, maintenance, pct };
  }, [rooms]);

  // Filter + Search
  const filteredRooms = useMemo(() => {
    let list = [...rooms];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (r) =>
          r.room_type.toLowerCase().includes(q) ||
          (r.room_number && r.room_number.toString().includes(q))
      );
    }
    if (filterStatus !== 'all') {
      list = list.filter((r) => r.status === filterStatus);
    }
    if (filterType !== 'all') {
      list = list.filter((r) => (ROOM_TYPE_MAP[r.room_type] || r.room_type) === filterType);
    }
    return list;
  }, [rooms, searchTerm, filterStatus, filterType]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRooms.length / ROWS_PER_PAGE));
  const pagedRooms = filteredRooms.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterType]);

  // Export
  const handleExport = () => {
    const header = 'Room Number,Type,Price Per Night,Status,Floor\n';
    const rows = filteredRooms
      .map((r) => `${r.room_number},${ROOM_TYPE_MAP[r.room_type] || r.room_type},${r.price_per_night},${r.status},${r.floor || '1'}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rooms_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-gray-500 font-medium">Loading room inventory…</p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">Room Inventory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Room Management</h1>
        </div>
        <Button onClick={openAddModal} className="flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <Plus size={18} /> Add New Room
        </Button>
      </div>

      {/* ── Stats ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Rooms" value={stats.total} />
        <StatCard label="Available" value={stats.available} subtitle={`${stats.pct}%`} subtitleColor="text-emerald-600" />
        <StatCard label="Booked" value={stats.booked} />
        <StatCard label="Maintenance" value={stats.maintenance} />
      </div>

      {/* ── Filter Bar ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search rooms…"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={handleExport}>
            <Download size={14} /> Export
          </Button>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Room Number</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price Per Night</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedRooms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Home size={48} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-base font-bold text-gray-900">No rooms found</h3>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
                  </td>
                </tr>
              ) : (
                pagedRooms.map((room) => {
                  const sc = STATUS_CONFIG[room.status] || STATUS_CONFIG.available;
                  const typeLabel = ROOM_TYPE_MAP[room.room_type] || room.room_type;

                  return (
                    <tr key={room.id} className="group hover:bg-blue-50/30 transition-colors">
                      {/* Room Number + Image */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-900 text-base">{room.room_number || room.id}</span>
                          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 shadow-sm shrink-0">
                            <img src={room.image} alt={room.room_type} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-800">{typeLabel}</span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">{formatCurrency(room.price_per_night)}</span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditModal(room)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
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
          </table>
        </div>

        {/* Pagination */}
        {filteredRooms.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Showing{' '}
              <span className="font-bold text-gray-900">
                {(currentPage - 1) * ROWS_PER_PAGE + 1} to {Math.min(currentPage * ROWS_PER_PAGE, filteredRooms.length)}
              </span>{' '}
              of <span className="font-bold text-gray-900">{filteredRooms.length}</span> rooms
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

      {/* ── Add / Edit Room Modal ───────────────────────────── */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title={editRoom ? 'Edit Room' : 'Add New Room'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Room Number</label>
              <input
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g. 101"
                value={roomForm.room_number}
                onChange={(e) => setRoomForm({ ...roomForm, room_number: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Floor</label>
              <input
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                type="number"
                placeholder="e.g. 1"
                value={roomForm.floor}
                onChange={(e) => setRoomForm({ ...roomForm, floor: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Room Type / Name</label>
            <input
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g. Deluxe Suite"
              value={roomForm.room_type}
              onChange={(e) => setRoomForm({ ...roomForm, room_type: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Price / Night ($)</label>
              <input
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                type="number"
                placeholder="e.g. 200"
                value={roomForm.price_per_night}
                onChange={(e) => setRoomForm({ ...roomForm, price_per_night: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={roomForm.status}
                onChange={(e) => setRoomForm({ ...roomForm, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveRoom} className="flex-1 shadow-lg shadow-blue-500/20">
              {editRoom ? 'Update Room' : 'Save Room'}
            </Button>
            <Button variant="ghost" onClick={() => { setIsModalOpen(false); resetForm(); }} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoomsPage;
