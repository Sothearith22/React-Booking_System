import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../constants/apiEndpoints';

const res = (response) => response.data?.data ?? response.data ?? [];

export const serviceService = {
  async getAll() {
    const response = await apiClient.get(API_ENDPOINTS.services.list);
    return res(response);
  
  },
  async createService() {
    const response = await apiClient.post('/admin/service');
    return res(response);
  }
  async updateService() {
    const response = await apiClient.patch('/admin/service');
    return res(response);
  }
  async delteService(){
    const res = await apiClient.delete();
    return res (res);
  }
};
