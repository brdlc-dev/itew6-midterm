// src/services/api.js
// API service for all database calls

const API_BASE_URL = "http://localhost:5000/api"; // Change to your backend URL

// ==================== COLLEGE ====================
export const collegeAPI = {
  getAll: () => fetch(`${API_BASE_URL}/colleges`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/colleges/${id}`).then(res => res.json()),
};

// ==================== PROGRAMS ====================
export const programAPI = {
  getAll: () => fetch(`${API_BASE_URL}/programs`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/programs/${id}`).then(res => res.json()),
  getByCollege: (collegeId) => fetch(`${API_BASE_URL}/programs?collegeId=${collegeId}`).then(res => res.json()),
};

// ==================== CURRICULUM ====================
export const curriculumAPI = {
  getAll: () => fetch(`${API_BASE_URL}/curriculum`).then(res => res.json()),
  getByProgram: (programId) => fetch(`${API_BASE_URL}/curriculum?programId=${programId}`).then(res => res.json()),
};

// ==================== COURSES ====================
export const courseAPI = {
  getAll: () => fetch(`${API_BASE_URL}/courses`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/courses/${id}`).then(res => res.json()),
  getByCurriculum: (curriculumId) => fetch(`${API_BASE_URL}/courses?curriculumId=${curriculumId}`).then(res => res.json()),
};

// ==================== STUDENTS ====================
export const studentAPI = {
  getAll: () => fetch(`${API_BASE_URL}/students`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/students/${id}`).then(res => res.json()),
  getByProgram: (programId) => fetch(`${API_BASE_URL}/students?programId=${programId}`).then(res => res.json()),
  create: (data) => fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  update: (id, data) => fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (id) => fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),
  getStats: () => fetch(`${API_BASE_URL}/students/stats`).then(res => res.json()),
};

// ==================== FACULTY ====================
export const facultyAPI = {
  getAll: () => fetch(`${API_BASE_URL}/faculty`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/faculty/${id}`).then(res => res.json()),
  getStats: () => fetch(`${API_BASE_URL}/faculty/stats`).then(res => res.json()),
};

// ==================== STUDENT SECTIONS ====================
export const studentSectionAPI = {
  getByStudent: (studentId) => fetch(`${API_BASE_URL}/student-sections?studentId=${studentId}`).then(res => res.json()),
  getBySection: (sectionId) => fetch(`${API_BASE_URL}/student-sections?sectionId=${sectionId}`).then(res => res.json()),
};

// ==================== SECTIONS ====================
export const sectionAPI = {
  getAll: () => fetch(`${API_BASE_URL}/sections`).then(res => res.json()),
  getByProgram: (programId) => fetch(`${API_BASE_URL}/sections?programId=${programId}`).then(res => res.json()),
};

// ==================== SCHEDULE ====================
export const scheduleAPI = {
  getBySection: (sectionId) => fetch(`${API_BASE_URL}/schedules?sectionId=${sectionId}`).then(res => res.json()),
  getByStudent: (studentId) => fetch(`${API_BASE_URL}/schedules/student/${studentId}`).then(res => res.json()),
};

// ==================== EDUCATIONAL BACKGROUND ====================
export const educationBackgroundAPI = {
  getByStudent: (studentId) => fetch(`${API_BASE_URL}/educational-background?studentId=${studentId}`).then(res => res.json()),
};

// ==================== EXTRA CURRICULAR ====================
export const extraCurricularAPI = {
  getByStudent: (studentId) => fetch(`${API_BASE_URL}/extra-curricular?studentId=${studentId}`).then(res => res.json()),
};

// ==================== AWARDS ====================
export const awardAPI = {
  getByStudent: (studentId) => fetch(`${API_BASE_URL}/awards?studentId=${studentId}`).then(res => res.json()),
};

// ==================== ORGANIZATION ====================
export const organizationAPI = {
  getAll: () => fetch(`${API_BASE_URL}/organizations`).then(res => res.json()),
  getStats: () => fetch(`${API_BASE_URL}/organizations/stats`).then(res => res.json()),
};

// ==================== STUDENT ORGANIZATION ====================
export const studentOrganizationAPI = {
  getByStudent: (studentId) => fetch(`${API_BASE_URL}/student-organizations?studentId=${studentId}`).then(res => res.json()),
  getByOrganization: (orgId) => fetch(`${API_BASE_URL}/student-organizations?organizationId=${orgId}`).then(res => res.json()),
};

// ==================== JOB HISTORY ====================
export const jobHistoryAPI = {
  getByFaculty: (facultyId) => fetch(`${API_BASE_URL}/job-history?facultyId=${facultyId}`).then(res => res.json()),
};

// Export all APIs as a single object for convenience
export default {
  collegeAPI,
  programAPI,
  curriculumAPI,
  courseAPI,
  studentAPI,
  facultyAPI,
  studentSectionAPI,
  sectionAPI,
  scheduleAPI,
  educationBackgroundAPI,
  extraCurricularAPI,
  awardAPI,
  organizationAPI,
  studentOrganizationAPI,
  jobHistoryAPI,
};