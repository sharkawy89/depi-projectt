// Reusable search box + "Add" button row used on both pages
function SearchBar({ placeholder, value, onChange, buttonText, onButtonClick }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
      <div className="search-box">
        <i className="bi bi-search"></i>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <button className="btn btn-primary add-btn" onClick={onButtonClick}>
        <i className="bi bi-plus-lg"></i>
        {buttonText}
      </button>
    </div>
  );
}

export default SearchBar;
