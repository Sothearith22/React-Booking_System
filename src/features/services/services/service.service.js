import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../constants/apiEndpoints';

const unwrapResponse = (response) => response.data?.data ?? response.data ?? [];

export const serviceService = {
  async getAll() {
    const response = await apiClient.get(API_ENDPOINTS.services.list);
    return unwrapResponse(response);
  },
};
