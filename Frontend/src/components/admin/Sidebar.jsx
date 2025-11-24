import React from "react";
import { Link, NavLink } from "react-router-dom"; // 1. Import NavLink

import userImg from "../../assets/icons/sidebar/users.png";
import manageImg from "../../assets/icons/sidebar/manage.png"; 
import homeImg from "../../assets/icons/sidebar/home.png"; 
import logoutImg from "../../assets/icons/sidebar/logout.png";

const Sidebar = () => (
  <aside className="sidebar">
    {/* Logo Link */}
    <Link to="/" className="logo-admin">
      <div className="logo-icon">PH</div>
      <span className="landing">Pinoy Heritage</span>
    </Link>

    <nav className="sidebar-menu">
      {/* Dashboard Link */}
      <NavLink 
        to="/admin/dashboard" 
        className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
      >
        <span className="menu-icon">
          <img src={homeImg} alt="Dashboard" className="icon-img" /> 
        </span>
        <span>Dashboard</span>
      </NavLink>

      {/* Users Link -> Redirects to Users Overview */}
      <NavLink 
        to="/admin/users" 
        className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
      >
        <span className="menu-icon">
          <img src={userImg} alt="Users" className="icon-img" /> 
        </span>
        <span>Users</span>
      </NavLink>

      {/* Manage Link -> Redirects to Manage Products */}
      <NavLink 
        to="/admin/products" 
        className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
      >
        <span className="menu-icon">
          <img src={manageImg} alt="Manage" className="icon-img" /> 
        </span>
        <span>Manage</span>
      </NavLink>
    </nav>

    {/* Logout Link */}
    <Link to="/" className="menu-item logout-item">
      <span className="menu-icon">
        <img src={logoutImg} alt="Logout" className="icon-img" /> 
      </span>
      <span>Logout</span>
    </Link>
  </aside>
);

export default Sidebar;