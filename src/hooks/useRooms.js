import { useCallback, useEffect, useState } from 'react';
import { roomService } from '../services/Room.Service';
import { getRoomList, normalizeRoom } from '../utils/roomUtils';

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await roomService.getRooms();
      const data = getRoomList(res).map(normalizeRoom);
      setRooms(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load rooms');
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addRoom = async (payload) => {
    await roomService.addRoom(payload);
    await fetchRooms();
  };

  const updateRoom = async (id, payload) => {
    await roomService.updateRoom(id, payload);
    await fetchRooms();
  };

  const deleteRoom = async (id) => {
    await roomService.deleteRoom(id);
    await fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    addRoom,
    updateRoom,
    deleteRoom,
  };
};

export default useRooms;
