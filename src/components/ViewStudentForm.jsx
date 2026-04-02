import React from "react";
import "../components/componentStyles/ViewStudentForm.css";

const ViewStudentForm = ({ student, onEdit, onDelete, onBack }) => {
  if (!student) return null;

  return (
    <div className="view-student-form">
      {/* Back Button */}
      <button onClick={onBack} className="back-button">
        ← Back to Student List
      </button>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="header-content">
          <div className="avatar">
            {student.firstName.charAt(0)}
            {student.lastName.charAt(0)}
          </div>
          <div className="header-info">
            <h1 className="student-name">
              {student.firstName} {student.lastName}
            </h1>
            <p className="student-id">
              Student ID: {student.studentId || "N/A"}
            </p>
            <div className="status-badge">
              <span className="status-text">{student.status || "Active"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content Grid */}
      <div className="profile-grid">
        {/* Basic Information Card */}
        <div className="info-card">
          <h3 className="card-title">Basic Information</h3>
          <div className="card-content">
            <InfoField label="Email" value={student.email || "N/A"} />
            <InfoField label="Program" value={student.programName || "N/A"} />
            <InfoField label="Year Level" value={student.yearLevel || "N/A"} />
            <InfoField label="Contact" value={student.mobileNumber || "N/A"} />
          </div>
        </div>

        {/* Academic Information Card */}
        <div className="info-card">
          <h3 className="card-title">Academic Performance</h3>
          <div className="card-content">
            <div className="gpa-section">
              <p className="gpa-label">GPA</p>
              <p className="gpa-value">{student.gpa || "N/A"}</p>
            </div>
            <InfoField label="Units Taken" value={student.unitsTaken || "0"} />
            <InfoField label="Units Left" value={student.unitsLeft || "0"} />
          </div>
        </div>

        {/* Additional Information Card */}
        {student.city || student.province || student.age ? (
          <div className="info-card">
            <h3 className="card-title">Additional Information</h3>
            <div className="card-content">
              {student.city && <InfoField label="City" value={student.city} />}
              {student.province && (
                <InfoField label="Province" value={student.province} />
              )}
              {student.age && <InfoField label="Age" value={student.age} />}
            </div>
          </div>
        ) : null}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={() => onEdit(student)} className="btn-edit">
          ✎ Edit Student
        </button>
        <button onClick={() => onDelete(student.id)} className="btn-delete">
          🗑 Delete Student
        </button>
      </div>
    </div>
  );
};

// Helper component for displaying info fields
function InfoField({ label, value }) {
  return (
    <div className="info-field">
      <p className="field-label">{label}</p>
      <p className="field-value">{value}</p>
    </div>
  );
}

export default ViewStudentForm;
