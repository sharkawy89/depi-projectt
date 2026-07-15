import { useState, useEffect, useCallback } from 'react';
import {
  getDashboardSummary,
  getAttendanceStatistics,
  getDepartmentStatistics,
  getRecentAttendance,
  getNotifications,
  getUpcomingHolidays,
} from '../services/dashboardApi';

export function useDashboard() {
  const [summary, setSummary] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [departmentStats, setDepartmentStats] = useState(null);
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, as, ds, ra, n, h] = await Promise.all([
        getDashboardSummary(),
        getAttendanceStatistics(),
        getDepartmentStatistics(),
        getRecentAttendance(),
        getNotifications(),
        getUpcomingHolidays(),
      ]);
      setSummary(s);
      setAttendanceStats(as);
      setDepartmentStats(ds);
      setRecentAttendance(ra);
      setNotifications(n);
      setHolidays(h);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    summary,
    attendanceStats,
    departmentStats,
    recentAttendance,
    notifications,
    holidays,
    loading,
    error,
    refresh: fetchAll,
  };
}
