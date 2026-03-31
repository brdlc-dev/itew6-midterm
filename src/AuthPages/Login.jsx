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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // --- FAKE login token for demo purposes ---
      const role = formData.email.includes("admin") ? "admin" : "student"; // demo role based on email
      const fakeToken = btoa(
        JSON.stringify({ email: formData.email, role, timestamp: Date.now() }),
      );

      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userRole", role);

      setSuccessMessage("✓ Login successful! Redirecting to dashboard...");
      setFormData({ email: "", password: "" });

      if (setIsAuthenticated) setIsAuthenticated(true);

      // Redirect to dashboard
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
        <div className="login-branding">
          <div className="branding-content">
            <div className="branding-icon">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <h1>CCS - COMPREHENSIVE PROFILING SYSTEM</h1>
            <p>Comprehensive Student Profiling System</p>
          </div>
        </div>

        <div className="login-form-section">
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {errors.general && (
            <div className="error-banner">{errors.general}</div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p className="form-subtitle">Sign in to your account</p>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className={errors.email ? "input-error" : ""}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={errors.password ? "input-error" : ""}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
