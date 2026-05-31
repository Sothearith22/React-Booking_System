const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';

export const AUTH_TOKEN_COOKIE = 'token';
export const AUTH_USER_STORAGE_KEY = 'auth:user';

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  CUSTOMER: 'customer',
};

export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_SERVICE: '/admin/service',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_ROOMS: '/admin/rooms',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_INVENTORY: '/admin/inventory',
  ADMIN_AVAILABILITY: '/admin/availability',
  CUSTOMER: '/',
  CUSTOMER_PROFILE: '/profile',
  CUSTOMER_ROOM: '/room',
  CUSTOMER_SERVICE: '/service',
  CUSTOMER_ABOUT: '/about',
  CUSTOMER_CONTACT: '/contact',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const COOKIE_OPTIONS = {
  expires: 7,
  path: '/',
  secure: isHttps,
  sameSite: 'strict',
};
