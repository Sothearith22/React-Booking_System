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
    id: 'categories',
    label: 'Categories',
    icon: 'services',
    to: '/admin/categories',
    headerTitle: 'Service Categories',
    headerSubtitle: 'Manage your hotel service types and pricing.'
  },
  {
    id: 'rooms',
    label: 'Rooms',
    icon: 'bookings',
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
    label: 'Users',
    icon: 'guests',
    to: '/admin/users',
    headerTitle: 'User Accounts',
    headerSubtitle: 'Manage staff and customer access.'
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: 'sparkle',
    to: '/admin/reviews',
    headerTitle: 'Guest Reviews',
    headerSubtitle: 'Monitor guest feedback and ratings.'
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: 'finance',
    to: '/admin/inventory',
    headerTitle: 'Inventory Tracking',
    headerSubtitle: 'Manage your hotel supplies and stock.'
  },
  {
    id: 'availability',
    label: 'Availability',
    icon: 'staff',
    to: '/admin/availability',
    headerTitle: 'Service Availability',
    headerSubtitle: 'Track service uptime and scheduling.'
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
  { title: 'Total Revenue', value: '28,430', trend: '+12.5%', icon: 'finance', iconTone: 'bg-emerald-100 text-emerald-600', trendTone: 'bg-emerald-50 text-emerald-600' },
  { title: 'Total Bookings', value: '1,240', trend: '+8.2%', icon: 'bookings', iconTone: 'bg-sky-100 text-sky-600', trendTone: 'bg-sky-50 text-sky-600' },
  { title: 'Active Guests', value: '432', trend: '+4.1%', icon: 'guests', iconTone: 'bg-amber-100 text-amber-600', trendTone: 'bg-amber-50 text-amber-600' },
  { title: 'Staff on Duty', value: '48', trend: '0%', icon: 'staff', iconTone: 'bg-indigo-100 text-indigo-600', trendTone: 'bg-zinc-100 text-zinc-600' },
];

export const revenuePoints = [
  { label: 'Mon', value: 4500 },
  { label: 'Tue', value: 5200 },
  { label: 'Wed', value: 4800 },
  { label: 'Thu', value: 6100 },
  { label: 'Fri', value: 7500, highlight: true },
  { label: 'Sat', value: 8200 },
  { label: 'Sun', value: 7800 },
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
