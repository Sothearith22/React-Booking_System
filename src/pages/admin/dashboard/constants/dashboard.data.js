export const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    to: '/admin/dashboard',
    headerTitle: 'Dashboard Overview',
    headerSubtitle: 'Track your hotel performance and operations.',
    end: true
  },
    {
    id: 'services',
    label: 'Services',
    icon: 'services',
    to: '/admin/services',
    headerTitle: 'Service Management',
    headerSubtitle: 'Manage your hotel service offerings and pricing.'
  },
  {
    id: 'rooms',
    label: 'Rooms',
    icon: 'rooms',
    to: '/admin/rooms',
    headerTitle: 'Room Management',
    headerSubtitle: 'Monitor and update individual room status.'
  },
  {
    id: 'bookings',
    label: 'Bookings',
    icon: 'calendar',
    to: '/admin/bookings',
    headerTitle: 'Reservations',
    headerSubtitle: 'Review and manage all guest bookings.'
  },
  {
    id: 'users',
    label: 'Customers',
    icon: 'guests',
    to: '/admin/users',
    headerTitle: 'Customers',
    headerSubtitle: 'Manage guest profiles and customer access.'
  },
  {
    id: 'availability',
    label: 'Availability',
    icon: 'calendar',
    to: '/admin/availability',
    headerTitle: 'Room Availability',
    headerSubtitle: 'Check and manage room availability across different dates.'
  },
  {
    id: 'products',
    label: 'Products',
    icon: 'products',
    to: '/admin/products',
    headerTitle: 'Product Management',
    headerSubtitle: 'Manage your hotel products and services.'
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: 'categories',
    to: '/admin/categories',
    headerTitle: 'Category Management',
    headerSubtitle: 'Organize rooms and services into categories.'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'reports',
    to: '/admin/reports',
    headerTitle: 'Reports',
    headerSubtitle: 'Review hotel revenue, occupancy, and service trends.'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    to: '/admin/settings',
    headerTitle: 'System Settings',
    headerSubtitle: 'Configure platform-wide preferences.'
  }
];

export const stats = [
  { title: 'Occupancy Rate', value: '84%', trend: '+2.4%', detail: '', icon: 'occupancy' },
  { title: 'Total Revenue', value: '$42,500', trend: '+12.5%', detail: '', icon: 'finance' },
  { title: 'Active Bookings', value: '124', trend: '', detail: 'This week', icon: 'bookings' },
  { title: 'Available Rooms', value: '12', trend: '', detail: 'Out of 150', icon: 'rooms' },
];

export const revenuePoints = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 63 },
  { label: 'Wed', value: 52 },
  { label: 'Thu', value: 84, highlight: true },
  { label: 'Fri', value: 73 },
  { label: 'Sat', value: 94 },
  { label: 'Sun', value: 68 },
];

export const recentActivities = [
  {
    id: 1,
    icon: 'user-plus',
    iconTone: 'bg-indigo-100 text-blue-700',
    title: 'New booking by',
    highlight: 'Alex Johnson',
    meta: '2 mins ago • Deluxe Suite',
  },
  {
    id: 2,
    icon: 'cleaning',
    iconTone: 'bg-orange-100 text-orange-700',
    title: 'Room 302 marked for Cleaning',
    meta: '15 mins ago • Housekeeping',
  },
  {
    id: 3,
    icon: 'card',
    iconTone: 'bg-teal-200 text-teal-800',
    title: 'Payment received for Booking #4892',
    meta: '1 hour ago • $450.00',
  },
];

export const upcomingCheckIns = [
  {
    id: 1,
    initials: 'SM',
    guest: 'Sarah Miller',
    room: 'Ocean View 405',
    eta: '14:00 PM',
    status: 'Confirmed',
    statusTone: 'bg-teal-100 text-teal-800',
  },
  {
    id: 2,
    initials: 'DW',
    guest: 'David Wright',
    room: 'Standard 112',
    eta: '15:30 PM',
    status: 'Pending VIP',
    statusTone: 'bg-indigo-100 text-slate-800',
  },
];

export const destinationBreakdown = [
  { name: 'France', percent: 35, participants: '420 guests', tone: 'bg-sky-500', strokeColor: '#0ea5e9' },
  { name: 'Maldives', percent: 25, participants: '300 guests', tone: 'bg-emerald-500', strokeColor: '#10b981' },
  { name: 'Japan', percent: 20, participants: '240 guests', tone: 'bg-amber-500', strokeColor: '#f59e0b' },
  { name: 'Other', percent: 20, participants: '240 guests', tone: 'bg-zinc-400', strokeColor: '#a1a1aa' },
];

export const tripSummary = [
  { label: 'Confirmed', value: 840, tone: 'bg-emerald-500' },
  { label: 'Pending', value: 240, tone: 'bg-amber-500' },
  { label: 'Cancelled', value: 120, tone: 'bg-rose-500' },
];

export const packages = [
  {
    name: 'Skyline Suites',
    location: 'Paris, France',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    detail: 'Riverside view, breakfast included'
  },
  {
    name: 'Ocean Villa',
    location: 'Maldives',
    category: 'Resort',
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800',
    detail: 'Private pool, beach access'
  },
  {
    name: 'Alpine Lodge',
    location: 'Swiss Alps',
    category: 'Cabin',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    detail: 'Mountain view, spa access'
  }
];

export const messageThreads = [
  { name: 'John Doe', preview: 'Is late check-in possible for tonight?', time: '2m ago', accent: 'bg-sky-100 text-sky-600' },
  { name: 'Jane Smith', preview: 'Thank you for the wonderful stay!', time: '1h ago', accent: 'bg-emerald-100 text-emerald-600' },
  { name: 'Robert Fox', preview: 'Can I upgrade my room to a suite?', time: '3h ago', accent: 'bg-amber-100 text-amber-600' },
];

export const upcomingTrips = [
  {
    title: 'Paris Summer Getaway',
    category: 'Leisure',
    rating: '4.9',
    dates: '12-18 Jul, 2026',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Maldives Honeymoon',
    category: 'Romantic',
    rating: '5.0',
    dates: '20-27 Jul, 2026',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800'
  }
];
