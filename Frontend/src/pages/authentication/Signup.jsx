import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext.jsx";
import "../../styles/auth/auth.css";

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for toggle
  const { notifySuccess, notifyError } = useNotification();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/customer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        notifySuccess("Registration successful!", { title: "Welcome" });
        navigate("/login");
      } else {
        notifyError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      notifyError("Error signing up. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <Link to="/" className="back-icon">←</Link>
          <h2>Sign Up</h2>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Username</label>
            <input type="text" name="username" onChange={handleChange} required />
          </div>
          <div className="auth-form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="auth-form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <button type="submit" className="auth-btn">Sign Up</button>
          <p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;