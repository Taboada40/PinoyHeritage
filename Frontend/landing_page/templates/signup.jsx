import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/auth.css";

function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <Link to="/" className="back-icon" aria-label="Back to Home">
            ←
          </Link>
          <h2>Sign Up</h2>
        </div>

        <form className="auth-form">
          <div className="form-row">
            <div className="form-group half-width">
              <label>First Name</label>
              <input type="text" placeholder="First Name" required />
            </div>

            <div className="form-group half-width">
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm Password" required />
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
