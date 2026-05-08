export const navItems = [
  {
    id: 'overview',
    to: '/dashboard',
    end: true,
    label: 'Dashboard',
    icon: 'dashboard',
    headerTitle: 'Dashboard',
    headerSubtitle: 'A clean operational snapshot for the day-to-day admin workflow.',
  },
  {
    id: 'bookings',
    to: '/dashboard/bookings',
    label: 'Bookings',
    icon: 'bookings',
    headerTitle: 'Booking operations',
    headerSubtitle: 'Keep arrivals, room readiness, and reservation follow-ups in one view.',
  },
  {
    id: 'services',
    to: '/dashboard/services',
    label: 'Services',
    icon: 'services',
    headerTitle: 'Service coordination',
    headerSubtitle: 'Track add-ons, concierge requests, and service handoffs.',
  },
  {
    id: 'guests',
    to: '/dashboard/guests',
    label: 'Guests',
    icon: 'guests',
    headerTitle: 'Guest experience queue',
    headerSubtitle: 'Spot profile gaps, VIP notes, and recent guest issues quickly.',
  },
  {
    id: 'finance',
    to: '/dashboard/finance',
    label: 'Finance',
    icon: 'finance',
    headerTitle: 'Revenue and billing',
    headerSubtitle: 'Watch revenue pacing, refunds, and outstanding billing tasks.',
  },
  {
    id: 'staff',
    to: '/dashboard/staff',
    label: 'Staff',
    icon: 'staff',
    headerTitle: 'Staff planning',
    headerSubtitle: 'Review shift coverage, task balance, and training progress.',
  },
  {
    id: 'reports',
    to: '/dashboard/reports',
    label: 'Reports',
    icon: 'reports',
    headerTitle: 'Reporting snapshot',
    headerSubtitle: 'Surface the trends that matter across operations and guest experience.',
  },
  {
    id: 'settings',
    to: '/dashboard/settings',
    label: 'Settings',
    icon: 'settings',
    headerTitle: 'Platform settings',
    headerSubtitle: 'Manage the operating rules and preferences behind the booking flow.',
  },
];

export const stats = [
  {
    title: 'Total Booking',
    value: '1,200',
    trend: '+2.98%',
    icon: 'bookings',
    iconTone: 'bg-sky-100 text-sky-600',
    trendTone: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'Total New Customers',
    value: '2,845',
    trend: '-1.45%',
    icon: 'guests',
    iconTone: 'bg-emerald-100 text-emerald-600',
    trendTone: 'text-rose-600 bg-rose-50',
  },
  {
    title: 'Total Earnings',
    value: '$12,890',
    trend: '+3.75%',
    icon: 'finance',
    iconTone: 'bg-amber-100 text-amber-700',
    trendTone: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'Upcoming Check-ins',
    value: '86',
    trend: '+0.84%',
    icon: 'calendar',
    iconTone: 'bg-violet-100 text-violet-600',
    trendTone: 'text-sky-600 bg-sky-50',
  },
];

export const revenuePoints = [
  { label: 'Sun', value: 360 },
  { label: 'Mon', value: 420 },
  { label: 'Tue', value: 295 },
  { label: 'Wed', value: 635, highlight: true },
  { label: 'Thu', value: 410 },
  { label: 'Fri', value: 560 },
  { label: 'Sat', value: 505 },
];

export const destinationBreakdown = [
  { name: 'Tokyo, Japan', percent: 35, participants: '2,458 participants', tone: 'bg-sky-500' },
  { name: 'Sydney, Australia', percent: 28, participants: '2,148 participants', tone: 'bg-blue-300' },
  { name: 'Paris, France', percent: 22, participants: '2,458 participants', tone: 'bg-cyan-200' },
  { name: 'Venice, Italy', percent: 15, participants: '2,456 participants', tone: 'bg-slate-200' },
];

export const tripSummary = [
  { label: 'Done', value: 620, tone: 'bg-sky-500' },
  { label: 'Booked', value: 465, tone: 'bg-emerald-500' },
  { label: 'Cancelled', value: 115, tone: 'bg-rose-400' },
];

export const packages = [
  {
    name: 'Cultural Exploration',
    location: 'Tokyo, Japan',
    category: 'Featured getaway',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    detail: '4.8 · 12 destinations',
  },
  {
    name: 'Venice Dreams',
    location: 'Venice, Italy',
    category: 'Romance package',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    detail: '4.9 · 8 destinations',
  },
  {
    name: 'Safari Adventure',
    location: 'Marrakech, Morocco',
    category: 'Adventure tour',
    image:
      'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1200&auto=format&fit=crop',
    detail: '4.7 · 10 destinations',
  },
];

export const messageThreads = [
  {
    name: 'Europa Hotel',
    preview: 'We are pleased to confirm your transfer pickup.',
    time: '10:00 AM',
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    name: 'Global Travel Co',
    preview: 'We have updated our corporate rates for August.',
    time: '2:20 PM',
    accent: 'bg-rose-100 text-rose-700',
  },
  {
    name: 'Kalendra Umbra',
    preview: 'Hi, I need assistance with my booking extension.',
    time: '9:45 AM',
    accent: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Osmar Farooq',
    preview: 'Hello, I had an amazing trip and want to book again.',
    time: '10:15 AM',
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Melinda Jenkins',
    preview: 'Can you send me more information about the suite views?',
    time: '7:20 PM',
    accent: 'bg-violet-100 text-violet-700',
  },
];

export const upcomingTrips = [
  {
    title: 'Paris, France',
    category: 'Romantic getaway',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    rating: '4.8',
    dates: '8-10 July',
  },
  {
    title: 'Tokyo, Japan',
    category: 'Cultural exploration',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    rating: '4.9',
    dates: '17-20 July',
  },
  {
    title: 'Sydney, Australia',
    category: 'Adventure tour',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    rating: '4.7',
    dates: '23-24 July',
  },
];
