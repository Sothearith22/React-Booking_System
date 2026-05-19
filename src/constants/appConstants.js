const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';

export const AUTH_TOKEN_COOKIE = 'token';
export const AUTH_USER_STORAGE_KEY = 'auth:user';

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  CUSTOMER: 'customer',
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
