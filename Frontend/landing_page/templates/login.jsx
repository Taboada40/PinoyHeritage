import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/auth.css";

function Login() {
<<<<<<< Updated upstream
=======
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Welcome ${data.username}`);

        // store logged-in user ID in localStorage
        localStorage.setItem("userId", data.id); 
        localStorage.setItem("username", data.username); // optional
        localStorage.setItem("email", data.email);       // optional

        navigate("/profile"); // redirect to profile page
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in.");
    }
  };


>>>>>>> Stashed changes
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <Link to="/" className="back-icon" aria-label="Back to Home">
            ←
          </Link>
          <h2>Login</h2>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="auth-btn">Login</button>

          <p className="auth-footer">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
