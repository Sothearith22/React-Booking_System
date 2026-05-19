import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const authService = {
  login: (credentials) => apiClient.post(API_ENDPOINTS.auth.login, credentials),
  register: (data) => apiClient.post(API_ENDPOINTS.auth.register, data),
  me: () => apiClient.get(API_ENDPOINTS.auth.me),
  refresh: () => apiClient.post(API_ENDPOINTS.auth.refresh),
  logout: () => apiClient.post(API_ENDPOINTS.auth.logout),
};
