// src/pages/StudentPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { useStudents } from "../hooks/useDatabase";
import { useAppData } from "../context/AppDataContext";
import StudentListView from "../components/StudentListView";
import StudentSearchFilter from "../components/StudentSearchFilter";
import StudentModals from "../components/StudentModals";
import ViewStudentForm from "../components/ViewStudentForm";
import "../pages/pagesStyles/Dashboard.css";
import "../pages/pagesStyles/ModalStyles.css";
import Swal from "sweetalert2";

export default function StudentPage({ onLogout }) {
  const { students, loading, error, addStudent, updateStudent, deleteStudent } =
    useAppData();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  const filteredStudents = (students || []).filter((student) => {
    if (!student || student.id == null) return false;
    const fullName =
      `${student.firstName ?? ""} ${student.lastName ?? ""}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (studentId) => {
    if (studentId == null) return;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be permanently deleted and cannot be recovered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      deleteStudent(studentId);
      if (selectedStudent?.id === studentId) handleBackToList();
      Swal.fire({
        title: "Deleted!",
        text: "The student has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#ff6b35",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // ── Add success ───────────────────────────────────────────────────────────
  const handleAddFormSuccess = () => {
    setShowAddForm(false);
    Swal.fire({
      title: "Student Added!",
      text: "The new student has been added successfully.",
      icon: "success",
      confirmButtonColor: "#ff6b35",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  // ── Edit success ──────────────────────────────────────────────────────────
  const handleEditFormSuccess = (updatedStudent) => {
    if (updatedStudent && selectedStudent?.id === updatedStudent.id) {
      setSelectedStudent(updatedStudent);
    }
    setShowEditModal(false);
    setEditingStudent(null);
    Swal.fire({
      title: "Student Updated!",
      text: "The student's information has been updated successfully.",
      icon: "success",
      confirmButtonColor: "#ff6b35",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleViewProfile = (student) => {
    if (!student || student.id == null) return;
    setSelectedStudent(student);
    setViewMode("profile");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedStudent(null);
  };

  const handleEditClick = (student) => {
    if (!student || student.id == null) return;
    setEditingStudent(student);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingStudent(null);
  };

  // ── Loading ───────────────────────────────────────────────────────────────
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

  // ── Error ─────────────────────────────────────────────────────────────────
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

  // ── Profile View ──────────────────────────────────────────────────────────
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
            {/* Edit modal still available in profile view */}
            <StudentModals
              showAddForm={false}
              onCloseAdd={() => {}}
              showEditModal={showEditModal}
              editingStudent={editingStudent}
              onCloseEdit={closeEditModal}
              onAddSuccess={handleAddFormSuccess}
              onEditSuccess={handleEditFormSuccess}
              addStudent={addStudent}
              updateStudent={updateStudent}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // ── List View ─────────────────────────────────────────────────────────────
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar onLogout={onLogout} />
        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1>Student Management</h1>
            <p>View and manage all students in the system</p>
          </div>

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

          <StudentModals
            showAddForm={showAddForm}
            onCloseAdd={() => setShowAddForm(false)}
            showEditModal={showEditModal}
            editingStudent={editingStudent}
            onCloseEdit={closeEditModal}
            onAddSuccess={handleAddFormSuccess}
            onEditSuccess={handleEditFormSuccess}
            addStudent={addStudent}
            updateStudent={updateStudent}
          />

          <StudentSearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <StudentListView
            filteredStudents={filteredStudents}
            onView={handleViewProfile}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
