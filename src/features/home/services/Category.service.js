import apiClient from '../../../services/apiClient';

export const categoryService = {
  async getAll() {
    const response = await apiClient.get(`/v1/services`);
    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/v1/services/${id}`);
    return response.data;
  },

  async getRooms(params = {}) {
    const response = await apiClient.get(`/v1/rooms`, { params });
    return response.data;
  },

};
