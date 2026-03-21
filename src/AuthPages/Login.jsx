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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // Example:
        // const response = await fetch('YOUR_API_URL/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // })
        // const data = await response.json()
        // if (data.token) {
        //   localStorage.setItem('authToken', data.token)
        //   setIsAuthenticated(true)
        // }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Create fake token for demo (replace with real token from API)
        const fakeToken = btoa(
          JSON.stringify({
            email: formData.email,
            timestamp: Date.now(),
            role: "administrator",
          }),
        );

        // Store token in localStorage
        localStorage.setItem("authToken", fakeToken);

        // Store user info (optional)
        localStorage.setItem("userEmail", formData.email);

        setSuccessMessage("✓ Login successful! Redirecting to dashboard...");
        setFormData({ email: "", password: "" });

        // Update authentication state in parent App component
        if (setIsAuthenticated) {
          setIsAuthenticated(true);
        }

        // Redirect to dashboard after success
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } catch (error) {
        setErrors({ general: "Login failed. Please try again." });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Section - Branding */}
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

        {/* Right Section - Form */}
        <div className="login-form-section">
          {/* Success Message */}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          {/* Error Message */}
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
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={errors.email ? "input-error" : ""}
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={errors.password ? "input-error" : ""}
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

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
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

          {/* Footer Links */}
          <div className="login-footer">
            <p>© 2024 EduProfile. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
