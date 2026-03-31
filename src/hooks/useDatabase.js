import { useState, useEffect } from "react";
import {
  StudentService,
  FacultyService,
  ProgramService,
  DashboardService,
  StudentSectionService,
  ExtraCurricularService,
  AwardsService,
  initializeSampleData,
} from "../services/storageService";

// Initialize sample data on first load
initializeSampleData();

// =====================================================
// Dashboard Stats Hook
// =====================================================
export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalPrograms: 0,
    totalCourses: 0,
    totalColleges: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = DashboardService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stats, loading };
};

// =====================================================
// Students Hook
// =====================================================
export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = StudentService.getAll();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addStudent = (studentData, entityData) => {
    try {
      const result = StudentService.create(studentData, entityData);
      const updatedStudents = StudentService.getAll();
      setStudents(updatedStudents);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const updateStudent = (id, studentData, entityData) => {
    try {
      StudentService.update(id, studentData, entityData);
      const updatedStudents = StudentService.getAll();
      setStudents(updatedStudents);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteStudent = (id) => {
    try {
      StudentService.delete(id);
      const updatedStudents = StudentService.getAll();
      setStudents(updatedStudents);
    } catch (err) {
      setError(err.message);
    }
  };

  return { students, loading, error, addStudent, updateStudent, deleteStudent };
};

// =====================================================
// Faculty Hook
// =====================================================
export const useFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = FacultyService.getAll();
      setFaculty(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFaculty = (facultyData, entityData) => {
    try {
      const result = FacultyService.create(facultyData, entityData);
      const updatedFaculty = FacultyService.getAll();
      setFaculty(updatedFaculty);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const updateFaculty = (id, facultyData, entityData) => {
    try {
      FacultyService.update(id, facultyData, entityData);
      const updatedFaculty = FacultyService.getAll();
      setFaculty(updatedFaculty);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteFaculty = (id) => {
    try {
      FacultyService.delete(id);
      const updatedFaculty = FacultyService.getAll();
      setFaculty(updatedFaculty);
    } catch (err) {
      setError(err.message);
    }
  };

  return { faculty, loading, error, addFaculty, updateFaculty, deleteFaculty };
};

// =====================================================
// Programs Hook
// =====================================================
export const usePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = ProgramService.getAll();
      setPrograms(data);
    } catch (error) {
      console.error("Error loading programs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { programs, loading };
};

// =====================================================
// Student Profile Hook
// =====================================================
export const useStudentProfile = (studentId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = StudentService.getById(studentId);
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { profile, loading, error };
};

// =====================================================
// Student Sections Hook
// =====================================================
export const useStudentSections = (studentId) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = StudentSectionService.getByStudent(studentId);
      setSections(data);
    } catch (error) {
      console.error("Error loading sections:", error);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { sections, loading };
};

// =====================================================
// Extra Activities Hook
// =====================================================
export const useExtraActivities = (studentId) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = ExtraCurricularService.getByStudent(studentId);
      setActivities(data);
    } catch (error) {
      console.error("Error loading activities:", error);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { activities, loading };
};

// =====================================================
// Awards Hook
// =====================================================
export const useAwards = (studentId) => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Get student entity first
      const student = StudentService.getById(studentId);
      if (student && student.entity) {
        const data = AwardsService.getByEntity(student.entity.id);
        setAwards(data);
      }
    } catch (error) {
      console.error("Error loading awards:", error);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { awards, loading };
};
