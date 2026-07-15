function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <i className="bi bi-exclamation-triangle-fill error-state-icon"></i>
      <h5 className="error-state-title">Something went wrong</h5>
      <p className="error-state-message">{message || 'An unexpected error occurred. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn-primary btn-sm mt-2" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-1"></i>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
