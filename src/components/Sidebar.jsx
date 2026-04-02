import { Link, useLocation } from "react-router-dom";
import "../components/componentStyles/Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: "bi-speedometer2" },
    { path: "/students", label: "Students", icon: "bi-people-fill" },
    { path: "/faculty", label: "Faculty", icon: "bi-person-badge-fill" },
    {
      path: "/academic-history",
      label: "Academic History",
      icon: "bi-journal-text",
    },
    { path: "/non-academic", label: "Non-Academic", icon: "bi-award-fill" },
    {
      path: "/violations",
      label: "Violations",
      icon: "bi-exclamation-triangle-fill",
    },
    { path: "/skills", label: "Skills", icon: "bi-lightbulb-fill" },
    { path: "/affiliation", label: "Affiliation", icon: "bi-diagram-3-fill" },
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <h4>
          <i className="bi bi-mortarboard-fill"></i>
          CCS Profiling System
        </h4>
      </div>

      {/* Navigation Links */}
      <ul className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path} className="sidebar-nav-item">
              <Link
                to={item.path}
                className={`sidebar-nav-link ${isActive ? "active" : ""}`}
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
                {isActive && <div className="sidebar-nav-indicator"></div>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>CCS Profiling System v1.0</p>
        <p>© 2024</p>
      </div>
    </div>
  );
}
