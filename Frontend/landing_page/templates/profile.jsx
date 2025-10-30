import React from "react";
import Header from "../components/Header"; // <-- import your header
import "../assets/styles/profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
      {/* Header appears above the profile card */}
      <Header showNav={true} />

      {/* Profile Card */}
      <div className="profile-box">
        <div className="auth-header">
          <h2>Profile Information</h2>
        </div>

        <div className="profile-header">
          <div className="profile-image"></div>
          <div className="profile-info">
            <h3 className="profile-name">Marc Benn Gwapo</h3>
            <textarea
              className="profile-bio-input"
              defaultValue="A passionate individual who loves exploring technology and coding."
            />
          </div>
        </div>

        <form className="auth-form profile-form">
          <div className="form-row">
            <div className="form-group half-width">
              <label>First Name</label>
              <input type="text" defaultValue="Marc Benn" />
            </div>
            <div className="form-group half-width">
              <label>Last Name</label>
              <input type="text" defaultValue="Gwapo" />
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input type="text" defaultValue="marcbenn123" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue="marcbenn@example.com" />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" defaultValue="+63 912 345 6789" />
          </div>

          <button type="submit" className="auth-btn">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
