export const mockStudents = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    studentId: "CSC-2024-001",
    email: "john.doe@ccs.edu",
    mobileNumber: "09123456789",
    birthDate: "2002-05-15",
    age: 22,
    birthProvince: "Cavite",
    city: "Dasmarinas",
    programName: "BS Computer Science",
    yearLevel: "3rd Year",
    gpa: 3.85,
    status: "Active",
    dateEnrolled: "2022-06-01"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    studentId: "CSC-2024-002",
    email: "jane.smith@ccs.edu",
    mobileNumber: "09234567890",
    birthDate: "2003-08-20",
    age: 21,
    birthProvince: "Laguna",
    city: "Binan",
    programName: "BS Information Technology",
    yearLevel: "2nd Year",
    gpa: 3.92,
    status: "Active",
    dateEnrolled: "2023-06-01"
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    studentId: "CSC-2024-003",
    email: "robert.johnson@ccs.edu",
    mobileNumber: "09345678901",
    birthDate: "2001-12-10",
    age: 23,
    birthProvince: "Batangas",
    city: "Lipa",
    programName: "BS Computer Science",
    yearLevel: "4th Year",
    gpa: 3.65,
    status: "Active",
    dateEnrolled: "2021-06-01"
  },
  {
    id: 4,
    firstName: "Maria",
    lastName: "Garcia",
    studentId: "CSC-2024-004",
    email: "maria.garcia@ccs.edu",
    mobileNumber: "09456789012",
    birthDate: "2003-02-14",
    age: 21,
    birthProvince: "Rizal",
    city: "Antipolo",
    programName: "BS Information Technology",
    yearLevel: "2nd Year",
    gpa: 3.78,
    status: "Active",
    dateEnrolled: "2023-06-01"
  },
  {
    id: 5,
    firstName: "Carlos",
    lastName: "Santos",
    studentId: "CSC-2024-005",
    email: "carlos.santos@ccs.edu",
    mobileNumber: "09567890123",
    birthDate: "2002-07-22",
    age: 22,
    birthProvince: "Cavite",
    city: "Kawit",
    programName: "BS Computer Science",
    yearLevel: "3rd Year",
    gpa: 3.72,
    status: "Active",
    dateEnrolled: "2022-06-01"
  }
];

export const mockFaculty = [
  {
    id: 1,
    firstName: "Dr.",
    lastName: "Rodriguez",
    position: "Professor",
    department: "Computer Science",
    email: "dr.rodriguez@ccs.edu",
    mobileNumber: "09111111111",
    employmentType: "Full-time",
    monthlyIncome: 65000,
    employmentDate: "2015-08-01"
  },
  {
    id: 2,
    firstName: "Prof.",
    lastName: "Reyes",
    position: "Associate Professor",
    department: "Information Technology",
    email: "prof.reyes@ccs.edu",
    mobileNumber: "09222222222",
    employmentType: "Full-time",
    monthlyIncome: 58000,
    employmentDate: "2018-09-01"
  },
  {
    id: 3,
    firstName: "Engr.",
    lastName: "Cruz",
    position: "Instructor",
    department: "Computer Science",
    email: "engr.cruz@ccs.edu",
    mobileNumber: "09333333333",
    employmentType: "Full-time",
    monthlyIncome: 45000,
    employmentDate: "2020-07-01"
  },
  {
    id: 4,
    firstName: "Ms.",
    lastName: "Lopez",
    position: "Instructor",
    department: "Information Technology",
    email: "ms.lopez@ccs.edu",
    mobileNumber: "09444444444",
    employmentType: "Part-time",
    monthlyIncome: 30000,
    employmentDate: "2021-06-01"
  },
  {
    id: 5,
    firstName: "Mr.",
    lastName: "Gutierrez",
    position: "Lecturer",
    department: "Computer Science",
    email: "mr.gutierrez@ccs.edu",
    mobileNumber: "09555555555",
    employmentType: "Part-time",
    monthlyIncome: 28000,
    employmentDate: "2022-01-15"
  }
];

export const mockPrograms = [
  {
    id: 1,
    name: "BS Computer Science",
    type: "Bachelor's Degree",
    dateEstablished: "2010-01-15",
    isActive: true
  },
  {
    id: 2,
    name: "BS Information Technology",
    type: "Bachelor's Degree",
    dateEstablished: "2012-06-01",
    isActive: true
  },
  {
    id: 3,
    name: "BS Information Systems",
    type: "Bachelor's Degree",
    dateEstablished: "2015-08-01",
    isActive: true
  }
];

export const mockSections = [
  {
    id: 1,
    courseName: "Data Structures",
    sectionName: "BSCS-3A",
    instructorName: "Dr. Rodriguez",
    schedule: "MWF 10:00-11:30"
  },
  {
    id: 2,
    courseName: "Database Management",
    sectionName: "BSCS-3B",
    instructorName: "Prof. Reyes",
    schedule: "TTh 13:00-14:30"
  },
  {
    id: 3,
    courseName: "Web Development",
    sectionName: "BSIT-2A",
    instructorName: "Engr. Cruz",
    schedule: "MWF 14:00-15:30"
  }
];

export const mockActivities = [
  {
    id: 1,
    activity: "Programming Club President",
    role: "President",
    organization: "Programming Club",
    startDate: "2024-01-01",
    endDate: null
  },
  {
    id: 2,
    activity: "Hackathon Participant",
    role: "Team Leader",
    organization: "Tech Summit",
    startDate: "2023-09-15",
    endDate: "2023-09-17"
  }
];

export const mockAwards = [
  {
    id: 1,
    title: "Best Programmer Award",
    awardingOrganization: "CCS Department",
    awardingDate: "2023-12-15",
    awardingLocation: "CCS Auditorium"
  },
  {
    id: 2,
    title: "Dean's List",
    awardingOrganization: "College of Computing Sciences",
    awardingDate: "2023-06-15",
    awardingLocation: "University Hall"
  }
];

// Mock API responses
export const mockAPI = {
  students: mockStudents,
  faculty: mockFaculty,
  programs: mockPrograms,
  sections: mockSections,
  activities: mockActivities,
  awards: mockAwards
};

export default mockAPI;