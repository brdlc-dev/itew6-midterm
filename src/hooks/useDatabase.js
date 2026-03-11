import { useState, useEffect } from 'react';
import {
  studentAPI,
  facultyAPI,
  programAPI,
  courseAPI,
  organizationAPI,
  sectionAPI,
  studentSectionAPI,
  extraCurricularAPI,
  awardAPI,
  educationBackgroundAPI,
  jobHistoryAPI
} from '../services/api';
import {
  mockStudents,
  mockFaculty,
  mockPrograms,
  mockSections,
  mockActivities,
  mockAwards
} from '../services/mockData';

// ==================== STUDENTS HOOK ====================
export const useStudents = (useMockData = true) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          // Use mock data for testing
          setStudents(mockStudents);
        } else {
          // Fetch from API
          const data = await studentAPI.getAll();
          setStudents(data);
        }
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(err.message);
        // Fallback to mock data on error
        setStudents(mockStudents);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [useMockData]);

  return { students, loading, error, refetch: () => fetchStudents() };
};

// ==================== SINGLE STUDENT HOOK ====================
export const useStudent = (studentId, useMockData = true) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          const mockStudent = mockStudents.find(s => s.id === parseInt(studentId));
          setStudent(mockStudent || null);
        } else {
          const data = await studentAPI.getById(studentId);
          setStudent(data);
        }
      } catch (err) {
        console.error('Error fetching student:', err);
        setError(err.message);
        // Fallback to mock data
        const mockStudent = mockStudents.find(s => s.id === parseInt(studentId));
        setStudent(mockStudent || null);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId, useMockData]);

  return { student, loading, error };
};

// ==================== FACULTY HOOK ====================
export const useFaculty = (useMockData = true) => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          setFaculty(mockFaculty);
        } else {
          const data = await facultyAPI.getAll();
          setFaculty(data);
        }
      } catch (err) {
        console.error('Error fetching faculty:', err);
        setError(err.message);
        // Fallback to mock data
        setFaculty(mockFaculty);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [useMockData]);

  return { faculty, loading, error };
};

// ==================== PROGRAMS HOOK ====================
export const usePrograms = (useMockData = true) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          setPrograms(mockPrograms);
        } else {
          const data = await programAPI.getAll();
          setPrograms(data);
        }
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err.message);
        // Fallback to mock data
        setPrograms(mockPrograms);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [useMockData]);

  return { programs, loading, error };
};

// ==================== COURSES HOOK ====================
export const useCourses = (curriculumId = null, useMockData = true) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          setCourses([]);
        } else {
          const data = curriculumId
            ? await courseAPI.getByCurriculum(curriculumId)
            : await courseAPI.getAll();
          setCourses(data);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [curriculumId, useMockData]);

  return { courses, loading, error };
};

// ==================== DASHBOARD STATS HOOK ====================
export const useDashboardStats = (useMockData = true) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalPrograms: 0,
    totalCourses: 0,
    totalOrganizations: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          setStats({
            totalStudents: mockStudents.length,
            totalFaculty: mockFaculty.length,
            totalPrograms: mockPrograms.length,
            totalCourses: mockSections.length,
            totalOrganizations: 5
          });
        } else {
          const [students, faculty, programs, courses, orgs] = await Promise.all([
            studentAPI.getAll(),
            facultyAPI.getAll(),
            programAPI.getAll(),
            courseAPI.getAll(),
            organizationAPI.getAll()
          ]);

          setStats({
            totalStudents: students.length,
            totalFaculty: faculty.length,
            totalPrograms: programs.length,
            totalCourses: courses.length,
            totalOrganizations: orgs.length
          });
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message);
        // Fallback to mock data
        setStats({
          totalStudents: mockStudents.length,
          totalFaculty: mockFaculty.length,
          totalPrograms: mockPrograms.length,
          totalCourses: mockSections.length,
          totalOrganizations: 5
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [useMockData]);

  return { stats, loading, error };
};

// ==================== STUDENT SECTIONS HOOK ====================
export const useStudentSections = (studentId, useMockData = true) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchSections = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          setSections(mockSections);
        } else {
          const data = await studentSectionAPI.getByStudent(studentId);
          setSections(data);
        }
      } catch (err) {
        console.error('Error fetching sections:', err);
        setError(err.message);
        setSections(mockSections);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, [studentId, useMockData]);

  return { sections, loading, error };
};

// ==================== STUDENT PROFILE HOOK ====================
export const useStudentProfile = (studentId, useMockData = true) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          const student = mockStudents.find(s => s.id === parseInt(studentId));
          setProfile({
            student: student || {},
            sections: mockSections,
            background: [],
            extraActivities: mockActivities,
            awards: mockAwards,
            organizations: []
          });
        } else {
          const [student, sections, background, extraActivities, awards, organizations] = await Promise.all([
            studentAPI.getById(studentId),
            studentSectionAPI.getByStudent(studentId),
            educationBackgroundAPI.getByStudent(studentId),
            extraCurricularAPI.getByStudent(studentId),
            awardAPI.getByStudent(studentId),
            studentOrganizationAPI.getByStudent(studentId)
          ]);

          setProfile({
            student,
            sections,
            background,
            extraActivities,
            awards,
            organizations
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
        // Fallback
        const student = mockStudents.find(s => s.id === parseInt(studentId));
        setProfile({
          student: student || {},
          sections: mockSections,
          background: [],
          extraActivities: mockActivities,
          awards: mockAwards,
          organizations: []
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [studentId, useMockData]);

  return { profile, loading, error };
};

// ==================== ORGANIZATIONS HOOK ====================
export const useOrganizations = (useMockData = true) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          setOrganizations([]);
        } else {
          const data = await organizationAPI.getAll();
          setOrganizations(data);
        }
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError(err.message);
        setOrganizations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, [useMockData]);

  return { organizations, loading, error };
};

// ==================== EXTRA CURRICULAR ACTIVITIES HOOK ====================
export const useExtraActivities = (studentId, useMockData = true) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          setActivities(mockActivities);
        } else {
          const data = await extraCurricularAPI.getByStudent(studentId);
          setActivities(data);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setActivities(mockActivities);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [studentId, useMockData]);

  return { activities, loading, error };
};

// ==================== AWARDS HOOK ====================
export const useAwards = (studentId, useMockData = true) => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchAwards = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (useMockData) {
          setAwards(mockAwards);
        } else {
          const data = await awardAPI.getByStudent(studentId);
          setAwards(data);
        }
      } catch (err) {
        console.error('Error fetching awards:', err);
        setError(err.message);
        setAwards(mockAwards);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, [studentId, useMockData]);

  return { awards, loading, error };
};

export default {
  useStudents,
  useStudent,
  useFaculty,
  usePrograms,
  useCourses,
  useDashboardStats,
  useStudentSections,
  useStudentProfile,
  useOrganizations,
  useExtraActivities,
  useAwards
};