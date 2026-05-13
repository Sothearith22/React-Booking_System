import api from './axios';

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentBookings: () => api.get('/dashboard/recent-bookings'),
  getRevenueData: () => api.get('/dashboard/revenue-data'),
  getOccupancyData: () => api.get('/dashboard/occupancy-data'),
  getUpcomingVisitors: () => api.get('/dashboard/upcoming-visitors'),
};

export default dashboardService;
