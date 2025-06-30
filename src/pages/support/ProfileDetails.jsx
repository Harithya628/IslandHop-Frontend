import React, { useState, useEffect } from 'react';
import './ProfileDetails.css';
import profilePic from '../../assets/islandHopIcon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import { sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';

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
  lastActive: 'Loading...',
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
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to format the last active time
  const formatLastActive = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const lastActive = new Date(timestamp);
    const diffInMinutes = Math.floor((now - lastActive) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return lastActive.toLocaleDateString();
  };

  // Get user's last sign-in time from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Get last sign-in time from Firebase Auth metadata
        const lastSignInTime = currentUser.metadata.lastSignInTime;
        const formattedLastActive = formatLastActive(lastSignInTime);
        
        setUser(prevUser => ({
          ...prevUser,
          email: currentUser.email || prevUser.email,
          lastActive: formattedLastActive
        }));
      } else {
        // If no user is signed in, show "Not signed in"
        setUser(prevUser => ({
          ...prevUser,
          lastActive: 'Not signed in'
        }));
      }
    });

    return () => unsubscribe();
  }, []);

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

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      notify('Password reset email sent successfully!', 'success');
      setShowPasswordReset(false);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      notify('Failed to send password reset email. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
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
                className="profile-btn profile-btn-edit"
                onClick={() => setShowPasswordReset(true)}
              >
                Change Password
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

      {/* Password Reset Modal */}
      {showPasswordReset && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <h2>Change Password</h2>
            <p>A password reset email will be sent to <strong>{user.email}</strong>. Follow the instructions in the email to reset your password.</p>
            <div className="profile-modal-actions">
              <button
                className="profile-btn profile-btn-edit"
                onClick={handlePasswordReset}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Email'}
              </button>
              <button
                className="profile-btn profile-btn-cancel"
                onClick={() => setShowPasswordReset(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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