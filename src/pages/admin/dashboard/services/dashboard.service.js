import apiClient from '../../../../services/apiClient';
import { API_ENDPOINTS } from '../../../../constants/apiEndpoints';

export const dashboardService = {
  getOverview: () => apiClient.get(API_ENDPOINTS.dashboard.overview),
  getRecentBookings: () => apiClient.get(API_ENDPOINTS.dashboard.recentBookings),
  getRevenueChart: () => apiClient.get(API_ENDPOINTS.dashboard.revenueChart),
  getActivities: () => apiClient.get(API_ENDPOINTS.dashboard.activities),
};
