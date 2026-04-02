// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppData } from "../context/AppDataContext";
import "../pages/pagesStyles/Dashboard.css";

export default function Dashboard({ onLogout }) {
  const {
    students,
    studentsLoading,
    faculty,
    facultyLoading,
    programs,
    programsLoading,
    stats,
    statsLoading,
  } = useAppData();

  const [metrics, setMetrics] = useState({ avgGPA: 0, activeStudents: 0 });

  useEffect(() => {
    if (students && students.length > 0) {
      const avgGPA = (
        students.reduce((sum, s) => sum + (s.gpa || 0), 0) / students.length
      ).toFixed(2);
      const activeStudents = students.filter(
        (s) => s.status === "Active",
      ).length;
      setMetrics({ avgGPA, activeStudents });
    }
  }, [students]);

  if (studentsLoading || facultyLoading || programsLoading || statsLoading) {
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
              Loading dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      id: 1,
      label: "Total Students",
      value: students.length || 0,
      icon: "bi-people-fill",
      backdropClass: "stat-card-backdrop-orange-1",
      iconClass: "stat-card-orange-1",
      trend: `${metrics.activeStudents} active students`,
    },
    {
      id: 2,
      label: "Total Faculty",
      value: faculty.length || 0,
      icon: "bi-person-badge-fill",
      backdropClass: "stat-card-backdrop-orange-2",
      iconClass: "stat-card-orange-2",
      trend: `${programs.length} programs`,
    },
    {
      id: 3,
      label: "Total Programs",
      value: programs.length || 0,
      icon: "bi-book-fill",
      backdropClass: "stat-card-backdrop-orange-3",
      iconClass: "stat-card-orange-3",
      trend: `Avg GPA: ${metrics.avgGPA}`,
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar onLogout={onLogout} />
        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1>Welcome Back</h1>
            <p>
              Track your institution's comprehensive student profiling system
            </p>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            {dashboardStats.map((stat) => (
              <div key={stat.id} className="stat-card">
                <div
                  className={`stat-card-backdrop ${stat.backdropClass}`}
                ></div>
                <div className="stat-card-content">
                  <div className="stat-card-header">
                    <h6 className="stat-card-label">{stat.label}</h6>
                    <div className={`stat-card-icon ${stat.iconClass}`}>
                      <i className={`bi ${stat.icon}`}></i>
                    </div>
                  </div>
                  <h2 className="stat-card-value">{stat.value}</h2>
                  <p className="stat-card-trend">{stat.trend}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Students */}
          <div className="dept-overview">
            <h4>Recent Students Enrolled ({students.length})</h4>
            <div className="table-responsive">
              <table className="table table-hover dept-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Program</th>
                    <th>Year Level</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 5).map((student, idx) => (
                    <tr key={idx}>
                      <td>
                        {student.firstName} {student.lastName}
                      </td>
                      <td>{student.studentId || "N/A"}</td>
                      <td>{student.programName || "N/A"}</td>
                      <td>{student.yearLevel || "N/A"}</td>
                      <td>
                        <span className="status-badge">
                          {student.status || "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          color: "#999",
                          padding: "1rem",
                        }}
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Faculty */}
          <div className="dept-overview" style={{ marginTop: "2rem" }}>
            <h4>Faculty Members ({faculty.length})</h4>
            <div className="table-responsive">
              <table className="table table-hover dept-table">
                <thead>
                  <tr>
                    <th>Faculty Name</th>
                    <th>Position</th>
                    <th>Employment Type</th>
                    <th>Monthly Income</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty.slice(0, 5).map((fac, idx) => (
                    <tr key={idx}>
                      <td>
                        {fac.firstName} {fac.lastName}
                      </td>
                      <td>{fac.position || "N/A"}</td>
                      <td>{fac.employmentType || "N/A"}</td>
                      <td>₱{fac.monthlyIncome?.toLocaleString() || "0"}</td>
                      <td>
                        <span className="status-badge">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Programs */}
          <div className="dept-overview" style={{ marginTop: "2rem" }}>
            <h4>Academic Programs ({programs.length})</h4>
            <div className="table-responsive">
              <table className="table table-hover dept-table">
                <thead>
                  <tr>
                    <th>Program Name</th>
                    <th>Type</th>
                    <th>Date Established</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program, idx) => (
                    <tr key={idx}>
                      <td>{program.name || "N/A"}</td>
                      <td>{program.type || "N/A"}</td>
                      <td>
                        {program.dateEstablished
                          ? new Date(
                              program.dateEstablished,
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <span className="status-badge">
                          {program.isActive ? "Active" : "Inactive"}
                        </span>
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
