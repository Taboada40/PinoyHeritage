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

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" }); 
  const [showPassword, setShowPassword] = useState(false); // State for toggle
  const [error, setError] = useState("");
  const { notifySuccess, notifyError } = useNotification();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.identifier, password: formData.password }),
      });

      if (res.ok) {
        const data = await res.json();
        notifySuccess(`Welcome ${data.username}`);

        let role = data.role;

        if (!role && formData.identifier === "admin@pinoyheritage.com" && formData.password === "admin12345") {
          role = "ADMIN";
        }

        if (role === "ADMIN") {
          localStorage.removeItem("userId");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.removeItem("user");
          localStorage.setItem("role", "ADMIN");
          navigate("/admin/dashboard");
        } else {
          localStorage.removeItem("guestCart");
          localStorage.setItem("userId", data.id); 
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          localStorage.setItem(
            "user",
            JSON.stringify({ id: data.id, username: data.username, email: data.email, role: role })
          );
          if (role) localStorage.setItem("role", role);
          navigate("/home");
        }
      } else {
        setError("Invalid credentials or login failed.");
        notifyError("Invalid credentials or login failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Error logging in or connecting to the server.");
      notifyError("Error logging in or connecting to the server.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <Link to="/" className="back-icon">←</Link>
          <h2>Login</h2>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          
          <div className="auth-form-group">
            <label>Email</label>
            <input 
              type="text" 
              name="identifier" 
              value={formData.identifier}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="auth-form-group">
            <label>Password </label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password}
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
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="auth-btn">Login</button>
          <p className="auth-footer">Don’t have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;