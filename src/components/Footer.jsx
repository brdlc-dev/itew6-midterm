import React from 'react'
import './componentStyles/Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <i className="bi bi-mortarboard-fill"></i>
              <h3>CCS Profiling System</h3>
            </div>
            <p className="footer-description">
              Comprehensive Student Profiling System for Educational Institutions
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" title="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link" title="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="social-link" title="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Dashboard</a></li>
              <li><a href="/students">Students</a></li>
              <li><a href="/faculty">Faculty</a></li>
              <li><a href="#">Reports</a></li>
            </ul>
          </div>

          {/* Features */}
          <div className="footer-section">
            <h4 className="footer-title">Features</h4>
            <ul className="footer-links">
              <li><a href="#">Student Management</a></li>
              <li><a href="#">Faculty Directory</a></li>
              <li><a href="#">Program Tracking</a></li>
              <li><a href="#">Analytics</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Middle Section - Stats */}
        <div className="footer-stats">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Faculty</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Programs</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} EduProfile. All rights reserved.</p>
          </div>
          <div className="footer-contact">
            <span><i className="bi bi-envelope"></i> support@eduprofile.com</span>
            <span className="divider">•</span>
            <span><i className="bi bi-telephone"></i> +1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer