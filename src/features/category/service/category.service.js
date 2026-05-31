import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../constants/apiEndpoints';


const unwrapResponse = (response) => response.data?.data ?? response.data;
export const categoryService = {
  async getCategories(params = {}) {
    const response = await apiClient.get(API_ENDPOINTS.services.list, { params });
    return unwrapResponse(response);
  },

  async addCategory(payload) {
    const response = await apiClient.post(API_ENDPOINTS.services.list, payload);
    return unwrapResponse(response);
  },

  async updateCategory(id, payload) {
    const response = await apiClient.patch(API_ENDPOINTS.services.detail(id), payload);
    return unwrapResponse(response);
  },

  async deleteCategory(id) {
    const response = await apiClient.delete(API_ENDPOINTS.services.detail(id));
    return unwrapResponse(response);
  },
};
