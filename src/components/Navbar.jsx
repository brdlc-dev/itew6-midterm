import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../components/componentStyles/Navbar.css";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("authToken");

    // Call parent logout handler
    if (onLogout) {
      onLogout();
    }

    // Redirect to login
    navigate("/login");
  };

  return (
    <nav className="navbar-main">
      <div className="navbar-content">
        {/* Title Section */}
        <div className="navbar-title">
          <h5>CCS - COMPREHENSIVE PROFILING SYSTEM</h5>
          <p>Student Academic Management Platform</p>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          {/* Divider */}
          <div className="navbar-divider"></div>

          {/* Profile Section */}
          <div className="navbar-profile">
            <div className="navbar-profile-info d-none d-sm-block">
              <p className="navbar-profile-name">Admin</p>
              <p className="navbar-profile-role">Administrator</p>
            </div>

            {/* Profile Avatar with Dropdown */}
            <div className="navbar-profile-dropdown">
              <button
                className="navbar-profile-avatar-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title="Profile Menu"
              >
                <img
                  src="https://i.pravatar.cc/40"
                  className="navbar-profile-avatar"
                  alt="Profile"
                />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="profile-dropdown-menu">
                  <div className="dropdown-header">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="Profile"
                      className="dropdown-avatar"
                    />
                    <div className="dropdown-user-info">
                      <p className="dropdown-name">Admin User</p>
                      <p className="dropdown-email">admin@eduprofile.com</p>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <a href="#" className="dropdown-item">
                    <i className="bi bi-person-circle"></i>
                    <span>My Profile</span>
                  </a>

                  <a href="#" className="dropdown-item">
                    <i className="bi bi-gear"></i>
                    <span>Settings</span>
                  </a>

                  <a href="#" className="dropdown-item">
                    <i className="bi bi-question-circle"></i>
                    <span>Help & Support</span>
                  </a>

                  <div className="dropdown-divider"></div>

                  <button
                    onClick={handleLogout}
                    className="dropdown-item dropdown-logout"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
