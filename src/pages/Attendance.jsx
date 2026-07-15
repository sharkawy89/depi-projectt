import { useMemo } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import DataTable from '../components/DataTable/DataTable';
import StatusBadge from '../components/StatusBadge/StatusBadge';
import FilterDropdown from '../components/FilterDropdown/FilterDropdown';
import Pagination from '../components/Pagination/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import EmptyState from '../components/EmptyState/EmptyState';
import ErrorState from '../components/ErrorState/ErrorState';
import StatCard from '../components/StatCard/StatCard';
import { useAttendance } from '../hooks/useAttendance';
import '../styles/attendance.css';

const departmentOptions = [
  { value: 'All', label: 'All Departments' },
  { value: 'Science', label: 'Science' },
  { value: 'Commerce', label: 'Commerce' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Arts', label: 'Arts' },
  { value: 'English', label: 'English' },
  { value: 'Math', label: 'Math' },
];

const statusOptions = [
  { value: 'All', label: 'All Status' },
  { value: 'Present', label: 'Present' },
  { value: 'Absent', label: 'Absent' },
  { value: 'Late', label: 'Late' },
  { value: 'On Leave', label: 'On Leave' },
];

function Attendance() {
  const {
    records, total, page, totalPages, loading, error, params,
    updateParams, handleSort, handlePageChange, handleCheckIn,
    handleCheckOut, handleDelete, refresh,
  } = useAttendance();

  const summary = useMemo(() => {
    if (!records.length) return { total: 0, present: 0, absent: 0, rate: 0 };
    const present = records.filter((r) => r.status === 'Present').length;
    const absent = records.filter((r) => r.status === 'Absent').length;
    const presentable = records.filter((r) => r.status !== 'On Leave').length;
    const rate = presentable > 0 ? Math.round((present / presentable) * 100) : 0;
    return { total: records.length, present, absent, rate };
  }, [records]);

  const columns = useMemo(() => [
    { key: 'employeeId', label: 'Roll No', sortable: true },
    { key: 'name', label: 'Student Name', sortable: true },
    { key: 'department', label: 'Class', sortable: true },
    { key: 'timeIn', label: 'Check-in Time', sortable: true, render: (row) => row.timeIn || '--' },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="action-icons">
          {row.status === 'Absent' || row.status === 'On Leave' ? (
            <i
              className="bi bi-box-arrow-in-right icon-edit"
              title="Check In"
              onClick={() => handleCheckIn(row.employeeId)}
            ></i>
          ) : row.timeOut ? (
            <i className="bi bi-check-circle-fill text-success" title="Completed"></i>
          ) : (
            <i
              className="bi bi-box-arrow-right icon-view"
              title="Check Out"
              onClick={() => handleCheckOut(row.employeeId)}
            ></i>
          )}
          <i
            className="bi bi-trash-fill icon-delete"
            title="Delete"
            onClick={() => {
              if (window.confirm('Delete this attendance record?')) {
                handleDelete(row.id);
              }
            }}
          ></i>
        </div>
      ),
    },
  ], [handleCheckIn, handleCheckOut, handleDelete]);

  const handleExport = () => {
    const csvRows = [
      ['Roll No', 'Name', 'Class', 'Date', 'Time In', 'Time Out', 'Status', 'Hours', 'Overtime', 'Late (min)'],
      ...records.map((r) => [r.employeeId, r.name, r.department, r.date, r.timeIn || '--', r.timeOut || '--', r.status, r.workingHours, r.overtime, r.lateMinutes]),
    ];
    const csv = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container attendance-page">
      <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-subtitle" style={{ marginTop: 4 }}>Track and manage student attendance</p>
        </div>
        <button className="btn btn-primary add-btn" onClick={handleExport}>
          <i className="bi bi-download me-1"></i>
          Export CSV
        </button>
      </div>

      {!loading && !error && records.length > 0 && (
        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-people-fill" label="Total Students" value={summary.total} color="#2563eb" horizontal />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-check-circle-fill" label="Present" value={summary.present} color="#10b981" horizontal />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-x-circle-fill" label="Absent" value={summary.absent} color="#ef4444" horizontal />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-graph-up-arrow" label="Attendance Rate" value={`${summary.rate}%`} color="#8b5cf6" horizontal />
          </div>
        </div>
      )}

      <div className="content-card">
        <div className="attendance-filters">
          <div className="filter-item" style={{ flex: 1, minWidth: 200 }}>
            <SearchBar
              placeholder="Search by name or ID..."
              value={params.search}
              onChange={(val) => updateParams({ search: val })}
              buttonText=""
              onButtonClick={() => {}}
            />
          </div>
          <div className="filter-item">
            <label className="filter-label">Class</label>
            <FilterDropdown
              label=""
              value={params.department}
              options={departmentOptions}
              onChange={(val) => updateParams({ department: val })}
            />
          </div>
          <div className="filter-item">
            <label className="filter-label">Status</label>
            <FilterDropdown
              label=""
              value={params.status}
              options={statusOptions}
              onChange={(val) => updateParams({ status: val })}
            />
          </div>
          <div className="filter-item">
            <label className="filter-label">Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={params.date}
              onChange={(e) => updateParams({ date: e.target.value })}
            />
          </div>
        </div>

        {error ? (
          <ErrorState message={error} onRetry={refresh} />
        ) : loading ? (
          <LoadingSkeleton type="table" count={columns.length} />
        ) : records.length === 0 ? (
          <EmptyState
            icon="bi-journal-text"
            title="No attendance records"
            message="No records match your current filters. Try adjusting your search criteria."
          />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={records}
              sortBy={params.sortBy}
              sortOrder={params.sortOrder}
              onSort={handleSort}
              emptyMessage="No attendance records found."
            />
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
              <small className="text-muted">
                Showing {records.length} of {total} records
              </small>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Attendance;
