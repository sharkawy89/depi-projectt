// Simple top bar that is only visible on small screens.
// It just holds the hamburger button that opens the sidebar drawer.
function Header({ onMenuClick }) {
  return (
    <div className="mobile-header d-lg-none">
      <button className="hamburger-btn" onClick={onMenuClick}>
        <i className="bi bi-list"></i>
      </button>
    </div>
  );
}

export default Header;
