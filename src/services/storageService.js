// =====================================================
// Local Storage Service for CCS Student Profiling
// =====================================================

const STORAGE_KEYS = {
  ENTITY: "ccs_entity",
  COLLEGE: "ccs_college",
  PROGRAM: "ccs_program",
  CURRICULUM: "ccs_curriculum",
  COURSES: "ccs_courses",
  SECTION: "ccs_section",
  SCHEDULE: "ccs_schedule",
  STUDENT: "ccs_student",
  STUDENT_PROGRAM: "ccs_student_program",
  STUDENT_SECTION: "ccs_student_section",
  EDUCATIONAL_BACKGROUND: "ccs_educational_background",
  EXTRA_CURRICULAR: "ccs_extra_curricular",
  AWARDS: "ccs_awards",
  FACULTY: "ccs_faculty",
  JOB_HISTORY: "ccs_job_history",
  ORGANIZATION: "ccs_organization",
  STUDENT_ORGANIZATION: "ccs_student_organization",
  ADVISOR_ORGANIZATION: "ccs_advisor_organization",
  ORGANIZATION_HISTORY: "ccs_organization_history",
};

// =====================================================
// Helper Functions
// =====================================================

const getNextId = (key) => {
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  return items.length > 0
    ? Math.max(...items.map((item) => item.id || 0)) + 1
    : 1;
};

const getAll = (key) => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

const saveAll = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

const getById = (key, id) => {
  const items = getAll(key);
  return items.find((item) => item.id === parseInt(id));
};

const create = (key, data) => {
  const items = getAll(key);
  const newItem = {
    id: getNextId(key),
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  items.push(newItem);
  saveAll(key, items);
  return newItem;
};

const update = (key, id, data) => {
  const items = getAll(key);
  const index = items.findIndex((item) => item.id === parseInt(id));
  if (index !== -1) {
    items[index] = {
      ...items[index],
      ...data,
      updated_at: new Date().toISOString(),
    };
    saveAll(key, items);
    return items[index];
  }
  return null;
};

const remove = (key, id) => {
  const items = getAll(key);
  const filteredItems = items.filter((item) => item.id !== parseInt(id));
  saveAll(key, filteredItems);
  return true;
};

// =====================================================
// Entity Operations
// =====================================================

export const EntityService = {
  getAll: () => getAll(STORAGE_KEYS.ENTITY),
  getById: (id) => getById(STORAGE_KEYS.ENTITY, id),
  create: (data) => create(STORAGE_KEYS.ENTITY, data),
  update: (id, data) => update(STORAGE_KEYS.ENTITY, id, data),
  delete: (id) => remove(STORAGE_KEYS.ENTITY, id),
};

// =====================================================
// College Operations
// =====================================================

export const CollegeService = {
  getAll: () => getAll(STORAGE_KEYS.COLLEGE),
  getById: (id) => getById(STORAGE_KEYS.COLLEGE, id),
  create: (data) => create(STORAGE_KEYS.COLLEGE, data),
  update: (id, data) => update(STORAGE_KEYS.COLLEGE, id, data),
  delete: (id) => remove(STORAGE_KEYS.COLLEGE, id),
};

// =====================================================
// Program Operations
// =====================================================

export const ProgramService = {
  getAll: () => getAll(STORAGE_KEYS.PROGRAM),
  getById: (id) => getById(STORAGE_KEYS.PROGRAM, id),
  getByCollege: (collegeId) => {
    return getAll(STORAGE_KEYS.PROGRAM).filter(
      (program) => program.collegeId === parseInt(collegeId),
    );
  },
  create: (data) => create(STORAGE_KEYS.PROGRAM, data),
  update: (id, data) => update(STORAGE_KEYS.PROGRAM, id, data),
  delete: (id) => remove(STORAGE_KEYS.PROGRAM, id),
};

// =====================================================
// Curriculum Operations
// =====================================================

export const CurriculumService = {
  getAll: () => getAll(STORAGE_KEYS.CURRICULUM),
  getById: (id) => getById(STORAGE_KEYS.CURRICULUM, id),
  getByProgram: (programId) => {
    return getAll(STORAGE_KEYS.CURRICULUM).filter(
      (curriculum) => curriculum.programId === parseInt(programId),
    );
  },
  create: (data) => create(STORAGE_KEYS.CURRICULUM, data),
  update: (id, data) => update(STORAGE_KEYS.CURRICULUM, id, data),
  delete: (id) => remove(STORAGE_KEYS.CURRICULUM, id),
};

// =====================================================
// Courses Operations
// =====================================================

export const CoursesService = {
  getAll: () => getAll(STORAGE_KEYS.COURSES),
  getById: (id) => getById(STORAGE_KEYS.COURSES, id),
  getByCurriculum: (curriculumId) => {
    return getAll(STORAGE_KEYS.COURSES).filter(
      (course) => course.curriculumId === parseInt(curriculumId),
    );
  },
  create: (data) => create(STORAGE_KEYS.COURSES, data),
  update: (id, data) => update(STORAGE_KEYS.COURSES, id, data),
  delete: (id) => remove(STORAGE_KEYS.COURSES, id),
};

// =====================================================
// Section Operations
// =====================================================

export const SectionService = {
  getAll: () => getAll(STORAGE_KEYS.SECTION),
  getById: (id) => getById(STORAGE_KEYS.SECTION, id),
  getByProgram: (programId) => {
    return getAll(STORAGE_KEYS.SECTION).filter(
      (section) => section.programId === parseInt(programId),
    );
  },
  create: (data) => create(STORAGE_KEYS.SECTION, data),
  update: (id, data) => update(STORAGE_KEYS.SECTION, id, data),
  delete: (id) => remove(STORAGE_KEYS.SECTION, id),
};

// =====================================================
// Schedule Operations
// =====================================================

export const ScheduleService = {
  getAll: () => getAll(STORAGE_KEYS.SCHEDULE),
  getById: (id) => getById(STORAGE_KEYS.SCHEDULE, id),
  getBySection: (sectionId) => {
    return getAll(STORAGE_KEYS.SCHEDULE).filter(
      (schedule) => schedule.sectionId === parseInt(sectionId),
    );
  },
  create: (data) => create(STORAGE_KEYS.SCHEDULE, data),
  update: (id, data) => update(STORAGE_KEYS.SCHEDULE, id, data),
  delete: (id) => remove(STORAGE_KEYS.SCHEDULE, id),
};

// =====================================================
// Student Operations
// =====================================================

export const StudentService = {
  getAll: () => {
    const students = getAll(STORAGE_KEYS.STUDENT);
    const entities = getAll(STORAGE_KEYS.ENTITY);
    const programs = getAll(STORAGE_KEYS.PROGRAM);

    return students.map((student) => {
      const entity = entities.find((e) => e.id === student.entityId);
      const program = programs.find((p) => p.id === student.programId);
      return {
        ...student,
        firstName: entity?.firstName || "N/A",
        lastName: entity?.lastName || "N/A",
        email: entity?.email || "N/A",
        mobileNumber: entity?.mobileNumber || "N/A",
        birthDate: entity?.birthDate || "N/A",
        age: entity?.age || "N/A",
        birthProvince: entity?.birthProvince || "N/A",
        city: entity?.city || "N/A",
        province: entity?.province || "N/A",
        programName: program?.name || "N/A",
      };
    });
  },
  getById: (id) => {
    const student = getById(STORAGE_KEYS.STUDENT, id);
    if (!student) return null;
    const entity = EntityService.getById(student.entityId);
    const program = ProgramService.getById(student.programId);
    return {
      student: {
        ...student,
        firstName: entity?.firstName || "N/A",
        lastName: entity?.lastName || "N/A",
        email: entity?.email || "N/A",
        mobileNumber: entity?.mobileNumber || "N/A",
        birthDate: entity?.birthDate || "N/A",
        age: entity?.age || "N/A",
        birthProvince: entity?.birthProvince || "N/A",
        city: entity?.city || "N/A",
        province: entity?.province || "N/A",
        programName: program?.name || "N/A",
      },
      entity,
      program,
    };
  },
  create: (studentData, entityData) => {
    const entity = EntityService.create(entityData);
    const student = create(STORAGE_KEYS.STUDENT, {
      ...studentData,
      entityId: entity.id,
    });
    return { student, entity };
  },
  update: (id, studentData, entityData) => {
    const student = getById(STORAGE_KEYS.STUDENT, id);
    if (!student) return null;
    EntityService.update(student.entityId, entityData);
    return update(STORAGE_KEYS.STUDENT, id, studentData);
  },
  delete: (id) => {
    const student = getById(STORAGE_KEYS.STUDENT, id);
    if (student) {
      EntityService.delete(student.entityId);
      remove(STORAGE_KEYS.STUDENT, id);
    }
    return true;
  },
};

// =====================================================
// Faculty Operations
// =====================================================

export const FacultyService = {
  getAll: () => {
    const faculties = getAll(STORAGE_KEYS.FACULTY);
    const entities = getAll(STORAGE_KEYS.ENTITY);

    return faculties.map((faculty) => {
      const entity = entities.find((e) => e.id === faculty.entityId);
      return {
        ...faculty,
        firstName: entity?.firstName || "N/A",
        lastName: entity?.lastName || "N/A",
        email: entity?.email || "N/A",
        mobileNumber: entity?.mobileNumber || "N/A",
      };
    });
  },
  getById: (id) => {
    const faculty = getById(STORAGE_KEYS.FACULTY, id);
    if (!faculty) return null;
    const entity = EntityService.getById(faculty.entityId);
    return { faculty, entity };
  },
  create: (facultyData, entityData) => {
    const entity = EntityService.create(entityData);
    const faculty = create(STORAGE_KEYS.FACULTY, {
      ...facultyData,
      entityId: entity.id,
    });
    return { faculty, entity };
  },
  update: (id, facultyData, entityData) => {
    const faculty = getById(STORAGE_KEYS.FACULTY, id);
    if (!faculty) return null;
    EntityService.update(faculty.entityId, entityData);
    return update(STORAGE_KEYS.FACULTY, id, facultyData);
  },
  delete: (id) => {
    const faculty = getById(STORAGE_KEYS.FACULTY, id);
    if (faculty) {
      EntityService.delete(faculty.entityId);
      remove(STORAGE_KEYS.FACULTY, id);
    }
    return true;
  },
};

// =====================================================
// Student Program Operations
// =====================================================

export const StudentProgramService = {
  getAll: () => getAll(STORAGE_KEYS.STUDENT_PROGRAM),
  getByStudent: (studentId) => {
    return getAll(STORAGE_KEYS.STUDENT_PROGRAM).filter(
      (sp) => sp.studentId === parseInt(studentId),
    );
  },
  create: (data) => create(STORAGE_KEYS.STUDENT_PROGRAM, data),
  update: (id, data) => update(STORAGE_KEYS.STUDENT_PROGRAM, id, data),
  delete: (id) => remove(STORAGE_KEYS.STUDENT_PROGRAM, id),
};

// =====================================================
// Student Section Operations
// =====================================================

export const StudentSectionService = {
  getAll: () => getAll(STORAGE_KEYS.STUDENT_SECTION),
  getByStudent: (studentId) => {
    const enrollments = getAll(STORAGE_KEYS.STUDENT_SECTION).filter(
      (ss) => ss.studentId === parseInt(studentId),
    );
    const schedules = getAll(STORAGE_KEYS.SCHEDULE);
    const sections = getAll(STORAGE_KEYS.SECTION);
    const courses = getAll(STORAGE_KEYS.COURSES);

    return enrollments.map((enrollment) => {
      const section = sections.find((s) => s.id === enrollment.sectionId);
      const schedule = schedules.find(
        (s) => s.sectionId === enrollment.sectionId,
      );
      const course = courses.find((c) => c.id === schedule?.courseId);
      return {
        ...enrollment,
        sectionName: section?.sectionName || "N/A",
        courseName: course?.courseName || "N/A",
        instructorName: "TBA",
        schedule: schedule
          ? `${schedule.timeStart} - ${schedule.timeEnd}`
          : "N/A",
      };
    });
  },
  create: (data) => create(STORAGE_KEYS.STUDENT_SECTION, data),
  update: (id, data) => update(STORAGE_KEYS.STUDENT_SECTION, id, data),
  delete: (id) => remove(STORAGE_KEYS.STUDENT_SECTION, id),
};

// =====================================================
// Educational Background Operations
// =====================================================

export const EducationalBackgroundService = {
  getAll: () => getAll(STORAGE_KEYS.EDUCATIONAL_BACKGROUND),
  getByStudent: (studentId) => {
    return getAll(STORAGE_KEYS.EDUCATIONAL_BACKGROUND).filter(
      (eb) => eb.studentId === parseInt(studentId),
    );
  },
  create: (data) => create(STORAGE_KEYS.EDUCATIONAL_BACKGROUND, data),
  update: (id, data) => update(STORAGE_KEYS.EDUCATIONAL_BACKGROUND, id, data),
  delete: (id) => remove(STORAGE_KEYS.EDUCATIONAL_BACKGROUND, id),
};

// =====================================================
// Extra Curricular Operations
// =====================================================

export const ExtraCurricularService = {
  getAll: () => getAll(STORAGE_KEYS.EXTRA_CURRICULAR),
  getByStudent: (studentId) => {
    return getAll(STORAGE_KEYS.EXTRA_CURRICULAR).filter(
      (ec) => ec.studentId === parseInt(studentId),
    );
  },
  create: (data) => create(STORAGE_KEYS.EXTRA_CURRICULAR, data),
  update: (id, data) => update(STORAGE_KEYS.EXTRA_CURRICULAR, id, data),
  delete: (id) => remove(STORAGE_KEYS.EXTRA_CURRICULAR, id),
};

// =====================================================
// Awards Operations
// =====================================================

export const AwardsService = {
  getAll: () => getAll(STORAGE_KEYS.AWARDS),
  getByEntity: (entityId) => {
    return getAll(STORAGE_KEYS.AWARDS).filter(
      (award) => award.entityId === parseInt(entityId),
    );
  },
  create: (data) => create(STORAGE_KEYS.AWARDS, data),
  update: (id, data) => update(STORAGE_KEYS.AWARDS, id, data),
  delete: (id) => remove(STORAGE_KEYS.AWARDS, id),
};

// =====================================================
// Organization Operations
// =====================================================

export const OrganizationService = {
  getAll: () => getAll(STORAGE_KEYS.ORGANIZATION),
  getById: (id) => getById(STORAGE_KEYS.ORGANIZATION, id),
  getByCollege: (collegeId) => {
    return getAll(STORAGE_KEYS.ORGANIZATION).filter(
      (org) => org.collegeId === parseInt(collegeId),
    );
  },
  create: (data) => create(STORAGE_KEYS.ORGANIZATION, data),
  update: (id, data) => update(STORAGE_KEYS.ORGANIZATION, id, data),
  delete: (id) => remove(STORAGE_KEYS.ORGANIZATION, id),
};

// =====================================================
// Job History Operations
// =====================================================

export const JobHistoryService = {
  getAll: () => getAll(STORAGE_KEYS.JOB_HISTORY),
  getByFaculty: (facultyId) => {
    return getAll(STORAGE_KEYS.JOB_HISTORY).filter(
      (jh) => jh.facultyId === parseInt(facultyId),
    );
  },
  create: (data) => create(STORAGE_KEYS.JOB_HISTORY, data),
  update: (id, data) => update(STORAGE_KEYS.JOB_HISTORY, id, data),
  delete: (id) => remove(STORAGE_KEYS.JOB_HISTORY, id),
};

// =====================================================
// Dashboard Stats
// =====================================================

export const DashboardService = {
  getStats: () => {
    return {
      totalStudents: getAll(STORAGE_KEYS.STUDENT).length,
      totalFaculty: getAll(STORAGE_KEYS.FACULTY).length,
      totalPrograms: getAll(STORAGE_KEYS.PROGRAM).length,
      totalCourses: getAll(STORAGE_KEYS.COURSES).length,
      totalColleges: getAll(STORAGE_KEYS.COLLEGE).length,
    };
  },
};

// =====================================================
// Initialize Sample Data
// =====================================================

export const initializeSampleData = () => {
  // Check if data already exists
  if (getAll(STORAGE_KEYS.COLLEGE).length > 0) return;

  // College
  const college = create(STORAGE_KEYS.COLLEGE, {
    name: "College of Computing Sciences",
    dean: "Dr. Maria Santos",
    dateEstablished: "2010-01-15",
    isActive: true,
  });

  // Programs
  const program1 = create(STORAGE_KEYS.PROGRAM, {
    collegeId: college.id,
    name: "BS Computer Science",
    type: "Bachelor's Degree",
    dateEstablished: "2010-01-15",
    isActive: true,
  });

  const program2 = create(STORAGE_KEYS.PROGRAM, {
    collegeId: college.id,
    name: "BS Information Technology",
    type: "Bachelor's Degree",
    dateEstablished: "2012-06-01",
    isActive: true,
  });

  // Sample Students
  const entity1 = create(STORAGE_KEYS.ENTITY, {
    firstName: "John",
    lastName: "Doe",
    middleName: "Michael",
    age: 20,
    birthDate: "2003-05-15",
    city: "Dasmarinas",
    province: "Cavite",
    mobileNumber: "09123456789",
    email: "john.doe@ccs.edu",
  });

  create(STORAGE_KEYS.STUDENT, {
    entityId: entity1.id,
    studentId: "CSC-2024-001",
    programId: program1.id,
    yearLevel: 3,
    unitsTaken: 45,
    unitsLeft: 15,
    dateEnrolled: "2022-06-01",
    gpa: 3.85,
    status: "Active",
  });

  const entity2 = create(STORAGE_KEYS.ENTITY, {
    firstName: "Jane",
    lastName: "Smith",
    middleName: "Anne",
    age: 19,
    birthDate: "2004-08-20",
    city: "Binan",
    province: "Laguna",
    mobileNumber: "09234567890",
    email: "jane.smith@ccs.edu",
  });

  create(STORAGE_KEYS.STUDENT, {
    entityId: entity2.id,
    studentId: "CSC-2024-002",
    programId: program2.id,
    yearLevel: 2,
    unitsTaken: 30,
    unitsLeft: 30,
    dateEnrolled: "2023-06-01",
    gpa: 3.92,
    status: "Active",
  });

  // Sample Faculty
  const entity3 = create(STORAGE_KEYS.ENTITY, {
    firstName: "Dr.",
    lastName: "Rodriguez",
    age: 45,
    birthDate: "1978-12-10",
    city: "Kawit",
    province: "Cavite",
    mobileNumber: "09111111111",
    email: "dr.rodriguez@ccs.edu",
  });

  create(STORAGE_KEYS.FACULTY, {
    entityId: entity3.id,
    position: "Professor",
    employmentDate: "2015-08-01",
    employmentType: "Full-time",
    monthlyIncome: 65000,
    department: "Computer Science",
  });
};
