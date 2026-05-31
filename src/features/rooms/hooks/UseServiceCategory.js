import { useCallback, useEffect, useState } from 'react';
import { categoryService } from '../../category/service/category.service';

const getCategoryList = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.categories)) {
    return response.categories;
  }

  if (Array.isArray(response?.service_categories)) {
    return response.service_categories;
  }

  if (Array.isArray(response?.room_categories)) {
    return response.room_categories;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
};

const normalizeCategory = (category, index) => {
  const id = category.id ?? category.category_id ?? category.uuid ?? index;
  const rooms = category.rooms_count ?? category.room_count ?? category.rooms ?? 0;
  const status = category.status || (category.is_active === false ? 'inactive' : 'active');

  return {
    ...category,
    id,
    name: category.name || category.category_name || category.title || `Category ${id}`,
    desc: category.description || category.desc || category.details || 'No description available.',
    rooms: Array.isArray(rooms) ? rooms.length : rooms,
    status: String(status).toLowerCase(),
  };
};

export const useServiceCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await categoryService.getCategories();
      setCategories(getCategoryList(response).map(normalizeCategory));
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
      setError(err?.response?.data?.message || 'Unable to load categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, setCategories, loading, error, setError, refetch: fetchCategories };
};
