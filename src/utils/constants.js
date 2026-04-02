/**
 * Application-wide constants
 */


export const Roles = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
}
export const Booking_Status = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
}

export const COOKIE_OPTIONS = {
  expires: 7,
  secure: window.location.protocol === 'https:',
  sameSite: 'strict',
};


export const API_BASE_URL = 'http://localhost:8000/api';



