import { useMemo } from 'react';

export function useRoomStats(rooms = []) {
  return useMemo(() => {
    const total = rooms.length;

    const available = rooms.filter(r => r.status === 'available').length;

    const booked = rooms.filter(
      r => r.status === 'booked' || r.status === 'occupied'
    ).length;

    const maintenance = rooms.filter(
      r => r.status === 'maintenance'
    ).length;

    return { total, available, booked, maintenance };
  }, [rooms]);
}