import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useStudents } from "../hooks/useDatabase";
import Footer from "../components/Footer";
import AddStudentForm from "../components/AddStudentForm";
import "../pages/pagesStyles/Dashboard.css";

export default function StudentPage({ onLogout }) {
  const { students, loading, error, addStudent, updateStudent, deleteStudent } =
    useStudents();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (studentId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this student? This action cannot be undone.",
      )
    ) {
      deleteStudent(studentId);
      alert("Student deleted successfully");
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div
            className="dashboard-main"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "1.2rem", color: "#ff6b35" }}>
              Loading students...
            </p>
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
          <Navbar onLogout={onLogout} />
          <div
            className="dashboard-main"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "1.2rem", color: "#ff6b35" }}>
              Error loading students
            </p>
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
            <h1>Student Management</h1>
            <p>View and manage all students in the system</p>
          </div>

          {/* Action Buttons */}
          <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={() => {
                setEditingStudent(null);
                setShowForm(true);
              }}
              style={{
                padding: "0.7rem 1.5rem",
                background: "#ff6b35",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              + Add New Student
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                overflowY: "auto",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "2rem",
                  maxWidth: "600px",
                  width: "100%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingStudent(null);
                  }}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
                <AddStudentForm
                  onSuccess={handleFormSuccess}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingStudent(null);
                  }}
                  editingStudent={editingStudent}
                />
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="quick-actions" style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Search Student
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, idx) => (
                    <tr key={idx}>
                      <td className="dept-cell-dept">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="dept-cell-data">
                        {student.studentId || "N/A"}
                      </td>
                      <td className="dept-cell-data">
                        {student.email || "N/A"}
                      </td>
                      <td className="dept-cell-data">
                        {student.programName || "N/A"}
                      </td>
                      <td className="dept-cell-data">
                        {student.yearLevel || "N/A"}
                      </td>
                      <td
                        className="dept-cell-data"
                        style={{ fontWeight: "600", color: "#ff6b35" }}
                      >
                        {student.gpa || "N/A"}
                      </td>
                      <td>
                        <span className="status-badge">
                          {student.status || "Active"}
                        </span>
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                          }}
                        >
                          {/* View Icon */}
                          <Link
                            to={`/students/${student.id}`}
                            style={{
                              width: "36px",
                              height: "36px",
                              background: "#0066cc",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textDecoration: "none",
                              fontSize: "1rem",
                              flexShrink: 0,
                              transition: "background 0.2s",
                            }}
                            title="View Student"
                            className="action-icon"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>

                          {/* Edit Icon */}
                          <button
                            onClick={() => {
                              setEditingStudent(student);
                              setShowForm(true);
                            }}
                            style={{
                              width: "36px",
                              height: "36px",
                              background: "#ffc107",
                              color: "#333",
                              border: "none",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: "1rem",
                              flexShrink: 0,
                              transition: "background 0.2s",
                            }}
                            title="Edit Student"
                            className="action-icon"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          {/* Delete Icon */}
                          <button
                            onClick={() => handleDelete(student.id)}
                            style={{
                              width: "36px",
                              height: "36px",
                              background: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: "1rem",
                              flexShrink: 0,
                              transition: "background 0.2s",
                            }}
                            title="Delete Student"
                            className="action-icon"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
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
