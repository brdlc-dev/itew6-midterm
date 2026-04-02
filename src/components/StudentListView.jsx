// src/components/StudentListView.jsx
export default function StudentListView({
  filteredStudents,
  onView,
  onEdit,
  onDelete,
}) {
  return (
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
            {filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "2rem",
                  }}
                >
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="dept-cell-dept">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="dept-cell-data">
                    {student.studentId ?? "N/A"}
                  </td>
                  <td className="dept-cell-data">{student.email ?? "N/A"}</td>
                  <td className="dept-cell-data">
                    {student.programName ?? "N/A"}
                  </td>
                  <td className="dept-cell-data">
                    {student.yearLevel ?? "N/A"}
                  </td>
                  <td
                    className="dept-cell-data"
                    style={{ fontWeight: "600", color: "#ff6b35" }}
                  >
                    {student.gpa ?? "N/A"}
                  </td>
                  <td>
                    <span className="status-badge">
                      {student.status ?? "Active"}
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
                        onClick={() => onView(student)}
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
                        }}
                        title="View Profile"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        onClick={() => onEdit(student)}
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
                        }}
                        title="Edit Student"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        onClick={() => onDelete(student.id)}
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
                        }}
                        title="Delete Student"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
