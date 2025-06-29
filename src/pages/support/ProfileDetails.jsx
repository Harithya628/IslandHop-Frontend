import React, { useState, useEffect } from 'react';
import './ProfileDetails.css';
import profilePic from '../../assets/islandHopIcon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import { sendPasswordResetEmail, onAuthStateChanged, deleteUser as firebaseDeleteUser } from 'firebase/auth';
import api from '../../api/axios';

const initialUser = {
  firstName: 'Alex',
  lastName: 'Unsupport',
  email: 'alex.support@islandhop.com',
  phone: '+94 77 123 4567',
  address: 'Colombo, Sri Lanka',
  role: 'Support Agent',
  joined: 'Loading...',
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
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

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

  // Function to format the joined date
  const formatJoinedDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    
    const joinedDate = new Date(timestamp);
    return joinedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get user's last sign-in time from Firebase Auth and load profile from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get last sign-in time and creation time from Firebase Auth metadata
        const lastSignInTime = currentUser.metadata.lastSignInTime;
        const creationTime = currentUser.metadata.creationTime;
        const formattedLastActive = formatLastActive(lastSignInTime);
        const formattedJoinedDate = formatJoinedDate(creationTime);
        
        try {
          // Fetch profile from backend
          const response = await api.get(`/support/profile?email=${currentUser.email}`);
          console.log(response);
          if (response.status === 200 && response.data) {
            const profileData = response.data;
            setUser(prevUser => ({
              ...prevUser,
              firstName: profileData.firstName || prevUser.firstName,
              lastName: profileData.lastName || prevUser.lastName,
              email: profileData.email || currentUser.email,
              phone: profileData.phone || prevUser.phone,
              address: profileData.address || prevUser.address,
              role: profileData.role || prevUser.role,
              joined: formattedJoinedDate,
              lastActive: formattedLastActive
            }));
            
            // Update form with backend data
            setForm({
              firstName: profileData.firstName || initialUser.firstName,
              lastName: profileData.lastName || initialUser.lastName,
              phone: profileData.phone || initialUser.phone,
              address: profileData.address || initialUser.address,
            });
          } else {
            // If no profile found, use Firebase email and default values
            setUser(prevUser => ({
              ...prevUser,
              email: currentUser.email,
              joined: formattedJoinedDate,
              lastActive: formattedLastActive
            }));
          }
        } catch (error) {
          console.warn('Failed to fetch profile from backend:', error);
          // Fallback to Firebase data
          setUser(prevUser => ({
            ...prevUser,
            email: currentUser.email,
            joined: formattedJoinedDate,
            lastActive: formattedLastActive
          }));
        }
      } else {
        // If no user is signed in, show "Not signed in"
        setUser(prevUser => ({
          ...prevUser,
          joined: 'Unknown',
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let photoUrl = user.avatar; // Keep existing photo by default
      console.log('Starting profile update...');
      console.log('Current avatar:', user.avatar);
      console.log('Avatar preview:', avatarPreview);
      
      // Upload photo if changed
      if (avatarPreview !== user.avatar) {
        console.log('Photo has changed, attempting upload...');
        const fileInput = document.querySelector('input[type="file"]');
        console.log('File input element:', fileInput);
        
        if (fileInput && fileInput.files[0]) {
          console.log('Selected file:', fileInput.files[0]);
          const formData = new FormData();
          formData.append('email', user.email);
          formData.append('photo', fileInput.files[0]);
          
          console.log('Uploading photo to /support/profile/photo...');
          const photoResponse = await api.post('/support/profile/photo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          console.log('Photo upload response:', photoResponse);
          if (photoResponse.status === 200) {
            photoUrl = photoResponse.data.photoUrl;
            console.log('Photo uploaded successfully, new URL:', photoUrl);
            notify('Profile photo uploaded successfully!', 'success');
          } else {
            console.log('Photo upload failed with status:', photoResponse.status);
            notify('Failed to upload photo, but other details will be updated.', 'warning');
          }
        } else {
          console.log('No file selected or file input not found');
        }
      } else {
        console.log('Photo unchanged, skipping upload');
      }
      
      // Update profile details
      const updateData = {
        email: user.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        address: form.address,
        photoUrl: photoUrl, // Include photo URL
      };
      
      console.log('Updating profile with data:', updateData);
      const response = await api.put('/support/profile', updateData);
      console.log('Profile update response:', response);
      
      if (response.status === 200) {
        setUser((prev) => ({
          ...prev,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          address: form.address,
          avatar: photoUrl, // Update avatar with new photo URL
        }));
        setEditMode(false);
        console.log('Profile updated successfully');
        notify('Profile updated successfully!', 'success');
      } else {
        console.log('Profile update failed with status:', response.status);
        notify('Failed to update profile. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      notify('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    setShowDeactivate(false);
    setLoading(true);
    
    try {
      // Update status in backend
      const response = await api.put('/support/account/status', {
        email: user.email,
        status: 'INACTIVE'
      });
      
      if (response.status === 200) {
        notify('Account deactivated successfully. You will be logged out.', 'info');
        
        // Wait a moment for the toast, then sign out
        setTimeout(() => {
          auth.signOut().then(() => {
            window.location.href = '/login';
          });
        }, 2000);
      } else {
        notify('Failed to deactivate account. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error deactivating account:', error);
      notify('Failed to deactivate account. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setShowDelete(false);
    setLoading(true);
    
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        notify('No user is currently signed in.', 'error');
        setLoading(false);
        return;
      }
      
      // First update status in backend to DELETED
      const response = await api.put('/support/account/status', {
        email: user.email,
        status: 'DELETED'
      });
      
      if (response.status === 200) {
        // Then delete Firebase user
        await firebaseDeleteUser(currentUser);
        notify('Account deleted successfully.', 'success');
        
        // Redirect to login page
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        notify('Failed to delete account. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      if (error.code === 'auth/requires-recent-login') {
        notify('Please sign in again to delete your account for security reasons.', 'error');
      } else {
        notify('Failed to delete account. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
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
      <div className="profile-details-card">
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
            <h2 className="profile-details-name">
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
            <p className="profile-details-role">{user.role}</p>
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
                Save
              </button>
              <button
                className="profile-btn profile-btn-cancel"
                onClick={handleCancelEdit}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="profile-btn profile-btn-edit"
                onClick={handleEdit}
              >
                Edit Profile
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
                Deactivate
              </button>
              <button
                className="profile-btn profile-btn-delete"
                onClick={() => setShowDelete(true)}
              >
                Delete
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