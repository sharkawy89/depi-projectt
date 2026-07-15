import { useState, useEffect, useCallback } from 'react';
import { getAttendance, checkIn, checkOut, updateAttendance, deleteAttendance, createAttendance } from '../services/attendanceApi';

export function useAttendance(initialParams = {}) {
  const [data, setData] = useState({ records: [], total: 0, page: 1, totalPages: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    search: '',
    department: 'All',
    status: 'All',
    date: '',
    page: 1,
    limit: 10,
    sortBy: '',
    sortOrder: '',
    ...initialParams,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAttendance(params);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load attendance records.');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = useCallback((updates) => {
    setParams((prev) => ({ ...prev, ...updates, page: updates.page !== undefined ? updates.page : (updates.search !== undefined || updates.department !== undefined || updates.status !== undefined || updates.date !== undefined ? 1 : prev.page) }));
  }, []);

  const handleSort = useCallback((key, order) => {
    setParams((prev) => ({ ...prev, sortBy: key, sortOrder: order, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const handleCheckIn = useCallback(async (employeeId) => {
    await checkIn(employeeId);
    await fetchData();
  }, [fetchData]);

  const handleCheckOut = useCallback(async (employeeId) => {
    await checkOut(employeeId);
    await fetchData();
  }, [fetchData]);

  const handleUpdate = useCallback(async (id, updates) => {
    await updateAttendance(id, updates);
    await fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (id) => {
    await deleteAttendance(id);
    await fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(async (record) => {
    await createAttendance(record);
    await fetchData();
  }, [fetchData]);

  return {
    records: data.records,
    total: data.total,
    page: data.page,
    totalPages: data.totalPages,
    limit: data.limit,
    loading,
    error,
    params,
    updateParams,
    handleSort,
    handlePageChange,
    handleCheckIn,
    handleCheckOut,
    handleUpdate,
    handleDelete,
    handleCreate,
    refresh: fetchData,
  };
}
