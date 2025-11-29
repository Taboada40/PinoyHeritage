import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/auth.css";

function Login() {

  const navigate = useNavigate();
  // Changed to use username/email and password for consistency with forms
  const [formData, setFormData] = useState({ identifier: "", password: "" }); 
  const [error, setError] = useState("");

  const handleChange = (e) => {
    // Uses a generic name 'identifier' for the input field to capture either email or username
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Assuming your customer API expects 'email' and 'password'
        body: JSON.stringify({ email: formData.identifier, password: formData.password }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Welcome ${data.username}`);

        let role = data.role;

        // Fallback: treat this specific account as ADMIN even if role is missing
        if (!role && formData.identifier === "admin@pinoyheritage.com" && formData.password === "admin12345") {
          role = "ADMIN";
        }

        // Store data differently for admin vs customer
        if (role === "ADMIN") {
          // Clear any previous customer session so admin is NOT treated as a customer
          localStorage.removeItem("userId");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.removeItem("user");

          localStorage.setItem("role", "ADMIN");
          navigate("/admin/dashboard");
        } else {
          // Customer session: clear any previous guest cart and store user info + role
          localStorage.removeItem("guestCart");

          // Customer session: store user info + role
          localStorage.setItem("userId", data.id); 
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          localStorage.setItem(
            "user",
            JSON.stringify({ id: data.id, username: data.username, email: data.email, role: role })
          );

          if (role) {
            localStorage.setItem("role", role);
          }

          navigate("/home");
        }
      } else {
        setError("Invalid credentials or login failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Error logging in or connecting to the server.");
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
              type="text" // Changed to 'text' to accept 'admin' username
              name="identifier" 
              value={formData.identifier}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="auth-form-group">
            <label>Password </label>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange} 
              required 
            />
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
