import { useCallback, useEffect, useMemo, useState } from 'react';
import { roomService } from '../../services/Room.Service';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
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
} from 'lucide-react';


const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value) || 0);


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

const EMPTY_ROOM_FORM = {
  name: '',
  room_number: '',
  room_type: '',
  price_per_night: '',
  floor: '',
  status: 'available',
  location: 'Main Wing',
  description: '',
};

const getRoomList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (payload && typeof payload === 'object') {
    return [payload];
  }

  return [];
};

const getAmenityLabel = (amenity) => {
  if (!amenity) {
    return '';
  }

  if (typeof amenity === 'string') {
    return amenity;
  }

  return amenity.name || amenity.title || amenity.label || amenity.slug || amenity.code || '';
};

const normalizeRoomStatus = (room) => {
  const rawStatus = String(room?.status || '').toLowerCase();

  if (STATUS_CONFIG[rawStatus]) {
    return rawStatus;
  }

  if (room?.is_active === false) {
    return 'maintenance';
  }

  return 'available';
};

const normalizeRoom = (room) => {
  const name =
    room?.name ||
    room?.room_type ||
    room?.title ||
    `Room ${room?.room_number ?? room?.id ?? ''}`.trim() ||
    'Untitled room';

  const image =
    room?.image ||
    room?.image_url ||
    room?.room_images?.find((item) => item?.is_cover)?.image_url ||
    room?.room_images?.[0]?.image_url ||
    '';

  const amenities = Array.isArray(room?.amenities)
    ? room.amenities.map(getAmenityLabel).filter(Boolean)
    : [];

  return {
    ...room,
    id: room?.id ?? crypto.randomUUID(),
    name,
    room_number: room?.room_number || room?.number || '',
    room_type: room?.room_type || room?.type || room?.category?.name || ROOM_TYPE_MAP[name] || 'Standard',
    price_per_night: Number(room?.price_per_night ?? room?.price ?? 0),
    floor: room?.floor || room?.level || '',
    status: normalizeRoomStatus(room),
    location: room?.location || room?.wing || 'Main Wing',
    description: room?.description || '',
    image,
    amenities,
  };
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
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [roomForm, setRoomForm] = useState(EMPTY_ROOM_FORM);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await roomService.getRooms();
      const nextRooms = getRoomList(response.data).map(normalizeRoom);
      setRooms(nextRooms);
    } catch (loadError) {
      console.error('Error fetching rooms:', loadError);
      setRooms([]);
      setError(loadError?.response?.data?.message || 'Unable to load rooms right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const resetForm = () => {
    setRoomForm(EMPTY_ROOM_FORM);
    setEditRoom(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (room) => {
    setEditRoom(room);
    setRoomForm({
      name: room.name || '',
      room_number: room.room_number || '',
      room_type: room.room_type || '',
      price_per_night: room.price_per_night || '',
      floor: room.floor || '',
      status: room.status || 'available',
      location: room.location || 'Main Wing',
      description: room.description || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveRoom = async () => {
    if (!roomForm.name.trim() || !roomForm.price_per_night) {
      return;
    }

    const payload = {
      name: roomForm.name.trim(),
      description: roomForm.description.trim(),
      status: roomForm.status,
      is_active: roomForm.status !== 'maintenance',
      price_per_night: Number(roomForm.price_per_night),
    };

    if (roomForm.room_number.trim()) {
      payload.room_number = roomForm.room_number.trim();
    }

    if (roomForm.room_type.trim()) {
      payload.room_type = roomForm.room_type.trim();
    }

    if (roomForm.location.trim()) {
      payload.location = roomForm.location.trim();
    }

    if (roomForm.floor !== '') {
      payload.floor = Number(roomForm.floor);
    }

    try {
      setError('');

      if (editRoom) {
        await roomService.updateRoom(editRoom.id, payload);
      } else {
        await roomService.addRoom(payload);
      }

      await fetchRooms();
      setIsModalOpen(false);
      resetForm();
    } catch (saveError) {
      console.error('Error saving room:', saveError);
      setError(saveError?.response?.data?.message || 'Unable to save this room right now.');
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) {
      return;
    }

    try {
      setError('');
      await roomService.deleteRoom(id);
      await fetchRooms();
    } catch (deleteError) {
      console.error('Error deleting room:', deleteError);
      setError(deleteError?.response?.data?.message || 'Unable to delete this room right now.');
    }
  };

  const roomTypes = useMemo(
    () => Array.from(new Set(rooms.map((room) => room.room_type).filter(Boolean))).sort(),
    [rooms]
  );

  // Stats
  const stats = useMemo(() => {
    const total = rooms.length;
    const available = rooms.filter((room) => room.status === 'available').length;
    const booked = rooms.filter((room) => room.status === 'booked' || room.status === 'occupied').length;
    const maintenance = rooms.filter((room) => room.status === 'maintenance').length;
    const pct = total > 0 ? Math.round((available / total) * 100) : 0;

    return { total, available, booked, maintenance, pct };
  }, [rooms]);

  // Filter + Search
  const filteredRooms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesSearch =
        !query ||
        [
          room.name,
          room.room_number,
          room.room_type,
          room.description,
          room.location,
        ].some((value) => String(value || '').toLowerCase().includes(query));

      const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
      const matchesType = filterType === 'all' || room.room_type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    });
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
    const header = 'Name,Room Number,Type,Price Per Night,Status,Floor,Amenities\n';
    const rows = filteredRooms
      .map((room) =>
        [
          room.name,
          room.room_number,
          room.room_type,
          room.price_per_night,
          room.status,
          room.floor || '',
          room.amenities.join(' | '),
        ]
          .map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rooms_export.csv';
    link.click();
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

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

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
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
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
                {/* <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Room Number</th> */}
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amenities</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedRooms.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <Home size={48} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-base font-bold text-gray-900">No rooms found</h3>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
                  </td>
                </tr>
              ) : (
                pagedRooms.map((room) => {
                  const sc = STATUS_CONFIG[room.status] || STATUS_CONFIG.available;

                  return (
                    <tr key={room.id} className="group hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="min-w-[180px]">
                          <p className="font-bold text-gray-900 text-sm">{room.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {room.room_number ? `Room ${room.room_number}` : room.location}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center">
                          {room.image ? (
                            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                          ) : (
                            <Home size={18} className="text-gray-400" />
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">{formatCurrency(room.price_per_night)}</span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-800">{room.room_type}</span>
                      </td>

                      <td className="px-6 py-4">
                        {room.amenities.length > 0 ? (
                          <p className="max-w-[220px] text-xs leading-5 text-gray-600">
                            {room.amenities.join(', ')}
                          </p>
                        ) : (
                          <span className="text-xs font-medium text-gray-400">No amenities</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <p className="max-w-[280px] text-sm leading-5 text-gray-600">
                          {room.description || 'No description provided.'}
                        </p>
                      </td>

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
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Room Name</label>
            <input
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g. Grand Royal Suite"
              value={roomForm.name}
              onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
            />
          </div>
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
            <label className="block text-xs font-bold text-gray-600 mb-1">Room Type</label>
            <input
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g. Suite"
              value={roomForm.room_type}
              onChange={(e) => setRoomForm({ ...roomForm, room_type: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              rows={3}
              placeholder="Add a short room description"
              value={roomForm.description}
              onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
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
