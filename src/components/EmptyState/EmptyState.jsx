function EmptyState({ icon, title, message }) {
  return (
    <div className="empty-state">
      <i className={`bi ${icon || 'bi-inbox'} empty-state-icon`}></i>
      <h5 className="empty-state-title">{title || 'No data found'}</h5>
      <p className="empty-state-message">{message || 'There are no records to display at the moment.'}</p>
    </div>
  );
}

export default EmptyState;
