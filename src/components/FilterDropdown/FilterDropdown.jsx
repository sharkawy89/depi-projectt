function FilterDropdown({ label, value, options, onChange }) {
  return (
    <div className="filter-dropdown">
      {label && <label className="filter-dropdown-label">{label}</label>}
      <select
        className="form-select form-select-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;
