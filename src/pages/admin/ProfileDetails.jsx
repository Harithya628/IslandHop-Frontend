import React, { useState } from 'react';
import './ProfileDetails.css';
import profilePic from '../../assets/islandHopIcon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const initialUser = {
  firstName: 'System',
  lastName: 'Administrator',
  email: 'admin@islandhop.lk',
  role: 'System Admin',
  avatar: profilePic,
  lastActive: '2 minutes ago',
};

const ProfileDetails = () => {
  const [user, setUser] = useState(initialUser);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
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
    <div className="full-width-profile" data-testid="profile-container">
      <ToastContainer />
      <div className="profile-details-card">
        <div className="profile-details-header">
          <div className="profile-details-avatar-container">
            <img src={user.avatar} alt="Profile" className="profile-details-avatar" />
          </div>
          <div className="profile-details-header-info">
            <h2 className="profile-details-name">
              {`${user.firstName} ${user.lastName}`}
            </h2>
            <p className="profile-details-role">{user.role}</p>
            <div className="profile-details-contact-row">
              <span className="profile-details-email">{user.email}</span>
              <span className="profile-details-divider">|</span>
              <span className="profile-details-lastactive">Last Active: {user.lastActive}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions-row">
          <button
            className="profile-btn profile-btn-edit"
            onClick={() => setShowPasswordReset(true)}
          >
            Change Password
          </button>
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
    </div>
  );
};

export default ProfileDetails;