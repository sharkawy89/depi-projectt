function StatCard({ icon, label, value, trend, color, horizontal, trendText, subtitle }) {
  if (horizontal) {
    return (
      <div className="stat-card stat-card-horizontal">
        <div className="stat-card-icon" style={{ backgroundColor: color ? `${color}15` : undefined }}>
          <i className={`bi ${icon}`} style={{ color: color || '#2563eb' }}></i>
        </div>
        <div className="stat-card-body">
          <p className="stat-label">{label}</p>
          <h3 className="stat-value">{value}</h3>
          {subtitle && <p className="stat-subtitle">{subtitle}</p>}
          {trend !== undefined && (
            <span className={`stat-trend ${trend >= 0 ? 'trend-up' : 'trend-down'}`}>
              <i className={`bi ${trend >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
              {Math.abs(trend)}% {trendText || ''}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ backgroundColor: color ? `${color}15` : undefined }}>
        <i className={`bi ${icon}`} style={{ color: color || '#2563eb' }}></i>
      </div>
      <div className="stat-card-body">
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        {trend !== undefined && (
          <span className={`stat-trend ${trend >= 0 ? 'trend-up' : 'trend-down'}`}>
            <i className={`bi ${trend >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
            {Math.abs(trend)}% {trendText || ''}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
