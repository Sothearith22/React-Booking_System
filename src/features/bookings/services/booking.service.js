import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../constants/apiEndpoints';

const unwrapResponse = (response) => response.data?.data ?? response.data ?? [];

const getBookingList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.bookings)) return payload.bookings;
  if (Array.isArray(payload?.records)) return payload.records;
  if (payload?.data && typeof payload.data === 'object') return getBookingList(payload.data);
  return [];
};

const getInitials = (name) =>
  String(name || 'Guest')
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'GU';

const normalizeStatus = (status) => {
  const value = String(status || 'pending').toLowerCase();

  if (['confirmed', 'approved', 'active'].includes(value)) return 'confirmed';
  if (['cancelled', 'canceled', 'rejected'].includes(value)) return 'cancelled';
  return 'pending';
};

const normalizePayment = (payment) => {
  const value = String(payment || 'unpaid').toLowerCase();

  if (['paid', 'completed', 'success'].includes(value)) return 'paid';
  if (['refunded', 'refund'].includes(value)) return 'refunded';
  return 'unpaid';
};
const getBookable = (booking = {}) =>
  booking.bookable ||
  booking.room_availability?.room ||
  booking.service_availability?.service ||
  booking.room ||
  booking.service ||
  booking.product ||
  {};

const getBookingType = (booking = {}) => {
  const type = String(booking.bookable_type || '').toLowerCase();

  if (type.includes('service') || booking.service_availability_id || booking.service_availability) {
    return 'Service';
  }

  return 'Room';
};

const normalizeBooking = (booking = {}) => {
  const bookable = getBookable(booking);
  const bookingType = getBookingType(booking);
  const guestName =
    booking.customer_name ||
    booking.customer?.name ||
    `User #${booking.user_id || booking.customer_id || 'Guest'}`;
  const roomName =
    booking.room_name ||
    booking.service_name ||
    bookable.name ||
    bookable.room_type ||
    `${bookingType} #${booking.bookable_id || booking.room_id || booking.service_id || ''}`.trim();
  const checkIn = booking.check_in ?? booking.check_in_date ?? booking.booking_date ?? booking.start_date ?? '';
  const checkOut =
    booking.check_out ??
    booking.check_out_date ??
    booking.end_date ??
    (bookingType === 'Service' ? checkIn : '');

  return {
    ...booking,
    id: booking.id ?? booking.booking_id ?? booking.uuid ?? '',
    user_id: booking.user_id ?? booking.customer_id ?? booking.user?.id ?? booking.customer?.id ?? '',
    room_id: booking.room_id ?? booking.bookable_id ?? booking.product_id ?? bookable.id ?? '',
    reference: booking.reference || `BK-${booking.id ?? booking.booking_id ?? ''}`,
    booking_type: bookingType,
    guest_name: guestName,
    guest_initials: booking.guest_initials || getInitials(guestName),
    room_name: roomName,
    room_number: String(booking.room_number ?? bookable.room_number ?? bookable.number ?? booking.bookable_id ?? bookable.id ?? ''),
    check_in: checkIn,
    check_out: checkOut,
    start_time: booking.start_time || booking.service_availability?.start_time || '',
    end_time: booking.end_time || booking.service_availability?.end_time || '',
    guests: Number(booking.guests || booking.guest_count || 1),
    status: normalizeStatus(booking.status ?? booking.booking_status?.slug ?? booking.booking_status?.name),
    status_label: booking.booking_status?.name || booking.status || 'Pending',
    payment: normalizePayment(booking.payment ?? booking.payment_status),
    total_price: Number(booking.total_price ?? booking.total ?? booking.total_amount ?? booking.price ?? 0),
    note: booking.note || '',
  };
};

export const bookingService = {
  async getBookings() {
    const response = await apiClient.get(API_ENDPOINTS.bookings.list);
    return getBookingList(unwrapResponse(response)).map(normalizeBooking);
  },

  async updateBookingStatus(id, status) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.bookings.detail(id), { status });
      return unwrapResponse(response);
    } catch (error) {
      if (error?.response?.status !== 405) {
        throw error;
      }

      const response = await apiClient.patch(API_ENDPOINTS.bookings.detail(id), { status });
      return unwrapResponse(response);
    }
  },
};
