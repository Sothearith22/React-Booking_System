import { useCallback, useEffect, useMemo, useState } from 'react';
import { BedDouble, BadgeCheck, CalendarClock, Wrench, Plus } from 'lucide-react';

import RoomFilters from '../components/RoomFilters';
import RoomModal from '../components/RoomModal';
import RoomsTable from '../components/RoomsTable';
import DeleteConfirmationModal from '../../../components/ui/DeleteConfirmationModal';

import PageHeader from '../components/PageHeader';
import StatsGrid from '../components/StatsGrid';

import { useRooms } from '../hooks/useRooms';
import { useRoomStats } from '../hooks/useRoomStats';

import { useDebounce } from '../../../hooks/useDebounce';
import { usePagination } from '../../../hooks/usePagination';

import { roomService } from '../services/room.service';
import { EMPTY_ROOM_FORM, ROWS_PER_PAGE, STATUS_CONFIG } from '../constants/room.constants';
import { buildRoomPayload, mapRoomToForm } from '../utils/room.utils';

const getServiceList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && typeof payload.data === 'object') return [payload.data];
  if (payload && typeof payload === 'object') return [payload];
  return [];
};

const getSavedRoomId = (response, fallbackId) =>
  response?.id || response?.room?.id || response?.data?.id || fallbackId;

export default function RoomsPage() {
  const { rooms, loading, error, setError, refetch } = useRooms();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_ROOM_FORM });
  const [isSaving, setIsSaving] = useState(false);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState('');

  const debounced = useDebounce(search, 200);

  const stats = useRoomStats(rooms);

  const summaryCards = useMemo(() => [
    { key: 'total', label: 'Total Rooms', value: stats.total, badge: 'Global', icon: BedDouble, tone: 'total' },
    { key: 'available', label: 'Available', value: stats.available, badge: 'Live', icon: BadgeCheck, tone: 'available' },
    { key: 'booked', label: 'Booked', value: stats.booked, badge: 'Busy', icon: CalendarClock, tone: 'booked' },
    { key: 'maintenance', label: 'Maintenance', value: stats.maintenance, badge: 'Alert', icon: Wrench, tone: 'maintenance' },
  ], [stats]);

  const filteredRooms = useMemo(() => {
    const q = debounced.toLowerCase();

    return rooms.filter(r => {
      const matchSearch =
        !q ||
        [r.name, r.room_number, r.room_type]
          .some(v => String(v || '').toLowerCase().includes(q));

      const matchStatus = status === 'all' || r.status === status;
      const matchType = type === 'all' || r.room_type === type;

      return matchSearch && matchStatus && matchType;
    });
  }, [rooms, debounced, status, type]);

  const roomTypes = useMemo(
    () => Array.from(new Set(rooms.map((room) => room.room_type).filter(Boolean))).sort(),
    [rooms]
  );

  const pagination = usePagination(filteredRooms, ROWS_PER_PAGE);
  const { setCurrentPage } = pagination;

  useEffect(() => {
    setCurrentPage(1);
  }, [debounced, status, type, setCurrentPage]);

  useEffect(() => {
    let cancelled = false;

    const fetchServices = async () => {
      setServicesLoading(true);
      setServicesError('');

      try {
        const response = await roomService.getServices();

        if (!cancelled) {
          setServices(getServiceList(response));
        }
      } catch (err) {
        if (!cancelled) {
          setServices([]);
          setServicesError(err?.response?.data?.message || 'Unable to load services.');
        }
      } finally {
        if (!cancelled) {
          setServicesLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      cancelled = true;
    };
  }, []);

  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        value: String(service.id ?? service.value ?? ''),
        label:
          service.name ||
          service.title ||
          service.label ||
          service.service_name ||
          `Service ${service.id ?? ''}`.trim(),
      })).filter((service) => service.value),
    [services]
  );

  const handleFieldChange = useCallback((field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }, []);

  const handleImagesChange = useCallback((files) => {
    setForm((current) => ({
      ...current,
      images: Array.from(files || []),
    }));
  }, []);

  const openAdd = () => {
    setError('');
    setEditRoom(null);
    setForm({ ...EMPTY_ROOM_FORM });
    setModalOpen(true);
  };

  const openEdit = (room) => {
    setError('');
    setEditRoom(room);
    setForm(mapRoomToForm(room));
    setModalOpen(true);
  };

  const saveRoom = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      setError('');

      const payload = buildRoomPayload(form);
      const imageFiles = form.images || [];
      let savedRoom;

      if (editRoom) {
        savedRoom = await roomService.updateRoom(editRoom.id, payload);
      } else {
        savedRoom = await roomService.addRoom(payload);
      }

      const roomId = getSavedRoomId(savedRoom, editRoom?.id);

      if (roomId && imageFiles.length > 0) {
        await roomService.uploadRoomImages(roomId, imageFiles);
      }

      await refetch();
      setModalOpen(false);
      setEditRoom(null);
      setForm({ ...EMPTY_ROOM_FORM });
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!roomToDelete) {
      return;
    }

    try {
      setIsSaving(true);
      setError('');
      await roomService.deleteRoom(roomToDelete.id);
      await refetch();
      setRoomToDelete(null);
    } catch (err) {
      setError(err?.response?.data?.message || 'Delete failed');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Room Inventory"
        description="Monitor availability, pricing, and readiness across rooms."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Rooms', active: true },
        ]}
        actionLabel="Add New Room"
        onAction={openAdd}
        icon={Plus}
      />

      <StatsGrid cards={summaryCards} />

      {error ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
          {error}
        </div>
      ) : null}

      <RoomFilters
        searchTerm={search}
        onSearchTermChange={setSearch}
        filterStatus={status}
        onFilterStatusChange={setStatus}
        filterType={type}
        onFilterTypeChange={setType}
        roomTypes={roomTypes}
      />

      <RoomsTable
        rooms={pagination.paginatedItems}
        statusConfig={STATUS_CONFIG}
        pagination={pagination}
        onEdit={openEdit}
        onDelete={setRoomToDelete}
      />

      <RoomModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditRoom(null);
          setForm({ ...EMPTY_ROOM_FORM });
        }}
        onSubmit={saveRoom}
        roomForm={form}
        editRoom={editRoom}
        formError={error}
        isSaving={isSaving}
        serviceOptions={serviceOptions}
        servicesLoading={servicesLoading}
        servicesError={servicesError}
        onFieldChange={handleFieldChange}
        onImagesChange={handleImagesChange}
      />

      <DeleteConfirmationModal
        isOpen={!!roomToDelete}
        onClose={() => setRoomToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete room?"
        message="Are you sure you want to remove this room from inventory?"
        itemName={roomToDelete?.name}
      />
    </div>
  );
}
