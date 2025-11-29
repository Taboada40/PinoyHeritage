import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import ProfileSidebar from "../../components/customer/ProfileSidebar.jsx";
import "../../styles/admin/admin.css";
import "../../styles/customer/profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
  });

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) return;
    // Mock fetch for demonstration (Replace with your real fetch logic)
    fetch(`http://localhost:8080/api/customer/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          id: data.id,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        });
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [userId]);

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    
    fetch(`http://localhost:8080/api/customer/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setFormData(updated);
        alert("Profile updated successfully!");
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  return (
    <div className="profile-page">
      <Header showNav={false} />

      <ProfileSidebar />

      <main className="main-content">
        <div className="profile-container">
          <div className="profile-card">
            <h2 className="profile-title">Profile Information</h2>

            <div className="profile-header">
              <div className="profile-info">
                <h3 className="profile-name">{formData.username || "User"}</h3>
              </div>
            </div>

            <form className="profile-form">
              <div className="form-row">
                <div className="profile-form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="profile-form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="profile-form-group">
                <label>Username</label>
                <input type="text" name="username" value={formData.username} disabled />
              </div>

              <div className="profile-form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} disabled />
              </div>

              <div className="profile-form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              {!isEditing && (
                <button
                  type="button"
                  className="profile-btn btn-edit"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              )}
              {isEditing && (
                <button
                  type="submit"
                  className="profile-btn btn-update"
                  onClick={handleUpdateClick}
                >
                  Update Profile
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;