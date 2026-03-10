import { useState, useEffect, useRef } from "react";

// ============================================================
// TYPES & MOCK DATA
// ============================================================
const MOCK_STUDENTS = [
  {
    id: 1, firstName: "Maria", middleName: "Santos", lastName: "Reyes",
    email: "maria.reyes@uni.edu.ph", mobile: "+63 912 345 6789",
    sex: "Female", address: "123 Maharlika St., Calamba, Laguna",
    guardian: "Jose Reyes", guardianContact: "+63 917 111 2233",
    program: "BS Computer Science", yearLevel: 3, section: "BSCS-3A",
    status: "Active", gwa: 1.45,
    subjects: [
      { code: "CS301", name: "Data Structures", units: 3, grade: 1.25, status: "Passed", schedule: "MWF 7:30-8:30" },
      { code: "CS302", name: "Algorithms", units: 3, grade: 1.50, status: "Passed", schedule: "TTh 9:00-10:30" },
      { code: "CS303", name: "Database Systems", units: 3, grade: 1.75, status: "Enrolled", schedule: "MWF 10:30-11:30" },
      { code: "CS304", name: "Software Engineering", units: 3, grade: null, status: "Enrolled", schedule: "TTh 1:00-2:30" },
    ],
    organizations: ["ACM Student Chapter", "Google Developer Student Club"],
    extracurriculars: ["Chess Club", "Math Olympiad"],
    sports: ["Basketball"],
    awards: ["Dean's Lister AY 2023-2024", "Best in Programming - Regional Contest"],
    education: [{ school: "Calamba National High School", level: "Senior High", year: "2020", awards: "With Honors" }],
    avatar: "MR",
  },
  {
    id: 2, firstName: "Juan", middleName: "Cruz", lastName: "Dela Cruz",
    email: "juan.delacruz@uni.edu.ph", mobile: "+63 918 765 4321",
    sex: "Male", address: "456 Rizal Ave., Biñan, Laguna",
    guardian: "Ana Dela Cruz", guardianContact: "+63 919 222 3344",
    program: "BS Information Technology", yearLevel: 2, section: "BSIT-2B",
    status: "Active", gwa: 1.80,
    subjects: [
      { code: "IT201", name: "Web Development", units: 3, grade: 1.75, status: "Passed", schedule: "MWF 8:30-9:30" },
      { code: "IT202", name: "Networking Fundamentals", units: 3, grade: 1.50, status: "Passed", schedule: "TTh 7:30-9:00" },
      { code: "IT203", name: "Systems Analysis", units: 3, grade: null, status: "Enrolled", schedule: "MWF 1:30-2:30" },
    ],
    organizations: ["ICTDU Student Organization"],
    extracurriculars: ["Photography Club"],
    sports: ["Volleyball"],
    awards: ["Top 10 - Hackathon 2024"],
    education: [{ school: "Biñan National High School", level: "Senior High", year: "2022", awards: "With High Honors" }],
    avatar: "JD",
  },
  {
    id: 3, firstName: "Ana", middleName: "Lim", lastName: "Santos",
    email: "ana.santos@uni.edu.ph", mobile: "+63 920 111 9988",
    sex: "Female", address: "789 Bonifacio Blvd., Los Baños, Laguna",
    guardian: "Roberto Santos", guardianContact: "+63 921 444 5566",
    program: "BS Computer Science", yearLevel: 4, section: "BSCS-4B",
    status: "Active", gwa: 1.20,
    subjects: [
      { code: "CS401", name: "Machine Learning", units: 3, grade: 1.25, status: "Passed", schedule: "MWF 9:30-10:30" },
      { code: "CS402", name: "Thesis 1", units: 6, grade: null, status: "Enrolled", schedule: "TTh 2:30-5:30" },
      { code: "CS403", name: "Software Architecture", units: 3, grade: 1.00, status: "Passed", schedule: "MWF 7:30-8:30" },
    ],
    organizations: ["ACM Student Chapter", "Women in Tech PH"],
    extracurriculars: ["Debate Club", "Science Fair"],
    sports: ["Badminton", "Table Tennis"],
    awards: ["President's Lister AY 2023-2024", "Best Thesis Proposal 2024", "Regional Science Fair Champion"],
    education: [{ school: "Los Baños Integrated School", level: "Senior High", year: "2021", awards: "Valedictorian" }],
    avatar: "AS",
  },
  {
    id: 4, firstName: "Carlos", middleName: "Gomez", lastName: "Villanueva",
    email: "carlos.villanueva@uni.edu.ph", mobile: "+63 915 333 7788",
    sex: "Male", address: "321 Mabini St., San Pedro, Laguna",
    guardian: "Luz Villanueva", guardianContact: "+63 916 555 6677",
    program: "BS Information Systems", yearLevel: 1, section: "BSIS-1C",
    status: "Probationary", gwa: 2.50,
    subjects: [
      { code: "IS101", name: "Introduction to Computing", units: 3, grade: 2.50, status: "Passed", schedule: "MWF 10:30-11:30" },
      { code: "IS102", name: "Programming Fundamentals", units: 3, grade: null, status: "Enrolled", schedule: "TTh 10:30-12:00" },
    ],
    organizations: [],
    extracurriculars: ["Film Club"],
    sports: [],
    awards: [],
    education: [{ school: "San Pedro National High School", level: "Senior High", year: "2023", awards: "" }],
    avatar: "CV",
  },
];

const MOCK_FACULTY = [
  {
    id: 1, firstName: "Dr. Elena", middleName: "Bautista", lastName: "Torres",
    email: "elena.torres@uni.edu.ph", mobile: "+63 917 888 0011",
    sex: "Female", department: "Computer Science",
    employmentType: "Full-time", status: "Active",
    avatar: "ET",
    education: [
      { degree: "Ph.D. Computer Science", school: "University of the Philippines Diliman", year: "2015" },
      { degree: "MS Computer Science", school: "De La Salle University", year: "2010" },
    ],
    jobHistory: [
      { position: "Associate Professor", institution: "University", from: "2015", to: "Present" },
      { position: "Lecturer", institution: "DLSU", from: "2010", to: "2015" },
    ],
    organizations: ["Philippine Computer Society", "ACM"],
    extracurriculars: ["Faculty Chess Club"],
    currentCourses: [
      { code: "CS301", name: "Data Structures", section: "BSCS-3A", schedule: "MWF 7:30-8:30", room: "Lab 2" },
      { code: "CS401", name: "Machine Learning", section: "BSCS-4B", schedule: "MWF 9:30-10:30", room: "Lab 1" },
    ],
    previousCourses: ["Algorithms", "Programming Logic", "Discrete Mathematics"],
  },
  {
    id: 2, firstName: "Prof. Marco", middleName: "Rivera", lastName: "Aquino",
    email: "marco.aquino@uni.edu.ph", mobile: "+63 918 999 2233",
    sex: "Male", department: "Information Technology",
    employmentType: "Full-time", status: "Active",
    avatar: "MA",
    education: [
      { degree: "MS Information Technology", school: "Ateneo de Manila University", year: "2012" },
      { degree: "BS Computer Engineering", school: "FEU Tech", year: "2008" },
    ],
    jobHistory: [
      { position: "Assistant Professor", institution: "University", from: "2012", to: "Present" },
      { position: "Web Developer", institution: "TechStart Inc.", from: "2008", to: "2012" },
    ],
    organizations: ["Philippine Web Academy"],
    extracurriculars: ["Photography Society"],
    currentCourses: [
      { code: "IT201", name: "Web Development", section: "BSIT-2B", schedule: "MWF 8:30-9:30", room: "Lab 3" },
      { code: "IT203", name: "Systems Analysis", section: "BSIT-2B", schedule: "MWF 1:30-2:30", room: "Room 201" },
    ],
    previousCourses: ["Networking Basics", "Mobile Development", "UI/UX Design"],
  },
];

const STATS = [
  { label: "Total Students", value: "1,248", delta: "+34 this sem", icon: "👨‍🎓", color: "#6C63FF" },
  { label: "Active Faculty", value: "87", delta: "+3 new", icon: "👩‍🏫", color: "#00C9A7" },
  { label: "Programs Offered", value: "12", delta: "4 colleges", icon: "🎓", color: "#F59E0B" },
  { label: "Avg. GWA", value: "1.82", delta: "↑ 0.05 vs last", icon: "📊", color: "#EF4444" },
];

// ============================================================
// UTILITY HELPERS
// ============================================================
const gradeColor = (g) => {
  if (!g) return "#6B7280";
  if (g <= 1.5) return "#00C9A7";
  if (g <= 2.0) return "#6C63FF";
  if (g <= 2.5) return "#F59E0B";
  return "#EF4444";
};
const statusPill = (s) => {
  const map = {
    Active: { bg: "#d1fae5", color: "#065f46" },
    Probationary: { bg: "#fef3c7", color: "#92400e" },
    Inactive: { bg: "#fee2e2", color: "#991b1b" },
    Enrolled: { bg: "#dbeafe", color: "#1e40af" },
    Passed: { bg: "#d1fae5", color: "#065f46" },
    Failed: { bg: "#fee2e2", color: "#991b1b" },
  };
  return map[s] || { bg: "#f3f4f6", color: "#374151" };
};

// ============================================================
// COMPONENTS
// ============================================================

function Avatar({ initials, size = 40, color = "#6C63FF" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.34,
      fontFamily: "'Sora', sans-serif", flexShrink: 0,
      boxShadow: `0 4px 14px ${color}44`,
    }}>{initials}</div>
  );
}

function StatCard({ stat }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "22px 24px",
      boxShadow: "0 2px 20px rgba(0,0,0,0.07)", display: "flex",
      alignItems: "center", gap: 18, flex: "1 1 200px", minWidth: 0,
      borderTop: `4px solid ${stat.color}`,
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.07)"; }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14, fontSize: 26,
        background: `${stat.color}18`, display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{stat.icon}</div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.1 }}>{stat.value}</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{stat.label}</div>
        <div style={{ fontSize: 11, color: stat.color, fontWeight: 600, marginTop: 3 }}>{stat.delta}</div>
      </div>
    </div>
  );
}

function Badge({ text, bg, color }) {
  return (
    <span style={{
      background: bg, color, padding: "3px 10px", borderRadius: 999,
      fontSize: 11, fontWeight: 600, display: "inline-block",
    }}>{text}</span>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative", flex: 1 }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#9CA3AF" }}>🔍</span>
      <input value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        style={{
          width: "100%", padding: "10px 12px 10px 38px", border: "1.5px solid #E5E7EB",
          borderRadius: 10, fontSize: 14, outline: "none", background: "#F9FAFB",
          fontFamily: "inherit", boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = "#6C63FF"}
        onBlur={e => e.target.style.borderColor = "#E5E7EB"}
      />
    </div>
  );
}

function FilterSelect({ value, onChange, options, label }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{
        padding: "10px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10,
        fontSize: 13, background: "#F9FAFB", fontFamily: "inherit",
        color: "#374151", cursor: "pointer", outline: "none",
      }}>
      <option value="">{label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 13, color: "#9CA3AF", margin: "4px 0 0 0" }}>{subtitle}</p>}
    </div>
  );
}

function GradeBar({ value }) {
  const pct = value ? Math.max(0, Math.min(100, ((5 - value) / 4) * 100)) : 0;
  const col = gradeColor(value);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 99, background: "#F3F4F6", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: col, borderRadius: 99, transition: "width 0.5s" }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: col, minWidth: 32 }}>{value ?? "—"}</span>
    </div>
  );
}

// ---- STUDENT TABLE ----
function StudentTable({ students, onSelect }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 14, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", background: "#fff" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ background: "#F9FAFB", borderBottom: "2px solid #E5E7EB" }}>
            {["Student", "Program / Year", "Section", "GWA", "Status", ""].map(h => (
              <th key={h} style={{ padding: "13px 18px", textAlign: "left", fontWeight: 700, color: "#374151", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => {
            const pill = statusPill(s.status);
            return (
              <tr key={s.id} style={{ borderBottom: "1px solid #F3F4F6", transition: "background 0.15s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F5F3FF"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
                onClick={() => onSelect(s)}>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar initials={s.avatar} size={38} color={["#6C63FF","#00C9A7","#F59E0B","#EF4444"][i % 4]} />
                    <div>
                      <div style={{ fontWeight: 700, color: "#1a1a2e" }}>{s.firstName} {s.lastName}</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF" }}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 18px", color: "#374151" }}>{s.program}<br /><span style={{ fontSize: 12, color: "#9CA3AF" }}>Year {s.yearLevel}</span></td>
                <td style={{ padding: "14px 18px" }}><Badge text={s.section} bg="#EEF2FF" color="#6C63FF" /></td>
                <td style={{ padding: "14px 18px", minWidth: 120 }}><GradeBar value={s.gwa} /></td>
                <td style={{ padding: "14px 18px" }}><Badge text={s.status} bg={pill.bg} color={pill.color} /></td>
                <td style={{ padding: "14px 18px" }}>
                  <button onClick={e => { e.stopPropagation(); onSelect(s); }} style={{
                    background: "#6C63FF", color: "#fff", border: "none", borderRadius: 8,
                    padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}>View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---- FACULTY TABLE ----
function FacultyTable({ faculty, onSelect }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 14, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", background: "#fff" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ background: "#F9FAFB", borderBottom: "2px solid #E5E7EB" }}>
            {["Faculty", "Department", "Type", "Current Courses", "Status", ""].map(h => (
              <th key={h} style={{ padding: "13px 18px", textAlign: "left", fontWeight: 700, color: "#374151", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {faculty.map((f, i) => {
            const pill = statusPill(f.status);
            return (
              <tr key={f.id} style={{ borderBottom: "1px solid #F3F4F6", transition: "background 0.15s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F0FDF4"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
                onClick={() => onSelect(f)}>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar initials={f.avatar} size={38} color={["#00C9A7","#6C63FF"][i % 2]} />
                    <div>
                      <div style={{ fontWeight: 700, color: "#1a1a2e" }}>{f.firstName} {f.lastName}</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF" }}>{f.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 18px", color: "#374151" }}>{f.department}</td>
                <td style={{ padding: "14px 18px" }}><Badge text={f.employmentType} bg="#EEF2FF" color="#6C63FF" /></td>
                <td style={{ padding: "14px 18px", color: "#374151" }}>{f.currentCourses.length} course{f.currentCourses.length !== 1 ? "s" : ""}</td>
                <td style={{ padding: "14px 18px" }}><Badge text={f.status} bg={pill.bg} color={pill.color} /></td>
                <td style={{ padding: "14px 18px" }}>
                  <button onClick={e => { e.stopPropagation(); onSelect(f); }} style={{
                    background: "#00C9A7", color: "#fff", border: "none", borderRadius: 8,
                    padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}>View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---- STUDENT PROFILE PANEL ----
function StudentProfile({ student, onClose }) {
  const [tab, setTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "📋 Overview" },
    { id: "academic", label: "📚 Academic" },
    { id: "activities", label: "🏅 Activities" },
    { id: "education", label: "🎓 Background" },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,15,30,0.55)", backdropFilter: "blur(4px)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 780,
        maxHeight: "90vh", overflow: "auto", boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
        animation: "slideUp 0.25s ease",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #6C63FF, #4f46e5)", padding: "28px 32px", borderRadius: "20px 20px 0 0", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, border: "3px solid rgba(255,255,255,0.5)" }}>{student.avatar}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{student.firstName} {student.middleName} {student.lastName}</div>
                <div style={{ opacity: 0.85, fontSize: 14, marginTop: 4 }}>{student.program} · Year {student.yearLevel} · {student.section}</div>
                <div style={{ marginTop: 8 }}><Badge text={student.status} bg="rgba(255,255,255,0.25)" color="#fff" /></div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 22 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? "#fff" : "rgba(255,255,255,0.18)", border: "none",
                color: tab === t.id ? "#6C63FF" : "#fff", padding: "7px 16px", borderRadius: 8,
                fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: "28px 32px" }}>
          {tab === "overview" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  ["Full Name", `${student.firstName} ${student.middleName} ${student.lastName}`],
                  ["Sex", student.sex],
                  ["Email", student.email],
                  ["Mobile", student.mobile],
                  ["Address", student.address],
                  ["Guardian", `${student.guardian} · ${student.guardianContact}`],
                  ["Program", student.program],
                  ["GWA", student.gwa],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "#F9FAFB", borderRadius: 12, padding: "14px 18px" }}>
                    <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700, marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 14, color: "#1a1a2e", fontWeight: 600 }}>{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "academic" && (
            <div>
              <SectionHeader title="Enrolled Subjects" subtitle="Current and completed courses" />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: "#F9FAFB" }}>
                      {["Code", "Subject", "Units", "Schedule", "Grade", "Status"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#6B7280", fontSize: 12, textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {student.subjects.map(sub => {
                      const pill = statusPill(sub.status);
                      return (
                        <tr key={sub.code} style={{ borderBottom: "1px solid #F3F4F6" }}>
                          <td style={{ padding: "12px 14px", fontWeight: 700, color: "#6C63FF" }}>{sub.code}</td>
                          <td style={{ padding: "12px 14px" }}>{sub.name}</td>
                          <td style={{ padding: "12px 14px", textAlign: "center" }}>{sub.units}</td>
                          <td style={{ padding: "12px 14px", fontSize: 12, color: "#6B7280" }}>{sub.schedule}</td>
                          <td style={{ padding: "12px 14px", minWidth: 100 }}><GradeBar value={sub.grade} /></td>
                          <td style={{ padding: "12px 14px" }}><Badge text={sub.status} bg={pill.bg} color={pill.color} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "activities" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { title: "🏛️ Organizations", items: student.organizations },
                { title: "🎭 Extra-Curriculars", items: student.extracurriculars },
                { title: "⚽ Sports", items: student.sports },
                { title: "🏆 Awards & Recognition", items: student.awards },
              ].map(({ title, items }) => (
                <div key={title} style={{ background: "#F9FAFB", borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>{title}</div>
                  {items.length ? items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6C63FF", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
                    </div>
                  )) : <span style={{ fontSize: 13, color: "#9CA3AF" }}>None recorded</span>}
                </div>
              ))}
            </div>
          )}

          {tab === "education" && (
            <div>
              <SectionHeader title="Educational Background" />
              {student.education.map((ed, i) => (
                <div key={i} style={{ background: "#F9FAFB", borderRadius: 14, padding: "20px 24px", marginBottom: 14, borderLeft: "4px solid #6C63FF" }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a2e" }}>{ed.school}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{ed.level} · Graduated {ed.year}</div>
                  {ed.awards && <div style={{ marginTop: 8 }}><Badge text={ed.awards} bg="#EEF2FF" color="#6C63FF" /></div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- FACULTY PROFILE PANEL ----
function FacultyProfile({ faculty, onClose }) {
  const [tab, setTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "📋 Overview" },
    { id: "courses", label: "📚 Courses" },
    { id: "activities", label: "🏛️ Activities" },
    { id: "history", label: "💼 History" },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,15,30,0.55)", backdropFilter: "blur(4px)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 780,
        maxHeight: "90vh", overflow: "auto", boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
        animation: "slideUp 0.25s ease",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ background: "linear-gradient(135deg, #00C9A7, #00957a)", padding: "28px 32px", borderRadius: "20px 20px 0 0", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, border: "3px solid rgba(255,255,255,0.5)" }}>{faculty.avatar}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{faculty.firstName} {faculty.middleName} {faculty.lastName}</div>
                <div style={{ opacity: 0.85, fontSize: 14, marginTop: 4 }}>{faculty.department} · {faculty.employmentType}</div>
                <div style={{ marginTop: 8 }}><Badge text={faculty.status} bg="rgba(255,255,255,0.25)" color="#fff" /></div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 22 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? "#fff" : "rgba(255,255,255,0.18)", border: "none",
                color: tab === t.id ? "#00C9A7" : "#fff", padding: "7px 16px", borderRadius: 8,
                fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: "28px 32px" }}>
          {tab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                ["Full Name", `${faculty.firstName} ${faculty.middleName} ${faculty.lastName}`],
                ["Sex", faculty.sex],
                ["Email", faculty.email],
                ["Mobile", faculty.mobile],
                ["Department", faculty.department],
                ["Employment", faculty.employmentType],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#F9FAFB", borderRadius: 12, padding: "14px 18px" }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: "#1a1a2e", fontWeight: 600 }}>{v}</div>
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1", background: "#F9FAFB", borderRadius: 12, padding: "14px 18px" }}>
                <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Education</div>
                {faculty.education.map((e, i) => (
                  <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < faculty.education.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                    <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14 }}>{e.degree}</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>{e.school} · {e.year}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "courses" && (
            <div>
              <SectionHeader title="Current Teaching Load" />
              {faculty.currentCourses.map(c => (
                <div key={c.code} style={{ background: "#F0FDF4", border: "1px solid #d1fae5", borderRadius: 12, padding: "16px 20px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#065f46" }}>{c.code} — {c.name}</div>
                    <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{c.section} · {c.schedule}</div>
                  </div>
                  <Badge text={c.room} bg="#d1fae5" color="#065f46" />
                </div>
              ))}
              <SectionHeader title="Previously Taught" subtitle="Historical course record" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {faculty.previousCourses.map(c => <Badge key={c} text={c} bg="#EEF2FF" color="#6C63FF" />)}
              </div>
            </div>
          )}

          {tab === "activities" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { title: "🏛️ Organizations", items: faculty.organizations },
                { title: "🎭 Extra-Curriculars", items: faculty.extracurriculars },
              ].map(({ title, items }) => (
                <div key={title} style={{ background: "#F9FAFB", borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>{title}</div>
                  {items.length ? items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C9A7", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
                    </div>
                  )) : <span style={{ fontSize: 13, color: "#9CA3AF" }}>None recorded</span>}
                </div>
              ))}
            </div>
          )}

          {tab === "history" && (
            <div>
              <SectionHeader title="Job History" />
              {faculty.jobHistory.map((j, i) => (
                <div key={i} style={{ background: "#F9FAFB", borderRadius: 14, padding: "18px 22px", marginBottom: 14, borderLeft: "4px solid #00C9A7", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>{j.position}</div>
                    <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{j.institution}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Badge text={`${j.from} – ${j.to}`} bg="#d1fae5" color="#065f46" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- DASHBOARD PAGE ----
function DashboardPage() {
  return (
    <div>
      <SectionHeader title="Dashboard Overview" subtitle="Academic Year 2024–2025 · 2nd Semester" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 32 }}>
        {STATS.map(s => <StatCard key={s.label} stat={s} />)}
      </div>

      {/* Quick student table */}
      <SectionHeader title="Recent Students" subtitle="Latest additions to the system" />
      <div style={{ overflowX: "auto", borderRadius: 14, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "2px solid #E5E7EB" }}>
              {["Student", "Program", "GWA", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 18px", textAlign: "left", fontWeight: 700, color: "#374151", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_STUDENTS.slice(0, 4).map((s, i) => {
              const pill = statusPill(s.status);
              return (
                <tr key={s.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                  <td style={{ padding: "13px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar initials={s.avatar} size={34} color={["#6C63FF","#00C9A7","#F59E0B","#EF4444"][i % 4]} />
                      <div style={{ fontWeight: 600, color: "#1a1a2e" }}>{s.firstName} {s.lastName}</div>
                    </div>
                  </td>
                  <td style={{ padding: "13px 18px", color: "#6B7280" }}>{s.program}</td>
                  <td style={{ padding: "13px 18px", minWidth: 100 }}><GradeBar value={s.gwa} /></td>
                  <td style={{ padding: "13px 18px" }}><Badge text={s.status} bg={pill.bg} color={pill.color} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Program Distribution */}
      <div style={{ marginTop: 28 }}>
        <SectionHeader title="Program Distribution" subtitle="Student count per program" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {[
            { prog: "BS Computer Science", count: 480, color: "#6C63FF" },
            { prog: "BS Information Technology", count: 390, color: "#00C9A7" },
            { prog: "BS Information Systems", count: 210, color: "#F59E0B" },
            { prog: "BS Computer Engineering", count: 168, color: "#EF4444" },
          ].map(p => (
            <div key={p.prog} style={{ background: "#fff", borderRadius: 14, padding: "18px 22px", flex: "1 1 200px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: p.color }}>{p.count}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{p.prog}</div>
              <div style={{ marginTop: 10, height: 6, borderRadius: 99, background: "#F3F4F6" }}>
                <div style={{ width: `${(p.count / 500) * 100}%`, height: "100%", background: p.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- STUDENTS PAGE ----
function StudentsPage() {
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = MOCK_STUDENTS.filter(s => {
    const q = search.toLowerCase();
    const matchQ = !q || `${s.firstName} ${s.lastName} ${s.email} ${s.section}`.toLowerCase().includes(q);
    const matchProg = !program || s.program === program;
    const matchYear = !yearLevel || String(s.yearLevel) === yearLevel;
    const matchStat = !statusFilter || s.status === statusFilter;
    return matchQ && matchProg && matchYear && matchStat;
  });

  return (
    <div>
      <SectionHeader title="Student Profiles" subtitle={`${MOCK_STUDENTS.length} students registered`} />
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, section..." />
        <FilterSelect value={program} onChange={setProgram} options={["BS Computer Science", "BS Information Technology", "BS Information Systems"]} label="All Programs" />
        <FilterSelect value={yearLevel} onChange={setYearLevel} options={["1", "2", "3", "4"]} label="Year Level" />
        <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["Active", "Probationary", "Inactive"]} label="Status" />
      </div>
      <StudentTable students={filtered} onSelect={setSelected} />
      {selected && <StudentProfile student={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ---- FACULTY PAGE ----
function FacultyPage() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = MOCK_FACULTY.filter(f => {
    const q = search.toLowerCase();
    const matchQ = !q || `${f.firstName} ${f.lastName} ${f.email}`.toLowerCase().includes(q);
    const matchDept = !dept || f.department === dept;
    return matchQ && matchDept;
  });

  return (
    <div>
      <SectionHeader title="Faculty Profiles" subtitle={`${MOCK_FACULTY.length} faculty members registered`} />
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email..." />
        <FilterSelect value={dept} onChange={setDept} options={["Computer Science", "Information Technology", "Information Systems"]} label="All Departments" />
      </div>
      <FacultyTable faculty={filtered} onSelect={setSelected} />
      {selected && <FacultyProfile faculty={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
const NAV_ITEMS = [
  { id: "dashboard", icon: "⚡", label: "Dashboard" },
  { id: "students", icon: "👨‍🎓", label: "Students" },
  { id: "faculty", icon: "👩‍🏫", label: "Faculty" },
  { id: "reports", icon: "📊", label: "Reports", soon: true },
  { id: "analytics", icon: "📈", label: "Analytics", soon: true },
  { id: "settings", icon: "⚙️", label: "Settings", soon: true },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Sora', sans-serif; background: #F4F5F9; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #F3F4F6; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

        {/* SIDEBAR */}
        <aside style={{
          width: sidebarOpen ? 240 : 68, flexShrink: 0,
          background: "#1a1a2e", color: "#fff",
          display: "flex", flexDirection: "column",
          transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden",
        }}>
          {/* Logo */}
          <div style={{ padding: "24px 20px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6C63FF,#9d99ff)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>🎓</div>
            {sidebarOpen && (
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>EduProfile</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Student Management</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: "16px 10px", overflow: "auto" }}>
            {NAV_ITEMS.map(item => {
              const active = page === item.id;
              return (
                <button key={item.id} onClick={() => !item.soon && setPage(item.id)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "11px 12px", borderRadius: 10, marginBottom: 4,
                  background: active ? "linear-gradient(90deg,#6C63FF22,#6C63FF11)" : "transparent",
                  border: active ? "1px solid rgba(108,99,255,0.35)" : "1px solid transparent",
                  color: active ? "#a5b4fc" : item.soon ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)",
                  cursor: item.soon ? "not-allowed" : "pointer", transition: "all 0.18s",
                  textAlign: "left", fontFamily: "inherit", fontSize: 14, fontWeight: active ? 700 : 500,
                }}
                  onMouseEnter={e => { if (!active && !item.soon) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  {sidebarOpen && (
                    <span style={{ flex: 1 }}>{item.label}
                      {item.soon && <span style={{ fontSize: 10, marginLeft: 6, background: "rgba(255,255,255,0.12)", padding: "1px 6px", borderRadius: 99 }}>Soon</span>}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User */}
          <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#9d99ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>AD</div>
            {sidebarOpen && (
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Administrator</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>admin@uni.edu.ph</div>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* TOPBAR */}
          <header style={{
            height: 64, background: "#fff", borderBottom: "1px solid #E5E7EB",
            display: "flex", alignItems: "center", padding: "0 28px", gap: 16,
            boxShadow: "0 1px 8px rgba(0,0,0,0.04)", flexShrink: 0,
          }}>
            <button onClick={() => setSidebarOpen(o => !o)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 20, padding: 4, color: "#6B7280", borderRadius: 8,
              display: "flex", alignItems: "center",
            }}>
              {sidebarOpen ? "◀" : "▶"}
            </button>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>
                {NAV_ITEMS.find(n => n.id === page)?.label || "Dashboard"}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ background: "#F3F4F6", borderRadius: 10, padding: "7px 14px", fontSize: 13, color: "#6B7280", fontWeight: 600 }}>
                📅 AY 2024–2025
              </div>
              <div style={{ width: 1, height: 24, background: "#E5E7EB" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar initials="AD" size={36} color="#6C63FF" />
                <div style={{ fontSize: 13 }}>
                  <div style={{ fontWeight: 700, color: "#1a1a2e" }}>Admin</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>Super Admin</div>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>
            {page === "dashboard" && <DashboardPage />}
            {page === "students" && <StudentsPage />}
            {page === "faculty" && <FacultyPage />}
            {(page === "reports" || page === "analytics" || page === "settings") && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 16 }}>
                <div style={{ fontSize: 64 }}>🚧</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>Coming Soon</div>
                <div style={{ color: "#9CA3AF", fontSize: 14 }}>This module is under development</div>
                <button onClick={() => setPage("dashboard")} style={{ background: "#6C63FF", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>← Back to Dashboard</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}