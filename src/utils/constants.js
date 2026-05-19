/**
 * Application-wide constants
 */

const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';

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

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://127.0.0.1:8000/api';

export const COOKIE_OPTIONS = {
  expires: 7,
  path: '/',
  secure: isHttps,
  sameSite: 'strict',
};
