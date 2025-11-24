import "../../styles/landing/landingpage.css";
import React from "react";

// Footer.jsx
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">PH</div>
            <span>Pinoy Heritage</span>
          </div>
          <p className="footer-desc">
            Your trusted marketplace for authentic Filipino handcrafted products. Supporting local artisans since 2025.
          </p>
          <div className="social-links">
            <a href="#" className="social-btn" aria-label="Facebook">f</a>
            <a href="#" className="social-btn" aria-label="Instagram">📷</a>
            <a href="#" className="social-btn" aria-label="Twitter">🐦</a>
            <a href="#" className="social-btn" aria-label="Pinterest">P</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Shop</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">All Products</a>
            <a href="#" className="footer-link">New Arrivals</a>
            <a href="#" className="footer-link">Best Sellers</a>
            <a href="#" className="footer-link">Sale</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">Help Center</a>
            <a href="#" className="footer-link">Shipping Info</a>
            <a href="#" className="footer-link">Returns</a>
            <a href="#" className="footer-link">Contact Us</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Our Artisans</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Press</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Pinoy Heritage. All rights reserved. Made with ❤️ in the Philippines</p>
      </div>
    </footer>
  );
}

export default Footer;
