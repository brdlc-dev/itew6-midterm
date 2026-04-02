import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Login from "./AuthPages/Login";
import Register from "./AuthPages/Register";
import DashboardPage from "./pages/Dashboard";
import StudentPage from "./pages/StudentPage";
import FacultyPage from "./pages/FacultyPage";
import { AppDataProvider } from "./context/AppDataContext";

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated (from localStorage or session)
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          color: "#ff6b35",
          fontSize: "1.2rem",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AppDataProvider>
      <Router>
        <Routes>
          {/* Public Routes - Login is default */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StudentPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <FacultyPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to login or dashboard based on auth */}
          <Route
            path="*"
            element={
              <Navigate
                to={isAuthenticated ? "/dashboard" : "/login"}
                replace
              />
            }
          />
        </Routes>
      </Router>
    </AppDataProvider>
  );
}
