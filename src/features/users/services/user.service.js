import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../constants/apiEndpoints';

const getUserList = (payload) => {
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.users)) return payload.users;
  if (Array.isArray(payload)) return payload;
  return [];
};

const getUserRecord = (payload) => payload?.data?.data ?? payload?.data ?? payload;

export const userService = {
  async getAll() {
    const res = await apiClient.get(API_ENDPOINTS.users.list);
    return getUserList(res.data);
  },

  async create(payload) {
    const res = await apiClient.post(API_ENDPOINTS.users.list, payload);
    return getUserRecord(res.data);
  },

  async getUser(id) {
    const res = await apiClient.get(API_ENDPOINTS.users.detail(id));
    return getUserRecord(res.data);
  },

  async updateUser(id, payload) {
    const res = await apiClient.put(API_ENDPOINTS.users.detail(id), payload);
    return getUserRecord(res.data);
  },

  async remove(id) {
    return apiClient.delete(API_ENDPOINTS.users.detail(id));
  },
};
