function StatusBadge({ status }) {
  const map = {
    Present: 'badge-active',
    Absent: 'badge-inactive',
    Late: 'badge-warning',
    'On Leave': 'badge-info',
    Active: 'badge-active',
    Inactive: 'badge-inactive',
  };

  return (
    <span className={`status-badge ${map[status] || 'badge-inactive'}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
