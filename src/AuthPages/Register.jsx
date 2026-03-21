import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthPages.css/Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms'
    }

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setSuccessMessage('✓ Registration successful! Redirecting to login...')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        })
        
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' })
      } finally {
        setIsLoading(false)
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Left Section - Branding */}
        <div className="register-branding">
          <div className="branding-content">
            <div className="branding-icon">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <h1>CCS</h1>
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
        <div className="register-form-section">
          {/* Success Message */}
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="error-banner">
              <i className="bi bi-exclamation-circle-fill"></i>
              {errors.general}
            </div>
          )}

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Create Account</h2>
              <p className="form-subtitle">Join our student profiling system</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="form-input-wrapper">
                  <i className="bi bi-person-fill"></i>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={errors.firstName ? 'input-error' : ''}
                    autoComplete="given-name"
                  />
                </div>
                {errors.firstName && (
                  <span className="error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="form-input-wrapper">
                  <i className="bi bi-person-fill"></i>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={errors.lastName ? 'input-error' : ''}
                    autoComplete="family-name"
                  />
                </div>
                {errors.lastName && (
                  <span className="error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="form-input-wrapper">
                <i className="bi bi-envelope-fill"></i>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={errors.email ? 'input-error' : ''}
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="form-input-wrapper">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="6+ characters"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={errors.password ? 'input-error' : ''}
                    autoComplete="new-password"
                  />
                </div>
                {errors.password && (
                  <span className="error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm</label>
                <div className="form-input-wrapper">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={errors.confirmPassword ? 'input-error' : ''}
                    autoComplete="new-password"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <label className="terms-agreement">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <span>I agree to Terms of Service and Privacy Policy</span>
            </label>
            {errors.agreeTerms && (
              <span className="error-message">
                <i className="bi bi-exclamation-circle-fill"></i>
                {errors.agreeTerms}
              </span>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus-fill"></i>
                  Create Account
                </>
              )}
            </button>

            <p className="form-footer">
              Already have an account?{' '}
              <a href="/" className="link-btn">
                Sign in here
              </a>
            </p>
          </form>

          <div className="register-footer">
            <p>© 2024 CCS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register