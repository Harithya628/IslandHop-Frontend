import React, { useState } from 'react';
import './ProfileDetails.css';
import profilePic from '../../assets/islandHopIcon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialUser = {
  firstName: 'Alex',
  lastName: 'Unsupport',
  email: 'alex.support@islandhop.com',
  phone: '+94 77 123 4567',
  address: 'Colombo, Sri Lanka',
  role: 'Support Agent',
  joined: 'January 2024',
  avatar: profilePic,
  bio: 'Dedicated support agent with 3+ years of experience helping travelers. Passionate about customer satisfaction and problem-solving.',
  skills: ['Customer Support', 'Ticket Management', 'Crisis Handling', 'Multilingual', 'Refund Processing'],
  languages: ['English', 'Sinhala', 'Tamil'],
  lastActive: '2 minutes ago',
};

const ProfileDetails = ({ isSidebarCollapsed }) => {
  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    address: user.address,
  });
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const notify = (msg, type = 'success') => {
    toast[type](msg, {
      position: 'top-right',
      autoClose: 2200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      className: 'profile-toast',
    });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancelEdit = () => {
    setEditMode(false);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
    });
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        address: form.address,
      }));
      setEditMode(false);
      setLoading(false);
      notify('Profile updated successfully!', 'success');
    }, 1200);
  };

  const handleDeactivate = () => {
    setShowDeactivate(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notify('Account deactivated.', 'info');
    }, 1000);
  };

  const handleDelete = () => {
    setShowDelete(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notify('Account deleted.', 'error');
    }, 1000);
  };

  return (
    <div className={`full-width-profile ${isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`} data-testid="profile-container">
      <ToastContainer />
      <div className="profile-details-card wide">
        <div className="profile-details-header">
          <div className="profile-details-avatar-container">
            <img src={editMode ? avatarPreview : user.avatar} alt="Profile" className="profile-details-avatar" />
            {editMode && (
              <label className="profile-avatar-upload">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                  disabled={loading}
                />
              </label>
            )}
          </div>
          <div className="profile-details-header-info">
            <h2 className="profile-details-name large">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder="First Name"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder="Last Name"
                    disabled={loading}
                  />
                </>
              ) : (
                `${user.firstName} ${user.lastName}`
              )}
            </h2>
            <p className="profile-details-role large">{user.role}</p>
            <div className="profile-details-contact-row">
              <span className="profile-details-email">{user.email}</span>
              <span className="profile-details-divider">|</span>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="profile-input"
                  placeholder="Contact Number"
                  disabled={loading}
                />
              ) : (
                <span className="profile-details-phone">{user.phone}</span>
              )}
              <span className="profile-details-divider">|</span>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="profile-input"
                  placeholder="Address"
                  disabled={loading}
                />
              ) : (
                <span className="profile-details-location">{user.address}</span>
              )}
            </div>
            <div className="profile-details-meta-row">
              <span className="profile-details-joined">Joined: {user.joined}</span>
              <span className="profile-details-divider">|</span>
              <span className="profile-details-lastactive">Last Active: {user.lastActive}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions-row">
          {editMode ? (
            <>
              <button
                className="profile-btn profile-btn-save"
                onClick={handleUpdate}
                disabled={loading}
              >
                <span role="img" aria-label="save">💾</span> Save
              </button>
              <button
                className="profile-btn profile-btn-cancel"
                onClick={handleCancelEdit}
                disabled={loading}
              >
                <span role="img" aria-label="cancel">✖️</span> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="profile-btn profile-btn-edit"
                onClick={handleEdit}
              >
                <span role="img" aria-label="edit">✏️</span> Edit Profile
              </button>
              <button
                className="profile-btn profile-btn-deactivate"
                onClick={() => setShowDeactivate(true)}
              >
                <span role="img" aria-label="deactivate">⏸️</span> Deactivate
              </button>
              <button
                className="profile-btn profile-btn-delete"
                onClick={() => setShowDelete(true)}
              >
                <span role="img" aria-label="delete">🗑️</span> Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivate && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <h2>Deactivate Account</h2>
            <p>Are you sure you want to deactivate your account? You can reactivate it later.</p>
            <div className="profile-modal-actions">
              <button
                className="profile-btn profile-btn-deactivate"
                onClick={handleDeactivate}
                disabled={loading}
              >
                Yes, Deactivate
              </button>
              <button
                className="profile-btn profile-btn-cancel"
                onClick={() => setShowDeactivate(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDelete && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <h2>Delete Account</h2>
            <p>This action is <b>permanent</b>. Are you sure you want to delete your account?</p>
            <div className="profile-modal-actions">
              <button
                className="profile-btn profile-btn-delete"
                onClick={handleDelete}
                disabled={loading}
              >
                Yes, Delete
              </button>
              <button
                className="profile-btn profile-btn-cancel"
                onClick={() => setShowDelete(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;