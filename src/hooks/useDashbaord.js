import { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [
        overview,
        bookings,
        chart,
        activity
      ] = await Promise.all([
        dashboardService.getOverview(),
        dashboardService.getRecentBookings(),
        dashboardService.getRevenueChart(),
        dashboardService.getActivities(),
      ]);

      setStats(overview.data);
      setRecentBookings(bookings.data);
      setChartData(chart.data);
      setActivities(activity.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    stats,
    recentBookings,
    activities,
    chartData,
  };
};