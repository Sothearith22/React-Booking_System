export const ROWS_PER_PAGE = 5;

export const STATUS_CONFIG = {
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
