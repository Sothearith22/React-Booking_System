import { EMPTY_ROOM_FORM, ROOM_TYPE_MAP, STATUS_CONFIG } from '../constants/roomConstants';

export const getRoomList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && typeof payload.data === 'object') return [payload.data];
  if (payload && typeof payload === 'object') return [payload];
  return [];
};

export const getAmenityLabel = (amenity) => {
  if (!amenity) return '';
  if (typeof amenity === 'string') return amenity;

  return amenity.name || amenity.title || amenity.label || amenity.slug || amenity.code || '';
};

export const normalizeRoomStatus = (room) => {
  const rawStatus = String(room?.status || '').toLowerCase();

  if (rawStatus === 'occupied') return 'booked';
  if (STATUS_CONFIG[rawStatus]) return rawStatus;
  if (room?.is_active === false) return 'maintenance';

  return 'available';
};

export const normalizeRoom = (room) => {
  const fallbackName = `Room ${room?.room_number ?? room?.id ?? ''}`.trim();
  const name = room?.name || room?.room_type || room?.title || fallbackName || 'Untitled room';
  const fallbackId = room?.room_number || room?.slug || globalThis.crypto?.randomUUID?.() || name;
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
    id: room?.id ?? fallbackId,
    name,
    service_id: room?.service_id ?? room?.service?.id ?? '',
    room_number: room?.room_number || room?.number || '',
    room_type:
      room?.room_type ||
      room?.type ||
      room?.service?.name ||
      room?.service_name ||
      room?.category?.name ||
      ROOM_TYPE_MAP[name] ||
      'Standard',
    price_per_night: Number(room?.price_per_night ?? room?.price ?? 0),
    floor: room?.floor ?? room?.level ?? '',
    status: normalizeRoomStatus(room),
    location: room?.location || room?.wing || 'Main Wing',
    description: room?.description || '',
    image,
    amenities,
    is_active: room?.is_active !== false,
    capacity: Number(room?.capacity || 1),
    sort_order: Number(room?.sort_order || 1),
  };
};

export const mapRoomToForm = (room = {}) => ({
  ...EMPTY_ROOM_FORM,
  service_id: room?.service_id ? String(room.service_id) : room?.service?.id ? String(room.service.id) : '',
  name: room?.name || '',
  capacity: String(room?.capacity ?? 1),
  amenities: Array.isArray(room?.amenities) ? room.amenities.map(getAmenityLabel).filter(Boolean).join(', ') : '',
  sort_order: String(room?.sort_order ?? 1),
  price_per_night: room?.price_per_night ?? '',
  status: room?.status || 'available',
  description: room?.description || '',
  images: [],
});

export const buildRoomPayload = (roomForm) => {
  const amenities = String(roomForm?.amenities ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const payload = {
    service_id: Number(roomForm?.service_id ?? 0),
    name: String(roomForm?.name ?? '').trim(),
    description: String(roomForm?.description ?? '').trim(),
    is_active: roomForm?.status !== 'maintenance',
    price_per_night: Number(roomForm?.price_per_night ?? 0),
    capacity: Number(roomForm?.capacity ?? 1),
    amenities,
    sort_order: Number(roomForm?.sort_order ?? 1),
  };
  return payload;
};
