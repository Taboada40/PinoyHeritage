import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import homeImg from "../../assets/icons/sidebar/home.png";
import userImg from "../../assets/icons/sidebar/users.png";
import ordersImg from "../../assets/icons/sidebar/manage.png";
import logoutImg from "../../assets/icons/sidebar/logout.png";

const ProfileSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Clear customer-related session data
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Logo Link */}
      <Link to="/" className="logo-admin">
        <div className="logo-icon">PH</div>
        <span className="landing">Pinoy Heritage</span>
      </Link>

      <nav className="sidebar-menu">
        {/* Home Link */}
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
        >
          <span className="menu-icon">
            <img src={homeImg} alt="Home" className="icon-img" />
          </span>
          <span>Home</span>
        </NavLink>

        {/* Profile Link */}
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
        >
          <span className="menu-icon">
            <img src={userImg} alt="Profile" className="icon-img" />
          </span>
          <span>Profile</span>
        </NavLink>

        {/* Orders Link (reusing payment page as Orders for now) */}
        <NavLink
          to="/payment"
          className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
        >
          <span className="menu-icon">
            <img src={ordersImg} alt="Orders" className="icon-img" />
          </span>
          <span>Orders</span>
        </NavLink>
      </nav>

      {/* Logout - match admin Link structure & style */}
      <Link to="/" className="menu-item logout-item" onClick={handleLogout}>
        <span className="menu-icon">
          <img src={logoutImg} alt="Logout" className="icon-img" />
        </span>
        <span>Logout</span>
      </Link>
    </aside>
  );
};

export default ProfileSidebar;
