import { STATUS_CONFIG, ROOM_TYPE_MAP } from '../constants/roomConstants';

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value) || 0);

export const getRoomList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload && typeof payload === 'object') return [payload];
  return [];
};

export const getAmenityLabel = (amenity) => {
  if (!amenity) return '';
  if (typeof amenity === 'string') return amenity;

  return (
    amenity.name ||
    amenity.title ||
    amenity.label ||
    amenity.slug ||
    amenity.code ||
    ''
  );
};

export const normalizeRoomStatus = (room) => {
  const status = String(room?.status || '').toLowerCase();

  if (STATUS_CONFIG[status]) return status;
  if (room?.is_active === false) return 'maintenance';

  return 'available';
};

export const normalizeRoom = (room) => {
  const name =
    room?.name ||
    room?.room_type ||
    `Room ${room?.room_number || ''}`;

  return {
    ...room,
    id: room?.id,
    name,
    room_number: room?.room_number || '',
    room_type:
      room?.room_type ||
      ROOM_TYPE_MAP[name] ||
      'Standard',
    price_per_night: Number(room?.price_per_night || 0),
    status: normalizeRoomStatus(room),
    amenities: Array.isArray(room?.amenities)
      ? room.amenities.map(getAmenityLabel)
      : [],
  };
};