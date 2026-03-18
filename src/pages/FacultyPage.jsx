import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useFaculty } from "../hooks/useDatabase";
import Footer from "../components/Footer";
import "../pages/pagesStyles/Dashboard.css";

export default function FacultyPage( {onLogout} ) {
  const { faculty, loading, error } = useFaculty();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = faculty.filter(fac => {
    return `${fac.firstName} ${fac.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar onLogout= {onLogout} />
          <div className="dashboard-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#ff6b35' }}>Loading faculty...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar onLogout={onLogout}/>
          <div className="dashboard-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#ff6b35' }}>Error loading faculty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar onLogout={onLogout} />

        <div className="dashboard-main">
          {/* Header */}
          <div className="dashboard-header">
            <h1>Faculty Directory</h1>
            <p>Manage all faculty members and their information</p>
          </div>

          {/* Search */}
          <div className="quick-actions" style={{ marginBottom: '2rem' }}>
            <label style={{ color: '#666', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
              Search Faculty
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '0.7rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Faculty Table */}
          <div className="dept-overview">
            <h4>Faculty Members ({filteredFaculty.length})</h4>
            <div className="table-responsive">
              <table className="table table-hover dept-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Employment Type</th>
                    <th>Monthly Income</th>
                    <th>Employment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFaculty.map((fac, idx) => (
                    <tr key={idx}>
                      <td className="dept-cell-dept">{fac.firstName} {fac.lastName}</td>
                      <td className="dept-cell-data">{fac.position || 'N/A'}</td>
                      <td className="dept-cell-data">{fac.department || 'N/A'}</td>
                      <td className="dept-cell-data">{fac.email || 'N/A'}</td>
                      <td className="dept-cell-data">{fac.mobileNumber || 'N/A'}</td>
                      <td className="dept-cell-data">{fac.employmentType || 'N/A'}</td>
                      <td className="dept-cell-data" style={{ fontWeight: '600', color: '#ff6b35' }}>
                        ₱{fac.monthlyIncome || '0'}
                      </td>
                      <td className="dept-cell-data">
                        {fac.employmentDate ? new Date(fac.employmentDate).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Faculty Statistics */}
          <div className="stats-row" style={{ marginTop: '2rem' }}>
            <div className="stat-card">
              <div className="stat-card-backdrop stat-card-backdrop-orange-1"></div>
              <div className="stat-card-content">
                <h6 className="stat-card-label">Total Faculty</h6>
                <h2 className="stat-card-value">{faculty.length}</h2>
                <p className="stat-card-trend">Active members</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-backdrop stat-card-backdrop-orange-2"></div>
              <div className="stat-card-content">
                <h6 className="stat-card-label">Average Monthly Income</h6>
                <h2 className="stat-card-value">
                  ₱{faculty.length > 0 ? Math.round(faculty.reduce((sum, f) => sum + (f.monthlyIncome || 0), 0) / faculty.length) : 0}
                </h2>
                <p className="stat-card-trend">Per faculty member</p>
              </div>
            </div>
          </div>
        </div>
               <Footer />
      </div>
    </div>
  );
}