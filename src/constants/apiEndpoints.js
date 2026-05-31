export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://127.0.0.1:8000/api';

export const API_ENDPOINTS = {
  auth: {
    login: '/login',
    register: '/register',
    logout: '/logout',
    me: '/me',
    refresh: '/refresh',
  },
  dashboard: {
    overview: '/dashboard/overview',
    recentBookings: '/dashboard/recent-bookings',
    revenueChart: '/dashboard/revenue-chart',
    activities: '/dashboard/activity',
  },
  users: {
    list: '/admin/users',
    detail: (id) => `/admin/users/${id}`,
  },
  bookings: {
    list: '/admin/getallbookings',
    detail: (id) => `/admin/getallbookings/${id}`,
  },
  rooms: {
    list: '/admin/rooms',
    detail: (id) => `/admin/rooms/${id}`,
  },
  services: {
    list: '/admin/services',
    detail: (id) => `/admin/services/${id}`,
  },
  // services: {
  //   list: '/admin/services',
  // },
  uploads: {
    roomImage: '/admin/roomimage',
  },
};
