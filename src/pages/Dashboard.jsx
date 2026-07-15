import { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import StatCard from '../components/StatCard/StatCard';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import ErrorState from '../components/ErrorState/ErrorState';
import { useDashboard } from '../hooks/useDashboard';
import '../styles/dashboard.css';

const PIE_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const chartTooltipStyle = {
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  fontSize: 13,
};

function Dashboard() {
  const { summary, attendanceStats, departmentStats, loading, error, refresh } = useDashboard();

  const statCards = useMemo(() => {
    if (!summary) return [];
    return [
      { icon: 'bi-people-fill', label: 'Total Students', value: summary.totalStudents, trend: 5.2, trendText: 'from last month', color: '#2563eb' },
      { icon: 'bi-mortarboard-fill', label: 'Total Teachers', value: summary.totalTeachers, trend: 2, trendText: 'from last month', color: '#8b5cf6' },
      { icon: 'bi-journal-bookmark-fill', label: 'Active Courses', value: summary.activeCourses, trend: 3, trendText: 'from last semester', color: '#10b981' },
      { icon: 'bi-graph-up-arrow', label: 'Attendance Rate', value: `${summary.attendanceRate}%`, trend: 1.8, trendText: 'from last week', color: '#2563eb' },
      { icon: 'bi-check-circle-fill', label: 'Present Today', value: summary.presentToday, color: '#10b981' },
      { icon: 'bi-x-circle-fill', label: 'Absent Today', value: summary.absentToday, color: '#ef4444' },
    ];
  }, [summary]);

  if (error) {
    return (
      <div className="page-container">
        <h1 className="page-title">Dashboard</h1>
        <ErrorState message={error} onRetry={refresh} />
      </div>
    );
  }

  return (
    <div className="page-container dashboard-page">
      <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle" style={{ marginTop: 4 }}>Overview of your educational system</p>
        </div>
        <button className="btn btn-primary add-btn" onClick={refresh} disabled={loading}>
          <i className={`bi ${loading ? 'bi-arrow-clockwise spin' : 'bi-arrow-clockwise'}`}></i>
          Refresh
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton type="card" count={6} />
      ) : (
        <div className="row g-3 mb-4">
          {statCards.map((card, i) => (
            <div key={i} className={i < 4 ? 'col-6 col-lg-3' : 'col-6 col-lg-3 col-xl-2'}>
              <StatCard {...card} horizontal />
            </div>
          ))}
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-7">
          <div className="content-card chart-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="chart-title">Attendance Trend</h6>
              <span className="text-muted small">This week</span>
            </div>
            {loading ? (
              <LoadingSkeleton type="card" count={1} />
            ) : (
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={attendanceStats?.attendanceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} name="Present" />
                  <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444' }} name="Absent" />
                  <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} name="Late" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="content-card chart-card h-100">
            <h6 className="chart-title mb-3">Students by Department</h6>
            {loading ? (
              <LoadingSkeleton type="card" count={1} />
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: 360 }}>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={departmentStats?.studentDistribution || []}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={55}
                      paddingAngle={3}
                    >
                      {(departmentStats?.studentDistribution || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={chartTooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-legend">
                  {(departmentStats?.studentDistribution || []).map((item, index) => (
                    <div key={item.category} className="pie-legend-item">
                      <span className="pie-legend-dot" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                      <span className="pie-legend-label">{item.category}</span>
                      <span className="pie-legend-value">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-7">
          <div className="content-card chart-card">
            <h6 className="chart-title mb-3">Department Attendance</h6>
            {loading ? (
              <LoadingSkeleton type="card" count={1} />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentStats?.departmentAttendance || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="department" type="category" tick={{ fontSize: 12, fill: '#6b7280' }} width={90} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  <Bar dataKey="present" fill="#10b981" radius={[0, 4, 4, 0]} name="Present" />
                  <Bar dataKey="total" fill="#e5e7eb" radius={[0, 4, 4, 0]} name="Total" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="content-card chart-card mb-3">
            <h6 className="chart-title mb-3">Today's Summary</h6>
            {loading ? (
              <LoadingSkeleton type="card" count={1} />
            ) : (
              <div className="today-summary">
                <div className="summary-row">
                  <span className="summary-label"><i className="bi bi-check-circle-fill text-success me-2"></i>Present</span>
                  <span className="summary-value fw-bold">{summary?.presentToday ?? 0}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label"><i className="bi bi-x-circle-fill text-danger me-2"></i>Absent</span>
                  <span className="summary-value fw-bold">{summary?.absentToday ?? 0}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label"><i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>Late</span>
                  <span className="summary-value fw-bold">{summary?.lateToday ?? 0}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label"><i className="bi bi-calendar-x-fill text-purple me-2"></i>On Leave</span>
                  <span className="summary-value fw-bold">{summary?.onLeave ?? 0}</span>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>


    </div>
  );
}

export default Dashboard;
