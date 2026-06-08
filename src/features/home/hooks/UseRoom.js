import { useState, useEffect } from 'react';
import { categoryService } from '../services/Category.service';
import { extractData , mergeCategoryRooms } from '../utils/category.util';
import { setRooms } from '../../rooms/store/roomSlice';

export const useRoom = () => {
  const [Room, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoom = async () => {
    try {
      setLoading(true);

      const [servicesResponse, roomsResponse] = await Promise.all([
        categoryService.getAll(),
        categoryService.getRooms(),
      ]);

      setRooms(mergeCategoryRooms(servicesResponse, roomsResponse));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
};
