import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "bi-grid-1x2-fill" },
  { name: "Students", path: "/students", icon: "bi-people-fill" },
  { name: "Courses", path: "/courses", icon: "bi-journal-bookmark-fill" },
  { name: "Attendance", path: "/attendance", icon: "bi-calendar-check-fill" },
  { name: "Teachers", path: "/teachers", icon: "bi-mortarboard-fill" },
  { name: "Settings", path: "/settings", icon: "bi-gear-fill" },
];

// isOpen / onClose are only used on mobile to show/hide the sidebar as a drawer
function Sidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {/* dark overlay behind the drawer, only shown on mobile when open */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <i className="bi bi-mortarboard-fill"></i>
          </div>
          <div className="brand-text">
            <h6>EduManage</h6>
            <small>Student Management</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                isActive && item.path !== "#"
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-logout">
          <button
            className="sidebar-link logout-btn"
            onClick={() => { onLogout(); onClose(); }}
          >
            <i className="bi bi-box-arrow-left"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
