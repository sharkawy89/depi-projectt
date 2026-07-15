function LoadingSkeleton({ type = 'card', count = 1 }) {
  if (type === 'table') {
    return (
      <div className="table-responsive">
        <table className="table align-middle data-table">
          <thead>
            <tr>
              {Array.from({ length: count > 1 ? count : 6 }).map((_, i) => (
                <th key={i}>
                  <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: count > 1 ? count : 6 }).map((_, c) => (
                  <td key={c}>
                    <div className="skeleton skeleton-text"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="row g-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="col-6 col-lg-3">
            <div className="stat-card">
              <div className="skeleton skeleton-circle mb-2" style={{ width: 40, height: 40 }}></div>
              <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
              <div className="skeleton skeleton-text mt-2" style={{ width: '30%' }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-wrapper">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-line">
          <div className="skeleton skeleton-text" style={{ width: `${40 + Math.random() * 40}%` }}></div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
