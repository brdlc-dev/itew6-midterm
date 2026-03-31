import { useState, useEffect } from "react";
import { StudentService } from "../services/storageService";

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
    birthDate: "",
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

  // Pre-populate form when editing an existing student
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstName: editingStudent.firstName || "",
        lastName: editingStudent.lastName || "",
        middleName: editingStudent.middleName || "",
        age: editingStudent.age || "",
        birthDate: editingStudent.birthDate || "",
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        throw new Error("First name, last name, and email are required");
      }

      const entityData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        age: parseInt(formData.age) || null,
        birthDate: formData.birthDate,
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
        // Update existing student — reuse existing studentId
        StudentService.update(editingStudent.id, studentData, entityData);
      } else {
        // Create new student — generate a new studentId
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
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "2rem auto" }}
    >
      <h2>{isEditing ? "Edit Student" : "Add New Student"}</h2>

      {error && (
        <div
          style={{
            padding: "1rem",
            background: "#fee",
            color: "#c33",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        {/* First Name */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Middle Name */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Age */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Birth Date */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Birth Date
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Email */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* City */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Province */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Province
          </label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Year Level */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Year Level
          </label>
          <select
            name="yearLevel"
            value={formData.yearLevel}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <option value="">Select...</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* GPA */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            GPA
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Status */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
            <option value="Dropped">Dropped</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "2rem",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "0.7rem 1.5rem",
            background: "#ddd",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.7rem 1.5rem",
            background: "#ff6b35",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            opacity: loading ? 0.6 : 1,
          }}
        >
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
  );
}
