import { useEffect, useState } from 'react';
import { dashboardService } from '../services/dashboard.service';

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const [overview, bookings, chart, activity] = await Promise.all([
          dashboardService.getOverview(),
          dashboardService.getRecentBookings(),
          dashboardService.getRevenueChart(),
          dashboardService.getActivities(),
        ]);

        setStats(overview.data);
        setRecentBookings(bookings.data);
        setChartData(chart.data);
        setActivities(activity.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return {
    loading,
    stats,
    recentBookings,
    activities,
    chartData,
  };
}
