import { EMPTY_ROOM_FORM, ROOM_TYPE_MAP, STATUS_CONFIG } from '../constants/room.constants';

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
    price: Number(room?.price ?? room?.price_per_night ?? 0),
    duration: Number(room?.duration ?? 0),
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
  name: room?.name || '',
  description: room?.description || '',
  price: String(room?.price ?? room?.price_per_night ?? ''),
  duration: String(room?.duration ?? ''),
  status: room?.status || 'available',
});

export const buildRoomPayload = (roomForm) => {
  const payload = {
    name: String(roomForm?.name ?? '').trim(),
    description: String(roomForm?.description ?? '').trim(),
    price: Number(roomForm?.price ?? 0),
    duration: Number(roomForm?.duration ?? 0),
    status: roomForm?.status || 'available',
  };
  return payload;
};
export const getServiceList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && typeof payload.data === 'object') return [payload.data];
  if (payload && typeof payload === 'object') return [payload];
  return [];
};
