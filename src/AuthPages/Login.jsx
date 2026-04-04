import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]",
      );

      // Check if email exists in registered users (case-insensitive)
      const user = registeredUsers.find(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase(),
      );

      if (!user) {
        setErrors({
          general: "Email not registered. Please register an account first.",
        });
        setIsLoading(false);
        return;
      }

      // Check if password matches
      if (user.password !== formData.password) {
        setErrors({
          general: "Incorrect password. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      // Successful login
      const role = formData.email.includes("admin") ? "admin" : "student";
      const fakeToken = btoa(
        JSON.stringify({
          email: formData.email,
          role,
          timestamp: Date.now(),
        }),
      );

      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userRole", role);

      setSuccessMessage("✓ Login successful! Redirecting to dashboard...");
      setFormData({ email: "", password: "" });

      if (setIsAuthenticated) setIsAuthenticated(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left - Branding (matches Register) */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="branding-icon">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <h1>CCS - COMPREHENSIVE PROFILING SYSTEM</h1>
            <p>Comprehensive Student Profiling System</p>

            <div className="branding-features">
              <div className="feature">
                <i className="bi bi-check-circle-fill"></i>
                <span>Student Management</span>
              </div>
              <div className="feature">
                <i className="bi bi-check-circle-fill"></i>
                <span>Faculty Directory</span>
              </div>
              <div className="feature">
                <i className="bi bi-check-circle-fill"></i>
                <span>Program Tracking</span>
              </div>
              <div className="feature">
                <i className="bi bi-check-circle-fill"></i>
                <span>Performance Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="login-form-section">
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {errors.general && (
            <div className="error-banner">
              <i className="bi bi-exclamation-circle-fill"></i>
              {errors.general}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p className="form-subtitle">Sign in to your account</p>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="form-input-wrapper">
                <i className="bi bi-envelope-fill"></i>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={errors.email ? "input-error" : ""}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="error-message">
                  <i className="bi bi-exclamation-circle-fill"></i>
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="form-input-wrapper">
                <i className="bi bi-lock-fill"></i>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={errors.password ? "input-error" : ""}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <span className="error-message">
                  <i className="bi bi-exclamation-circle-fill"></i>
                  {errors.password}
                </span>
              )}
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right"></i>
                  Sign In
                </>
              )}
            </button>

            <p className="form-footer">
              Don't have an account?{" "}
              <a href="/register" className="link-btn">
                Register here
              </a>
            </p>
          </form>

          <div className="login-footer">
            <p>© 2024 CCS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
