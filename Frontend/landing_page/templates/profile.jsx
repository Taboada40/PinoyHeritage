import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../assets/styles/profile.css";

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

  // Get the logged-in user ID from localStorage
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) return;
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
      <Header showNav={true} />

      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Profile Information</h2>

          <div className="profile-header">
            <div className="profile-image"></div>
            <div className="profile-info">
              <h3 className="profile-name">{formData.username}</h3>
              <p className="profile-bio">
                Passionate about technology, coding, and creating clean
                designs.
              </p>
            </div>
          </div>

          <form className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name (optional)</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Last Name (optional)</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" value={formData.username} disabled />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} disabled />
            </div>

            <div className="form-group">
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
                className="btn btn-edit"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}
            {isEditing && (
              <button
                type="submit"
                className="btn btn-update"
                onClick={handleUpdateClick}
              >
                Update Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
