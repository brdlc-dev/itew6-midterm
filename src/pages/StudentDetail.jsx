import { useParams } from "react-router-dom";
import { useStudentProfile, useStudentSections, useExtraActivities, useAwards } from "../hooks/useDatabase";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../pages/pagesStyles/Dashboard.css";

export default function StudentDetail() {
  const { studentId } = useParams();
  const { profile, loading, error } = useStudentProfile(studentId);
  const { sections } = useStudentSections(studentId);
  const { activities } = useExtraActivities(studentId);
  const { awards } = useAwards(studentId);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="dashboard-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#ff6b35' }}>Loading student profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="dashboard-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#ff6b35' }}>Error loading student profile</p>
          </div>
        </div>
      </div>
    );
  }

  const student = profile.student;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-main">
          {/* Student Header */}
          <div className="dashboard-header">
            <h1>{student.firstName} {student.lastName}</h1>
            <p>Student ID: {student.studentId || 'N/A'}</p>
          </div>

          {/* Student Personal Information */}
          <div className="quick-actions">
            <h4>Personal Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Email</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.email || 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Mobile Number</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.mobileNumber || 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Birth Date</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.birthDate ? new Date(student.birthDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Age</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.age || 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Birth Province</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.birthProvince || 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>City</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.city || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="quick-actions" style={{ marginTop: '2rem' }}>
            <h4>Academic Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Program</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.programName || 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Year Level</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.yearLevel || 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>GPA</p>
                <p style={{ color: '#ff6b35', fontWeight: '700', margin: '0', fontSize: '1.2rem' }}>{student.gpa || 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Date Enrolled</p>
                <p style={{ color: '#1a1a2e', fontWeight: '600', margin: '0' }}>{student.dateEnrolled ? new Date(student.dateEnrolled).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Status</p>
                <span className="status-badge">{student.status || 'Active'}</span>
              </div>
            </div>
          </div>

          {/* Enrolled Sections */}
          <div className="dept-overview" style={{ marginTop: '2rem' }}>
            <h4>Enrolled Sections</h4>
            <div className="table-responsive">
              <table className="table table-hover dept-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Section</th>
                    <th>Instructor</th>
                    <th>Schedule</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sections && sections.length > 0 ? (
                    sections.map((section, idx) => (
                      <tr key={idx}>
                        <td className="dept-cell-dept">{section.courseName || 'N/A'}</td>
                        <td className="dept-cell-data">{section.sectionName || 'N/A'}</td>
                        <td className="dept-cell-data">{section.instructorName || 'N/A'}</td>
                        <td className="dept-cell-data">{section.schedule || 'N/A'}</td>
                        <td>
                          <span className="status-badge">Enrolled</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>No enrolled sections</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Extra Curricular Activities */}
          <div className="dept-overview" style={{ marginTop: '2rem' }}>
            <h4>Extra Curricular Activities</h4>
            <div className="table-responsive">
              <table className="table table-hover dept-table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Role</th>
                    <th>Organization</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities && activities.length > 0 ? (
                    activities.map((activity, idx) => (
                      <tr key={idx}>
                        <td className="dept-cell-dept">{activity.activity || 'N/A'}</td>
                        <td className="dept-cell-data">{activity.role || 'N/A'}</td>
                        <td className="dept-cell-data">{activity.organization || 'N/A'}</td>
                        <td className="dept-cell-data">{activity.startDate ? new Date(activity.startDate).toLocaleDateString() : 'N/A'}</td>
                        <td className="dept-cell-data">{activity.endDate ? new Date(activity.endDate).toLocaleDateString() : 'Ongoing'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>No extra curricular activities</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Awards and Recognition */}
          <div className="dept-overview" style={{ marginTop: '2rem' }}>
            <h4>Awards and Recognition</h4>
            <div className="table-responsive">
              <table className="table table-hover dept-table">
                <thead>
                  <tr>
                    <th>Award Title</th>
                    <th>Awarding Organization</th>
                    <th>Awarding Date</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {awards && awards.length > 0 ? (
                    awards.map((award, idx) => (
                      <tr key={idx}>
                        <td className="dept-cell-dept">{award.title || 'N/A'}</td>
                        <td className="dept-cell-data">{award.awardingOrganization || 'N/A'}</td>
                        <td className="dept-cell-data">{award.awardingDate ? new Date(award.awardingDate).toLocaleDateString() : 'N/A'}</td>
                        <td className="dept-cell-data">{award.awardingLocation || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: '#999' }}>No awards recorded</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}