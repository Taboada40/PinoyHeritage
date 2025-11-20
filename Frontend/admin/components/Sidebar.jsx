import React from "react";

import userImg from "../assets/imgs/user.png";
import chartImg from "../assets/imgs/chart.png";
import bagImg from "../assets/imgs/bag.png"; // Assuming 'Manage' uses a bag/product icon
import homeImg from "../assets/imgs/home.png"; // Assuming 'Dashboard' uses a home icon
import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside className="sidebar">
    <a href="#" className="logo-admin">
      <div className="logo-icon">PH</div>
      <a href="/" className="landing">Pinoy Heritage</a>
    </a>
    <nav className="sidebar-menu">
      <a href="#" className="menu-item">
        <span className="menu-icon">
          <img src={homeImg} alt="Dashboard" className="icon-img" /> {/* Changed to homeImg */}
        </span>
        <span>Dashboard</span>
      </a>
      <a href="#" className="menu-item">
        <span className="menu-icon">
          <img src={userImg} alt="Users" className="icon-img" /> {/* Changed to userImg */}
        </span>
        <span>Users</span>
      </a>
      <a href="#" className="menu-item active">
        <span className="menu-icon">
          <img src={bagImg} alt="Manage" className="icon-img" /> {/* Changed to bagImg */}
        </span>
        <span>Manage</span>
      </a>
      <a href="#" className="menu-item">
        <span className="menu-icon">
          <img src={chartImg} alt="Monitor" className="icon-img" /> {/* Changed to chartImg */}
        </span>
        <span>Monitor</span>
      </a>
    </nav>
    <a href="/" className="menu-item logout-item">
      <span className="menu-icon"></span> 
      <span>Logout</span>
    </a>
  </aside>
);

export default Sidebar;
