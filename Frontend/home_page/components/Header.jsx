import React from "react";
import "../assets/styles/homepage.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">PH</div>
            <span>Pinoy Heritage</span>
          </div>

          <div className="nav-icons">
            <button className="search-btn" aria-label="Search"></button>
            <button className="cart-btn" aria-label="Cart"></button>
            <button className="acc-btn" aria-label="Account"></button>
            <Link to="/login" className="login-text">Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
