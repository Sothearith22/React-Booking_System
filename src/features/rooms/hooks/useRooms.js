import { useState, useCallback, useEffect } from 'react';
import { roomService } from '../services/room.service';
import { getRoomList, normalizeRoom } from '../utils/room.utils';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await roomService.getRooms();
      const nextRooms = getRoomList(response).map(normalizeRoom);
      setRooms(nextRooms);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setRooms([]);
      setError(err?.response?.data?.message || 'Unable to load rooms.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return { rooms, setRooms, loading, error, setError, refetch: fetchRooms };
};
