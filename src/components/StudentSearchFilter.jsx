// src/components/StudentSearchFilter.jsx
export default function StudentSearchFilter({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) {
  return (
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
            <option>Suspended</option>
          </select>
        </div>
      </div>
    </div>
  );
}
