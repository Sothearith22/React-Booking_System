
import { useEffect, useState } from 'react';
import { bookingService } from '../services/booking.service';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookings([]);
      setError(err?.response?.data?.message || 'Unable to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    setBookings,
    loading,
    error,
    refetch: fetchBookings,
  };
}
