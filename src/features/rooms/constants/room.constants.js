// room.constants.js

export const ROWS_PER_PAGE = 10;

export const ROOM_INPUT_CLASS =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-base text-gray-800 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

export const ROOM_TEXTAREA_CLASS =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-base text-gray-800 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none';

export const STATUS_CONFIG = {
  available: {
    label: 'Available',
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-100',
  },
  booked: {
    label: 'Booked',
    dot: 'bg-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100',
  },
  occupied: {
    label: 'Occupied',
    dot: 'bg-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100',
  },
  maintenance: {
    label: 'Maintenance',
    dot: 'bg-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-100',
  },
};

export const ROOM_TYPE_MAP = {
  'Grand Royal Suite': 'Suite',
  'Ocean View Villa': 'Deluxe',
  'Alpine Mountain Lodge': 'Standard',
  'Modern City Penthouse': 'Suite',
};

export const ROOM_STATUS_OPTIONS = [
  { value: 'available', label: 'Available' },
  { value: 'booked', label: 'Booked' },
  { value: 'maintenance', label: 'Maintenance' },
];

export const EMPTY_ROOM_FORM = {
  service_id: '',
  name: '',
  capacity: '1',
  amenities: '',
  sort_order: '1',
  price_per_night: '',
  status: 'available',
  description: '',
  images: [],
};