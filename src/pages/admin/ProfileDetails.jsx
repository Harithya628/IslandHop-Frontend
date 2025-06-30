import React, { useState, useEffect } from 'react';
import './ProfileDetails.css';
import profilePic from '../../assets/islandHopIcon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import { sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';

const initialUser = {
  firstName: 'System',
  lastName: 'Administrator',
  email: 'islandhopdev@gmail.com',
  role: 'System Admin',
  avatar: profilePic,
  lastActive: 'Loading...',
};

const ProfileDetails = () => {
  const [user, setUser] = useState(initialUser);
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