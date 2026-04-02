  import { useState, useEffect } from "react";
  import Sidebar from "../components/Sidebar";
  import Navbar from "../components/Navbar";
  import { useStudents } from "../hooks/useDatabase";
  import Footer from "../components/Footer";
  import AddStudentForm from "../components/AddStudentForm";
  import ViewStudentForm from "../components/ViewStudentForm";
  import "../pages/pagesStyles/Dashboard.css";
  import "../pages/pagesStyles/ModalStyles.css";

  export default function StudentPage({ onLogout }) {
    const {
      students: initialStudents,
      loading,
      error,
      deleteStudent,
    } = useStudents();

    // State management
    const [students, setStudents] = useState(initialStudents);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [viewMode, setViewMode] = useState("list");

    // Sync initial students
    useEffect(() => {
      setStudents(initialStudents);
    }, [initialStudents]);

    const filteredStudents = students.filter((student) => {
      const matchesSearch = `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || student.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    // Handle delete
    const handleDelete = (studentId) => {
      if (
        window.confirm(
          "Are you sure you want to delete this student? This action cannot be undone.",
        )
      ) {
        deleteStudent(studentId);
        setStudents(students.filter((s) => s.id !== studentId));
        if (selectedStudent && selectedStudent.id === studentId) {
          handleBackToList();
        }
        alert("Student deleted successfully");
      }
    };

    // Add form success
    const handleAddFormSuccess = (newStudent) => {
      setStudents([...students, newStudent]);
      setShowAddForm(false);
      alert("Student added successfully!");
    };

    // Edit form success
    const handleEditFormSuccess = (updatedStudent) => {
      const updatedStudents = students.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s,
      );
      setStudents(updatedStudents);

      if (selectedStudent && selectedStudent.id === updatedStudent.id) {
        setSelectedStudent(updatedStudent);
      }

      setShowEditModal(false);
      setEditingStudent(null);
      alert("Student updated successfully!");
    };

    // Navigation handlers
    const handleViewProfile = (student) => {
      setSelectedStudent(student);
      setViewMode("profile");
    };

    const handleBackToList = () => {
      setViewMode("list");
      setSelectedStudent(null);
    };

    const handleEditClick = (student) => {
      setEditingStudent(student);
      setShowEditModal(true);
    };

    // Loading state
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

    // Error state
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

    // Profile view
    if (viewMode === "profile" && selectedStudent) {
      return (
        <div className="dashboard-container">
          <Sidebar />
          <div className="dashboard-content">
            <Navbar onLogout={onLogout} />
            <div className="dashboard-main">
              <ViewStudentForm
                student={selectedStudent}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onBack={handleBackToList}
              />

              {/* Edit Modal - Profile View */}
              {showEditModal && editingStudent && viewMode === "profile" && (
                <div
                  className="modal-overlay"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingStudent(null);
                  }}
                >
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingStudent(null);
                      }}
                      className="modal-close"
                      title="Close"
                    >
                      ×
                    </button>
                    <AddStudentForm
                      onSuccess={handleEditFormSuccess}
                      onCancel={() => {
                        setShowEditModal(false);
                        setEditingStudent(null);
                      }}
                      editingStudent={editingStudent}
                    />
                  </div>
                </div>
              )}
            </div>
            <Footer />
          </div>
        </div>
      );
    }

    // List view (default)
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

            {/* Add Button */}
            <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setShowAddForm(true)}
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

            {/* Add Form Modal */}
            {showAddForm && (
              <div
                className="modal-overlay"
                onClick={() => setShowAddForm(false)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="modal-close"
                    title="Close"
                  >
                    ×
                  </button>
                  <AddStudentForm
                    onSuccess={handleAddFormSuccess}
                    onCancel={() => setShowAddForm(false)}
                    editingStudent={null}
                  />
                </div>
              </div>
            )}

            {/* Edit Form Modal - List View */}
            {showEditModal && editingStudent && viewMode === "list" && (
              <div
                className="modal-overlay"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingStudent(null);
                }}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingStudent(null);
                    }}
                    className="modal-close"
                    title="Close"
                  >
                    ×
                  </button>
                  <AddStudentForm
                    onSuccess={handleEditFormSuccess}
                    onCancel={() => {
                      setShowEditModal(false);
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
                            <button
                              onClick={() => handleViewProfile(student)}
                              style={{
                                width: "36px",
                                height: "36px",
                                background: "#0066cc",
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
                              title="View Profile"
                            >
                              <i className="bi bi-eye"></i>
                            </button>

                            <button
                              onClick={() => handleEditClick(student)}
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
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>

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
