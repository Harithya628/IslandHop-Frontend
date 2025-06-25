import React, { useState, useEffect } from "react";
import "../Page.css";
import "./UpdateUserProfile.css";

const UpdateUserProfile = ({ userId, onPageChange, users, setUsers }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    status: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    emergencyContact: "",
    licenseNumber: "",
    vehicleInfo: "",
    languages: "",
    specializations: "",
    bio: "",
    profileComplete: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userId && users.length > 0) {
      const foundUser = users.find((u) => u.id === parseInt(userId));
      if (foundUser) {
        setUser(foundUser);
        // Extend the user data with additional profile fields
        setFormData({
          name: foundUser.name || "",
          email: foundUser.email || "",
          userType: foundUser.userType || "",
          status: foundUser.status || "",
          phone: foundUser.phone || "+94 77 123 4567",
          address: foundUser.address || "Colombo, Sri Lanka",
          dateOfBirth: foundUser.dateOfBirth || "1990-01-15",
          emergencyContact: foundUser.emergencyContact || "+94 77 987 6543",
          licenseNumber:
            foundUser.licenseNumber ||
            (foundUser.userType === "driver" ? "B1234567" : ""),
          vehicleInfo:
            foundUser.vehicleInfo ||
            (foundUser.userType === "driver" ? "Toyota Corolla 2020" : ""),
          languages: foundUser.languages || "English, Sinhala",
          specializations:
            foundUser.specializations ||
            (foundUser.userType === "guide" ? "Cultural Tours, Wildlife" : ""),
          bio: foundUser.bio || "Experienced and friendly service provider.",
          profileComplete: foundUser.profileComplete || false,
        });
      }
      setLoading(false);
    }
  }, [userId, users]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (formData.userType === "driver" && !formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License number is required for drivers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      // Update the user in the users array
      const updatedUsers = users.map((u) =>
        u.id === parseInt(userId)
          ? {
              ...u,
              ...formData,
              lastUpdated: new Date().toISOString(),
            }
          : u
      );

      setUsers(updatedUsers);
      setSaving(false);
      setShowConfirmation(true);

      // Hide confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }, 1000);
  };

  const handleCancel = () => {
    onPageChange("UserAccounts");
  };
  if (loading) {
    return (
      <div className="page update-user-profile-page">
        <div className="page-content-card">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading user profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page update-user-profile-page">
        <div className="page-content-card">
          <div className="error-container">
            <h2>User Not Found</h2>
            <p>The requested user could not be found.</p>
            <button className="btn-primary" onClick={handleCancel}>
              Back to User Accounts
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page update-user-profile-page">
      <div className="page-content-card">
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1>Update User Profile</h1>
              <p>Edit user information and account settings</p>
            </div>
            <div className="header-actions">
              <button
                className="btn-secondary"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
        {showConfirmation && (
          <div className="confirmation-banner">
            <div className="confirmation-content">
              <span className="confirmation-icon">✓</span>
              <span>User profile updated successfully!</span>
            </div>
          </div>
        )}{" "}
        <div className="page-content">
          <div className="profile-form">
            {/* Basic Information Section */}
            <div className="update-profile-form">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emergencyContact">Emergency Contact</label>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>{" "}
            {/* Account Settings Section */}
            <div className="update-profile-form">
              <h3 className="section-title">Account Settings</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="userType">User Type</label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                  >
                    <option value="traveler">Traveler</option>
                    <option value="driver">Driver</option>
                    <option value="guide">Guide</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Account Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="languages">Languages</label>
                  <input
                    type="text"
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    placeholder="e.g., English, Sinhala, Tamil"
                  />
                </div>

                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="profileComplete"
                      name="profileComplete"
                      checked={formData.profileComplete}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="profileComplete">Profile Complete</label>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* Professional Information Section (for drivers and guides) */}
            {(formData.userType === "driver" ||
              formData.userType === "guide") && (
              <div className="update-profile-form">
                <h3 className="section-title">Professional Information</h3>
                <div className="form-grid">
                  {formData.userType === "driver" && (
                    <>
                      <div className="form-group">
                        <label htmlFor="licenseNumber">License Number *</label>
                        <input
                          type="text"
                          id="licenseNumber"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className={errors.licenseNumber ? "error" : ""}
                        />
                        {errors.licenseNumber && (
                          <span className="error-message">
                            {errors.licenseNumber}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="vehicleInfo">Vehicle Information</label>
                        <input
                          type="text"
                          id="vehicleInfo"
                          name="vehicleInfo"
                          value={formData.vehicleInfo}
                          onChange={handleInputChange}
                          placeholder="e.g., Toyota Corolla 2020"
                        />
                      </div>
                    </>
                  )}

                  {formData.userType === "guide" && (
                    <div className="form-group">
                      <label htmlFor="specializations">Specializations</label>
                      <input
                        type="text"
                        id="specializations"
                        name="specializations"
                        value={formData.specializations}
                        onChange={handleInputChange}
                        placeholder="e.g., Cultural Tours, Wildlife, Adventure"
                      />
                    </div>
                  )}

                  <div className="form-group full-width">
                    <label htmlFor="bio">Bio / Description</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Brief description about the user..."
                    />
                  </div>
                </div>
              </div>
            )}{" "}
            {/* User Statistics Section */}
            <div className="update-profile-form">
              <h3 className="section-title">User Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Total Trips</span>
                  <span className="stat-value">{user.totalTrips}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Joined Date</span>
                  <span className="stat-value">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Last Active</span>
                  <span className="stat-value">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">User ID</span>
                  <span className="stat-value">#{user.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
