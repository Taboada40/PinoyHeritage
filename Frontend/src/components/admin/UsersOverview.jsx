import React, { useState } from "react";
import "../../styles/admin/users.css"; 

// --- Icons (Kept exactly as they were) ---
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C6C6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const ArrowLeft = () => (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
    <path d="M1 6.36401C0.447715 6.36401 0 6.81173 0 7.36401C0 7.9163 0.447715 8.36401 1 8.36401V7.36401V6.36401ZM20.7071 8.07112C21.0976 7.6806 21.0976 7.04743 20.7071 6.65691L14.3431 0.292946C13.9526 -0.0975785 13.3195 -0.0975785 12.9289 0.292946C12.5384 0.68347 12.5384 1.31664 12.9289 1.70716L18.5858 7.36401L12.9289 13.0209C12.5384 13.4114 12.5384 14.0446 12.9289 14.4351C13.3195 14.8256 13.9526 14.8256 14.3431 14.4351L20.7071 8.07112ZM1 7.36401V8.36401H20V7.36401V6.36401H1V7.36401Z" fill="#0038A8" transform="scale(-1, 1) translate(-21, 0)"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
     <path d="M1 6.36401C0.447715 6.36401 0 6.81173 0 7.36401C0 7.9163 0.447715 8.36401 1 8.36401V7.36401V6.36401ZM20.7071 8.07112C21.0976 7.6806 21.0976 7.04743 20.7071 6.65691L14.3431 0.292946C13.9526 -0.0975785 13.3195 -0.0975785 12.9289 0.292946C12.5384 0.68347 12.5384 1.31664 12.9289 1.70716L18.5858 7.36401L12.9289 13.0209C12.5384 13.4114 12.5384 14.0446 12.9289 14.4351C13.3195 14.8256 13.9526 14.8256 14.3431 14.4351L20.7071 8.07112ZM1 7.36401V8.36401H20V7.36401V6.36401H1V7.36401Z" fill="#0038A8"/>
  </svg>
);

const UsersOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { name: "Marc Benn Secong", email: "mb.secong@gmail.com", address: "Cebu City", phone: "0923-098-0987" },
    { name: "Munchkin Taboada", email: "munchtb@gmail.com", address: "Las Piñas City", phone: "0932-432-1029" },
    { name: "Niña Villadarez", email: "nvlldrx@gmail.com", address: "Quezon City", phone: "0926-457-6229" },
    { name: "Sharbelle Farenheit", email: "sharbzff@gmail.com", address: "Davao City", phone: "0911-080-9232" },
    { name: "Princess Celcius", email: "celciusPP@gmail.com", address: "Bacolod City", phone: "0945-655-9207" },
    { name: "Minji Kim", email: "kminjik@gmail.com", address: "Seoul City", phone: "0965-918-1137" },
    { name: "Kyle Yu", email: "kk_yuk@gmail.com", address: "Marikina City", phone: "0908-509-6901" },
    { name: "Heineka Go", email: "hein.g0@gmail.com", address: "Alabang", phone: "0921-350-8768" },
  ];

  // 1. Logic to filter users based on the search term
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.address.toLowerCase().includes(term) ||
      user.phone.includes(term)
    );
  });

  return (
    <div className="users-container">
      {/* Header */}
      <div className="users-header-top">
        {/* Updated to show the filtered count */}
        <h2 className="users-title">Users ({filteredUsers.length})</h2>
        <div className="users-search-wrapper">
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Search user" 
            className="users-search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Headers */}
      <div className="users-table-header">
        <div className="col-name">Name</div>
        <div className="col-email">Email</div>
        <div className="col-address">Address</div>
        <div className="col-phone">Phone Number</div>
        <div className="col-actions">Actions</div>
      </div>

      <div className="users-divider"></div>

      {/* Table List */}
      <div className="users-list">
        {/* 2. Check if we have results */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={index}>
              <div className="users-row">
                <div className="col-name">{user.name}</div>
                <div className="col-email">{user.email}</div>
                <div className="col-address">{user.address}</div>
                <div className="col-phone">{user.phone}</div>
                <div className="col-actions view-action">
                  <EyeIcon />
                  <span>View only</span>
                </div>
              </div>
              {/* 3. Updated divider logic to use filteredUsers length */}
              {index !== filteredUsers.length - 1 && <div className="users-divider light"></div>}
            </div>
          ))
        ) : (
          /* Optional: Display when no results found */
          <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            No users found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="users-pagination">
        <button className="nav-btn"><ArrowLeft /></button>
        <span className="page-info">Page 1 of 15</span>
        <button className="nav-btn"><ArrowRight /></button>
      </div>
    </div>
  );
};

export default UsersOverview;