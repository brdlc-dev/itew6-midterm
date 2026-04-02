import { useState, useEffect } from "react";
import { StudentService } from "../services/storageService";
import "../components/componentStyles/AddStudentForm.css";

export default function AddStudentForm({
  onSuccess,
  onCancel,
  editingStudent,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    age: "",
    birthProvince: "",
    mobileNumber: "",
    email: "",
    city: "",
    province: "",
    programId: "",
    yearLevel: "",
    unitsTaken: "",
    unitsLeft: "",
    dateEnrolled: "",
    gpa: "",
    status: "Active",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstName: editingStudent.firstName || "",
        lastName: editingStudent.lastName || "",
        middleName: editingStudent.middleName || "",
        age: editingStudent.age || "",
        birthProvince: editingStudent.birthProvince || "",
        mobileNumber: editingStudent.mobileNumber || "",
        email: editingStudent.email || "",
        city: editingStudent.city || "",
        province: editingStudent.province || "",
        programId: editingStudent.programId || "",
        yearLevel: editingStudent.yearLevel || "",
        unitsTaken: editingStudent.unitsTaken || "",
        unitsLeft: editingStudent.unitsLeft || "",
        dateEnrolled: editingStudent.dateEnrolled || "",
        gpa: editingStudent.gpa || "",
        status: editingStudent.status || "Active",
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (
      formData.age &&
      (parseInt(formData.age) < 15 || parseInt(formData.age) > 100)
    ) {
      errors.age = "Age must be between 15 and 100";
    }
    if (
      formData.gpa &&
      (parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 4)
    ) {
      errors.gpa = "GPA must be between 0 and 4";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const entityData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        age: parseInt(formData.age) || null,
        birthProvince: formData.birthProvince,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        city: formData.city,
        province: formData.province,
      };

      const studentData = {
        programId: parseInt(formData.programId) || 1,
        yearLevel: parseInt(formData.yearLevel) || 1,
        unitsTaken: parseInt(formData.unitsTaken) || 0,
        unitsLeft: parseInt(formData.unitsLeft) || 0,
        dateEnrolled:
          formData.dateEnrolled || new Date().toISOString().split("T")[0],
        gpa: parseFloat(formData.gpa) || 0.0,
        status: formData.status,
      };

      if (editingStudent) {
        StudentService.update(editingStudent.id, studentData, entityData);
      } else {
        studentData.studentId = `CSC-${new Date().getFullYear()}-${String(
          Math.floor(Math.random() * 10000),
        ).padStart(3, "0")}`;
        StudentService.create(studentData, entityData);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!editingStudent;

  return (
    <div className="add-student-form-wrapper">
      <form onSubmit={handleSubmit} className="add-student-form">
        {/* Header */}
        <div className="form-header">
          <div className="form-title-section">
            <h2 className="form-title">
              {isEditing ? "Edit Student Profile" : "Add New Student"}
            </h2>
            <p className="form-subtitle">
              {isEditing
                ? "Update student information"
                : "Register a new student in the system"}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-banner">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.2" />
              <path
                d="M10 6V10M10 14H10.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form Sections */}
        {/* Personal Information Section */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Personal Information</h3>
            <p className="section-description">
              Basic details about the student
            </p>
          </div>

          <div className="form-grid form-grid-2">
            {/* First Name */}
            <div className="form-group">
              <label className="form-label">
                First Name
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className={`form-input ${validationErrors.firstName ? "error" : ""}`}
              />
              {validationErrors.firstName && (
                <span className="error-text">{validationErrors.firstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label className="form-label">
                Last Name
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className={`form-input ${validationErrors.lastName ? "error" : ""}`}
              />
              {validationErrors.lastName && (
                <span className="error-text">{validationErrors.lastName}</span>
              )}
            </div>

            {/* Middle Name */}
            <div className="form-group">
              <label className="form-label">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Enter middle name (optional)"
                className="form-input"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email
                <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                className={`form-input ${validationErrors.email ? "error" : ""}`}
              />
              {validationErrors.email && (
                <span className="error-text">{validationErrors.email}</span>
              )}
            </div>

            {/* Age */}
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="15"
                max="100"
                className={`form-input ${validationErrors.age ? "error" : ""}`}
              />
              {validationErrors.age && (
                <span className="error-text">{validationErrors.age}</span>
              )}
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="+63 999 123 4567"
                className="form-input"
              />
            </div>

            {/* Birth Province */}
            <div className="form-group">
              <label className="form-label">Birth Province</label>
              <input
                type="text"
                name="birthProvince"
                value={formData.birthProvince}
                onChange={handleChange}
                placeholder="Enter province"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Address Information</h3>
            <p className="section-description">Current residential location</p>
          </div>

          <div className="form-grid form-grid-2">
            {/* City */}
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="form-input"
              />
            </div>

            {/* Province */}
            <div className="form-group">
              <label className="form-label">Province</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder="Enter province"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Academic Information</h3>
            <p className="section-description">
              Student enrollment and academic details
            </p>
          </div>

          <div className="form-grid form-grid-3">
            {/* Program ID */}
            <div className="form-group">
              <label className="form-label">Program</label>
              <select
                name="programId"
                value={formData.programId}
                onChange={handleChange}
                className="form-input form-select"
              >
                <option value="">Select program</option>
                <option value="1">Computer Science</option>
                <option value="2">Information Technology</option>
                <option value="3">Engineering</option>
                <option value="4">Business Administration</option>
              </select>
            </div>

            {/* Year Level */}
            <div className="form-group">
              <label className="form-label">Year Level</label>
              <select
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleChange}
                className="form-input form-select"
              >
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            {/* GPA */}
            <div className="form-group">
              <label className="form-label">GPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="0.00"
                className={`form-input ${validationErrors.gpa ? "error" : ""}`}
              />
              {validationErrors.gpa && (
                <span className="error-text">{validationErrors.gpa}</span>
              )}
            </div>

            {/* Units Taken */}
            <div className="form-group">
              <label className="form-label">Units Taken</label>
              <input
                type="number"
                name="unitsTaken"
                value={formData.unitsTaken}
                onChange={handleChange}
                placeholder="0"
                className="form-input"
              />
            </div>

            {/* Units Left */}
            <div className="form-group">
              <label className="form-label">Units Left</label>
              <input
                type="number"
                name="unitsLeft"
                value={formData.unitsLeft}
                onChange={handleChange}
                placeholder="0"
                className="form-input"
              />
            </div>

            {/* Date Enrolled */}
            <div className="form-group">
              <label className="form-label">Date Enrolled</label>
              <input
                type="date"
                name="dateEnrolled"
                value={formData.dateEnrolled}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Status</h3>
            <p className="section-description">Current enrollment status</p>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="status-options">
              {["Active", "Graduated", "Dropped", "Suspended"].map((status) => (
                <label key={status} className="status-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleChange}
                    className="status-radio"
                  />
                  <span className="status-label-text">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
                ? "Save Changes"
                : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
