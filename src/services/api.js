import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { authService } from './auth.service';

const withUnwrappedData = (response) => ({
  ...response,
  data: response.data?.data ?? response.data ?? [],
});

export const adminService = {
  getUsers: () => apiClient.get(API_ENDPOINTS.users.list),
  createUser: (data) => apiClient.post(API_ENDPOINTS.users.list, data),
  getUser: (id) => apiClient.get(API_ENDPOINTS.users.detail(id)),
  updateUser: (id, data) => apiClient.put(API_ENDPOINTS.users.detail(id), data),
  deleteUser: (id) => apiClient.delete(API_ENDPOINTS.users.detail(id)),

  getBookings: () => apiClient.get(API_ENDPOINTS.bookings.list).then(withUnwrappedData),
  updateBookingStatus: (id, status) => apiClient.put(API_ENDPOINTS.bookings.detail(id), { status }),
};

export default {
  auth: authService,
  admin: adminService,
};
