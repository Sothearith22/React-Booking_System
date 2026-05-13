import React from 'react'
import api from './api';

export const dashboardService = {
  getOverview: () => api.get('/dashboard/overview'),
  getRecentBookings: () => api.get('/dashboard/recent-bookings'),
  getRevenueChart: () => api.get('/dashboard/revenue-chart'),
  getActivities: () => api.get('/dashboard/activity'),
};