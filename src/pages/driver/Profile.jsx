import React, { useState } from 'react';
import { User, Phone, Mail, IdCard, Car, Users, Settings, Upload, Camera } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    // General Details
    fullName: 'Kasun Perera',
    profilePicture: null,
    email: 'kasun.perera@email.com',
    contactNumber: '0771234567',
    nicPassport: '199512345678',
    
    // Vehicle Details
    bodyType: 'Sedan',
    acAvailable: 'Yes',
    numberOfSeats: 4,
    vehicleNumber: 'WP CAR 1234',
    vehicleType: 'Car'
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Profile updated:', formData);
  };

  return (
    <div className="driver-profile-container">
      <div className="driver-profile-header">
        <h1>Driver Profile</h1>
        <p>Update your personal and vehicle information</p>
      </div>

      <form className="driver-profile-form" onSubmit={handleSubmit}>
        {/* General Details Section */}
        <div className="driver-profile-section">
          <div className="driver-profile-section-header">
            <User className="driver-profile-section-icon" />
            <h2>General Details</h2>
          </div>
          
          <div className="driver-profile-form-grid">
            {/* Profile Picture Upload */}
            <div className="driver-profile-field driver-profile-field-full">
              <label htmlFor="profilePicture" className="driver-profile-label">
                Profile Picture
              </label>
              <div className="driver-profile-image-upload">
                <div className="driver-profile-image-preview">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Profile preview" 
                      className="driver-profile-preview-img"
                    />
                  ) : (
                    <div className="driver-profile-placeholder">
                      <Camera className="driver-profile-placeholder-icon" />
                      <span>No image selected</span>
                    </div>
                  )}
                </div>
                <label htmlFor="profilePicture" className="driver-profile-upload-btn">
                  <Upload className="driver-profile-upload-icon" />
                  Choose Image
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="driver-profile-file-input"
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="driver-profile-field">
              <label htmlFor="fullName" className="driver-profile-label">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="driver-profile-input"
                required
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="driver-profile-field">
              <label htmlFor="email" className="driver-profile-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="driver-profile-input"
                required
                placeholder="your.email@example.com"
              />
            </div>

            {/* Contact Number */}
            <div className="driver-profile-field">
              <label htmlFor="contactNumber" className="driver-profile-label">
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="driver-profile-input"
                required
                pattern="0[0-9]{9}"
                placeholder="0771234567"
                maxLength="10"
              />
              <small className="driver-profile-help">Sri Lankan format (10 digits starting with 0)</small>
            </div>

            {/* NIC or Passport */}
            <div className="driver-profile-field">
              <label htmlFor="nicPassport" className="driver-profile-label">
                NIC or Passport Number *
              </label>
              <input
                type="text"
                id="nicPassport"
                name="nicPassport"
                value={formData.nicPassport}
                onChange={handleInputChange}
                className="driver-profile-input"
                required
                placeholder="199512345678 or N1234567"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Details Section */}
        <div className="driver-profile-section">
          <div className="driver-profile-section-header">
            <Car className="driver-profile-section-icon" />
            <h2>Vehicle Details</h2>
          </div>
          
          <div className="driver-profile-form-grid">
            {/* Vehicle Type */}
            <div className="driver-profile-field">
              <label htmlFor="vehicleType" className="driver-profile-label">
                Vehicle Type *
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="driver-profile-select"
                required
              >
                <option value="">Select vehicle type</option>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Tuk Tuk">Tuk Tuk</option>
                <option value="Bus">Bus</option>
                <option value="Jeep">Jeep</option>
              </select>
            </div>

            {/* Body Type */}
            <div className="driver-profile-field">
              <label htmlFor="bodyType" className="driver-profile-label">
                Body Type *
              </label>
              <input
                type="text"
                id="bodyType"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
                className="driver-profile-input"
                required
                placeholder="e.g., Sedan, Hatchback, SUV"
              />
            </div>

            {/* Vehicle Number */}
            <div className="driver-profile-field">
              <label htmlFor="vehicleNumber" className="driver-profile-label">
                Vehicle Number *
              </label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                className="driver-profile-input"
                required
                placeholder="WP CAR 1234"
                style={{ textTransform: 'uppercase' }}
              />
            </div>

            {/* Number of Seats */}
            <div className="driver-profile-field">
              <label htmlFor="numberOfSeats" className="driver-profile-label">
                Number of Seats *
              </label>
              <input
                type="number"
                id="numberOfSeats"
                name="numberOfSeats"
                value={formData.numberOfSeats}
                onChange={handleInputChange}
                className="driver-profile-input"
                required
                min="1"
                max="50"
                placeholder="4"
              />
            </div>

            {/* A/C Available */}
            <div className="driver-profile-field">
              <label htmlFor="acAvailable" className="driver-profile-label">
                A/C Available *
              </label>
              <select
                id="acAvailable"
                name="acAvailable"
                value={formData.acAvailable}
                onChange={handleInputChange}
                className="driver-profile-select"
                required
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="driver-profile-submit-container">
          <button type="submit" className="driver-profile-submit-btn">
            <Settings className="driver-profile-btn-icon" />
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
