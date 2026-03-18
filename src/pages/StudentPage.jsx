import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useStudents } from "../hooks/useDatabase";
import Footer from "../components/Footer";
import "../pages/pagesStyles/Dashboard.css";

export default function StudentPage({ onLogout }) {
  const { students, loading, error } = useStudents();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="dashboard-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#ff6b35' }}>Loading students...</p>
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
          <Navbar onLogout={ onLogout }/>
          <div className="dashboard-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#ff6b35' }}>Error loading students</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar onLogout={onLogout}/>

        <div className="dashboard-main">
          {/* Header */}
          <div className="dashboard-header">
            <h1>Student Management</h1>
            <p>View and manage all students in the system</p>
          </div>

          {/* Search and Filter */}
          <div className="quick-actions" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ color: '#666', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                  Search Student
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#666', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Graduated</option>
                  <option>Dropped</option>
                </select>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="dept-overview">
            <h4>All Students ({filteredStudents.length})</h4>
            <div className="table-responsive">
              <table className="table table-hover dept-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Email</th>
                    <th>Program</th>
                    <th>Year Level</th>
                    <th>GPA</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, idx) => (
                    <tr key={idx}>
                      <td className="dept-cell-dept">{student.firstName} {student.lastName}</td>
                      <td className="dept-cell-data">{student.studentId || 'N/A'}</td>
                      <td className="dept-cell-data">{student.email || 'N/A'}</td>
                      <td className="dept-cell-data">{student.programName || 'N/A'}</td>
                      <td className="dept-cell-data">{student.yearLevel || 'N/A'}</td>
                      <td className="dept-cell-data" style={{ fontWeight: '600', color: '#ff6b35' }}>{student.gpa || 'N/A'}</td>
                      <td>
                        <span className="status-badge">{student.status || 'Active'}</span>
                      </td>
                      <td>
                        <Link
                          to={`/students/${student.id}`}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: '#ff6b35',
                            color: 'white',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            display: 'inline-block'
                          }}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}