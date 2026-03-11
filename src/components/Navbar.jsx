import "../components/componentStyles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar-main">
      <div className="navbar-content">
        {/* Title Section */}
        <div className="navbar-title">
          <h5>CCS - COMPREHENSIVE PROFILING SYSTEM haha</h5>
          <p>Student Academic Management Platform</p>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          {/* Search Bar */}
          <div className="navbar-search d-none d-md-flex">
            <input
              type="text"
              placeholder="Search..."
            />
          </div>

          {/* Icon Buttons */}
          <button className="navbar-icon-btn">
            <i className="bi bi-bell"></i>
            <span className="navbar-notification-dot"></span>
          </button>

          <button className="navbar-icon-btn">
            <i className="bi bi-gear"></i>
          </button>

          {/* Divider */}
          <div className="navbar-divider"></div>

          {/* Profile Section */}
          <div className="navbar-profile">
            <div className="navbar-profile-info d-none d-sm-block">
              <p className="navbar-profile-name">Admin</p>
              <p className="navbar-profile-role">Administrator</p>
            </div>
            <img
              src="https://i.pravatar.cc/40"
              className="navbar-profile-avatar"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}