import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Sidebar from "./components/Sidebar";
// import TopNavbar from "./components/Navbar";

import DashboardPage from "./pages/Dashboard";
import StudentPage from "./pages/StudentPage";
import FacultyPage from "./pages/FacultyPage";
// import StudentsPage from "./pages/StudentPage";
// import FacultyPage from "./pages/FacultyPage";

export default function App() {
  return (
    <Router>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
               <Route path="/students" element={<StudentPage />} />
               <Route path="faculty" element={<FacultyPage />} />
            </Routes>
    </Router>
  );
}