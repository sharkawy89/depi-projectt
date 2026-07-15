import { useMemo } from 'react';
import DataTable from '../components/DataTable/DataTable';
import StatCard from '../components/StatCard/StatCard';
import EmptyState from '../components/EmptyState/EmptyState';
import financeRecords from '../data/finance';
import '../styles/finance.css';

function Finance() {
  const stats = useMemo(() => {
    const totalFees = financeRecords.reduce((s, r) => s + r.feeAmount, 0);
    const totalPaid = financeRecords.reduce((s, r) => s + r.paidAmount, 0);
    const pending = financeRecords.filter(r => r.status === 'Pending').length;
    const overdue = financeRecords.filter(r => r.status === 'Overdue').length;
    const collectionRate = totalFees > 0 ? ((totalPaid / totalFees) * 100).toFixed(1) : 0;
    return {
      totalFees,
      totalPaid,
      totalDue: totalFees - totalPaid,
      pending,
      overdue,
      collectionRate: parseFloat(collectionRate),
    };
  }, []);

  const columns = [
    { key: 'studentId', label: 'Roll No' },
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'course', label: 'Course', sortable: true },
    {
      key: 'feeAmount', label: 'Fee ($)', sortable: true,
      render: (row) => `$${row.feeAmount.toLocaleString()}`,
    },
    {
      key: 'paidAmount', label: 'Paid ($)', sortable: true,
      render: (row) => `$${row.paidAmount.toLocaleString()}`,
    },
    { key: 'dueDate', label: 'Due Date' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`status-badge ${
          row.status === 'Paid' ? 'badge-active' :
          row.status === 'Pending' ? 'badge-warning' : 'badge-inactive'
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      label: 'Payment',
      render: (row) => row.paymentMethod || '--',
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Finance</h1>
      <p className="page-subtitle">Manage student fees and payments</p>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-cash-coin" label="Total Fees" value={`$${stats.totalFees.toLocaleString()}`} color="#2563eb" horizontal />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-check-circle-fill" label="Collected" value={`$${stats.totalPaid.toLocaleString()}`} color="#10b981" horizontal />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-exclamation-triangle-fill" label="Outstanding" value={`$${stats.totalDue.toLocaleString()}`} color="#f59e0b" horizontal />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-graph-up-arrow" label="Collection Rate" value={`${stats.collectionRate}%`} color="#8b5cf6" horizontal />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Pending Payments</p>
            <h3 className="stat-value" style={{ color: '#f59e0b' }}>{stats.pending}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Overdue Payments</p>
            <h3 className="stat-value" style={{ color: '#ef4444' }}>{stats.overdue}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Total Records</p>
            <h3 className="stat-value">{financeRecords.length}</h3>
          </div>
        </div>
      </div>

      <div className="content-card">
        {financeRecords.length === 0 ? (
          <EmptyState
            icon="bi-cash-coin"
            title="No records"
            message="No financial records available."
          />
        ) : (
          <DataTable columns={columns} data={financeRecords} emptyMessage="No records found." />
        )}
      </div>
    </div>
  );
}

export default Finance;
