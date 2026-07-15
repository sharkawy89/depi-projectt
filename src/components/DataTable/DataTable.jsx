function DataTable({ columns, data, onSort, sortBy, sortOrder, emptyMessage }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.sortable ? { cursor: 'pointer' } : undefined}
                onClick={() => {
                  if (col.sortable && onSort) {
                    const order = sortBy === col.key && sortOrder === 'asc' ? 'desc' : 'asc';
                    onSort(col.key, order);
                  }
                }}
              >
                {col.label}
                {col.sortable && sortBy === col.key && (
                  <i className={`bi ${sortOrder === 'asc' ? 'bi-sort-up' : 'bi-sort-down'} ms-1`}></i>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-muted py-4">
                {emptyMessage || 'No data found.'}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
