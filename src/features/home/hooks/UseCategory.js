import { useState, useEffect } from 'react';
import { categoryService } from '../services/Category.service';
import { extractData , mergeCategoryRooms } from '../utils/category.util';

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const [servicesResponse, roomsResponse] = await Promise.all([
        categoryService.getAll(),
        categoryService.getRooms(),
      ]);

      setCategories(mergeCategoryRooms(servicesResponse, roomsResponse));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
};
