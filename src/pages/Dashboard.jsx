import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useDashboardStats, useStudents, useFaculty, usePrograms } from "../hooks/useDatabase";
import "../pages/pagesStyles/Dashboard.css";

export default function Dashboard({ onLogout }) {
  const { stats, loading: statsLoading } = useDashboardStats();
  const { students, loading: studentsLoading } = useStudents();
  const { faculty, loading: facultyLoading } = useFaculty();
  const { programs, loading: programsLoading } = usePrograms();

  // Calculate additional metrics from database
  const [metrics, setMetrics] = useState({
    avgGPA: 0,
    activeStudents: 0,
    totalCourses: 0
  });

  useEffect(() => {
    if (students.length > 0) {
      const avgGPA = (students.reduce((sum, s) => sum + (s.gpa || 0), 0) / students.length).toFixed(2);
      const activeStudents = students.filter(s => s.status === 'Active').length;
      setMetrics({
        avgGPA,
        activeStudents,
        totalCourses: stats.totalCourses
      });
    }
  }, [students, stats]);

  const dashboardStats = [
    {
      id: 1,
      label: "Total Students",
      value: stats.totalStudents || "0",
      icon: "bi-people-fill",
      backdropClass: "stat-card-backdrop-orange-1",
      iconClass: "stat-card-orange-1",
      trend: `${metrics.activeStudents} active students`
    },
    {
      id: 2,
      label: "Total Faculty",
      value: stats.totalFaculty || "0",
      icon: "bi-person-badge-fill",
      backdropClass: "stat-card-backdrop-orange-2",
      iconClass: "stat-card-orange-2",
      trend: `${stats.totalPrograms} programs`
    },
    {
      id: 3,
      label: "Total Programs",
      value: stats.totalPrograms || "0",
      icon: "bi-book-fill",
      backdropClass: "stat-card-backdrop-orange-3",
      iconClass: "stat-card-orange-3",
      trend: `${stats.totalCourses} courses`
    }
  ];

  const actions = [
    { icon: "bi-bar-chart-fill", label: "View Reports", color: "#ff8c42" },
    { icon: "bi-people-fill", label: "Manage Students", color: "#ff9f43" },
    { icon: "bi-person-check-fill", label: "Faculty Directory", color: "#ffa502" },
    { icon: "bi-calendar-check-fill", label: "Course Schedule", color: "#ff6b35" }
  ];

  if (statsLoading || studentsLoading || facultyLoading || programsLoading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar onLogout={onLogout} />
          <div className="dashboard-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#ff6b35' }}>Loading dashboard...</p>
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
          {/* Header Section */}
          <div className="dashboard-header">
            <h1>Welcome Back</h1>
            <p>Track your institution's comprehensive student profiling system</p>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            {dashboardStats.map((stat) => (
              <div key={stat.id} className="stat-card">
                <div className={`stat-card-backdrop ${stat.backdropClass}`}></div>

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

          {/* Quick Actions Section */}
          <div className="quick-actions">
            <h4>Quick Actions</h4>
            <div className="quick-actions-grid">
              {actions.map((action, idx) => (
                <div 
                  key={idx} 
                  className="action-btn"
                  style={{ borderColor: action.color }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = action.color;
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div className="action-btn-icon" style={{ color: action.color }}>
                    <i className={`bi ${action.icon}`}></i>
                  </div>
                  <p className="action-btn-label">{action.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Students Overview Table */}
          <div className="dept-overview">
            <h4>Recent Students Enrolled</h4>
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
                      <td className="dept-cell-dept">{student.firstName} {student.lastName}</td>
                      <td className="dept-cell-data">{student.studentId || 'N/A'}</td>
                      <td className="dept-cell-data">{student.programName || 'N/A'}</td>
                      <td className="dept-cell-data">{student.yearLevel || 'N/A'}</td>
                      <td>
                        <span className="status-badge">{student.status || 'Active'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Faculty Overview Table */}
          <div className="dept-overview" style={{ marginTop: "2rem" }}>
            <h4>Faculty Members</h4>
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
                      <td className="dept-cell-dept">{fac.firstName} {fac.lastName}</td>
                      <td className="dept-cell-data">{fac.position || 'N/A'}</td>
                      <td className="dept-cell-data">{fac.employmentType || 'N/A'}</td>
                      <td className="dept-cell-data">₱{fac.monthlyIncome || '0'}</td>
                      <td>
                        <span className="status-badge">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Programs Overview */}
          <div className="dept-overview" style={{ marginTop: "2rem" }}>
            <h4>Academic Programs</h4>
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
                  {programs.slice(0, 5).map((program, idx) => (
                    <tr key={idx}>
                      <td className="dept-cell-dept">{program.name || 'N/A'}</td>
                      <td className="dept-cell-data">{program.type || 'N/A'}</td>
                      <td className="dept-cell-data">{program.dateEstablished ? new Date(program.dateEstablished).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <span className="status-badge">{program.isActive ? 'Active' : 'Inactive'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}