import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { updateProfile, deleteUser, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { updateUserData, clearUserData } from '../utils/userStorage';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileModal.module.css';

const ProfileModal = ({ isOpen, onClose, user, displayInfo }) => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    dateOfBirth: '',
    languages: [],
    photoURL: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [reauthPassword, setReauthPassword] = useState('');
  
  // Language options
  const languageOptions = [
    'English', 'Sinhala', 'Tamil', 'Spanish', 'French', 'German', 
    'Italian', 'Japanese', 'Korean', 'Chinese', 'Hindi', 'Arabic'
  ];

  // Initialize form data
  useEffect(() => {
    if (user && displayInfo) {
      console.log('🔄 Initializing profile form with user data...');
      
      const displayName = displayInfo.displayName || '';
      const nameParts = displayName.split(' ');
      
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        nationality: user.nationality || '',
        dateOfBirth: user.dateOfBirth || '',
        languages: user.languages || ['English'],
        photoURL: displayInfo.photoURL || ''
      });
    }
  }, [user, displayInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For demo purposes, we'll use a local URL
      // In production, you'd upload to Firebase Storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photoURL: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('💾 Updating profile...');
      
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();
      
      // Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: formData.photoURL
      });

      // Update local storage
      const updates = {
        displayName: displayName,
        photoURL: formData.photoURL,
        nationality: formData.nationality,
        dateOfBirth: formData.dateOfBirth,
        languages: formData.languages,
        firstName: formData.firstName,
        lastName: formData.lastName
      };

      updateUserData(updates);
      
      setSuccess('Profile updated successfully!');
      console.log('✅ Profile updated successfully');
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateAccount = async () => {
    if (!reauthPassword) {
      setError('Please enter your password to deactivate account');
      return;
    }

    try {
      setLoading(true);
      console.log('⏸️ Deactivating account...');
      
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        reauthPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // In a real app, you'd call your backend to deactivate
      // For now, we'll just sign out and clear data
      await auth.signOut();
      clearUserData();
      
      console.log('✅ Account deactivated');
      navigate('/');
      
    } catch (error) {
      console.error('❌ Error deactivating account:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!reauthPassword) {
      setError('Please enter your password to delete account');
      return;
    }

    try {
      setLoading(true);
      console.log('🗑️ Deleting account...');
      
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        reauthPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Delete Firebase user
      await deleteUser(auth.currentUser);
      
      // Clear local storage
      clearUserData();
      
      console.log('✅ Account deleted');
      navigate('/');
      
    } catch (error) {
      console.error('❌ Error deleting account:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Profile Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.modalContent}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className={styles.profilePictureSection}>
              <div className={styles.currentPhoto}>
                {formData.photoURL ? (
                  <img src={formData.photoURL} alt="Profile" />
                ) : (
                  <div className={styles.photoPlaceholder}>
                    {formData.firstName ? formData.firstName[0] : 'U'}
                  </div>
                )}
              </div>
              <div className={styles.photoUpload}>
                <label htmlFor="photo-upload" className={styles.uploadButton}>
                  Change Photo
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className={styles.fileInput}
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={displayInfo?.email || ''}
                  disabled
                  className={styles.disabledInput}
                />
                <small>Email cannot be changed</small>
              </div>

              <div className={styles.formGroup}>
                <label>Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="e.g., Sri Lankan, American"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Languages</label>
                <div className={styles.languageSelector}>
                  {languageOptions.map(language => (
                    <label key={language} className={styles.languageOption}>
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                      />
                      <span>{language}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>

          {/* Account Management */}
          <div className={styles.accountManagement}>
            <h3>Account Management</h3>
            
            <div className={styles.dangerZone}>
              <button
                className={styles.deactivateButton}
                onClick={() => setShowDeactivateConfirm(true)}
              >
                Deactivate Account
              </button>
              
              <button
                className={styles.deleteButton}
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modals */}
        {(showDeleteConfirm || showDeactivateConfirm) && (
          <div className={styles.confirmationOverlay}>
            <div className={styles.confirmationModal}>
              <h3>
                {showDeleteConfirm ? 'Delete Account' : 'Deactivate Account'}
              </h3>
              <p>
                {showDeleteConfirm 
                  ? 'This action cannot be undone. All your data will be permanently deleted.'
                  : 'Your account will be deactivated and you will be logged out.'
                }
              </p>
              
              <div className={styles.formGroup}>
                <label>Enter your password to confirm:</label>
                <input
                  type="password"
                  value={reauthPassword}
                  onChange={(e) => setReauthPassword(e.target.value)}
                  placeholder="Your password"
                />
              </div>
              
              <div className={styles.confirmationButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setShowDeactivateConfirm(false);
                    setReauthPassword('');
                    setError('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className={showDeleteConfirm ? styles.deleteButton : styles.deactivateButton}
                  onClick={showDeleteConfirm ? handleDeleteAccount : handleDeactivateAccount}
                  disabled={loading || !reauthPassword}
                >
                  {loading ? 'Processing...' : (showDeleteConfirm ? 'Delete' : 'Deactivate')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;