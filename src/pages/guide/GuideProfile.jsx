import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  IdCard, 
  Globe, 
  Languages, 
  Award, 
  Upload, 
  Camera, 
  MapPin,
  Calendar,
  FileText,
  Star,
  Briefcase
} from 'lucide-react';
import './GuideProfile.css';

const GuideProfile = () => {
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: 'Saman',
    lastName: 'Fernando',
    profilePicture: null,
    email: 'saman.fernando@email.com',
    contactNumber: '0771234567',
    nicPassport: '199512345678',
    nationality: 'Sri Lankan',
    dateOfBirth: '1995-05-15',
    
    // Professional Details
    yearsOfExperience: 5,
    specializations: ['Cultural Tours', 'Wildlife Safari', 'Adventure Tours'],
    spokenLanguages: ['English', 'Sinhala', 'Tamil'],
    guideLicenseNumber: 'GL2024001234',
    touristBoardRegistration: 'TB2024567890',
    
    // Location & Availability
    baseLocation: 'Colombo',
    serviceAreas: ['Western Province', 'Central Province', 'Southern Province'],
    availabilityStatus: 'Available',
    
    // Additional Information
    bio: 'Passionate tour guide with 5+ years of experience showcasing the beauty and culture of Sri Lanka.',
    hourlyRate: 2500,
    dailyRate: 15000,
    
    // Documents
    guideLicense: null,
    nationalId: null,
    medicalCertificate: null,
    languageCertificates: null
  });

  const [previewImages, setPreviewImages] = useState({
    profilePicture: null,
    guideLicense: null,
    nationalId: null,
    medicalCertificate: null,
    languageCertificates: null
  });

  const [selectedLanguages, setSelectedLanguages] = useState(formData.spokenLanguages);
  const [selectedSpecializations, setSelectedSpecializations] = useState(formData.specializations);
  const [selectedServiceAreas, setSelectedServiceAreas] = useState(formData.serviceAreas);

  const availableLanguages = [
    'English', 'Sinhala', 'Tamil', 'French', 'German', 
    'Spanish', 'Italian', 'Japanese', 'Chinese', 'Korean', 
    'Russian', 'Dutch', 'Portuguese'
  ];

  const availableSpecializations = [
    'Cultural Tours', 'Wildlife Safari', 'Adventure Tours', 'Beach Tours',
    'Hill Country Tours', 'Historical Sites', 'Religious Sites', 'Photography Tours',
    'Bird Watching', 'Trekking', 'City Tours', 'Food Tours', 'Tea Plantation Tours'
  ];

  const availableServiceAreas = [
    'Western Province', 'Central Province', 'Southern Province', 'Northern Province',
    'Eastern Province', 'North Western Province', 'North Central Province', 
    'Uva Province', 'Sabaragamuwa Province'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
      
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImages(prev => ({
            ...prev,
            [fieldName]: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleLanguageToggle = (language) => {
    setSelectedLanguages(prev => {
      const updated = prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language];
      
      setFormData(prevData => ({
        ...prevData,
        spokenLanguages: updated
      }));
      
      return updated;
    });
  };

  const handleSpecializationToggle = (specialization) => {
    setSelectedSpecializations(prev => {
      const updated = prev.includes(specialization)
        ? prev.filter(spec => spec !== specialization)
        : [...prev, specialization];
      
      setFormData(prevData => ({
        ...prevData,
        specializations: updated
      }));
      
      return updated;
    });
  };

  const handleServiceAreaToggle = (area) => {
    setSelectedServiceAreas(prev => {
      const updated = prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area];
      
      setFormData(prevData => ({
        ...prevData,
        serviceAreas: updated
      }));
      
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Guide profile updated:', formData);
    // Add API call to update profile
  };

  return (
    <div className="guide-profile-container">
      <div className="guide-profile-header">
        <h1>Guide Profile</h1>
        <p>Manage your professional guide profile and credentials</p>
      </div>

      <form className="guide-profile-form" onSubmit={handleSubmit}>
        {/* Personal Details Section */}
        <div className="guide-profile-section">
          <div className="guide-profile-section-header">
            <User className="guide-profile-section-icon" />
            <h2>Personal Details</h2>
          </div>
          
          <div className="guide-profile-form-grid">
            {/* Profile Picture Upload */}
            <div className="guide-profile-field guide-profile-field-full">
              <label htmlFor="profilePicture" className="guide-profile-label">
                Profile Picture
              </label>
              <div className="guide-profile-image-upload">
                <div className="guide-profile-image-preview">
                  {previewImages.profilePicture ? (
                    <img 
                      src={previewImages.profilePicture} 
                      alt="Profile preview" 
                      className="guide-profile-preview-img"
                    />
                  ) : (
                    <div className="guide-profile-placeholder">
                      <Camera className="guide-profile-placeholder-icon" />
                      <span>No image selected</span>
                    </div>
                  )}
                </div>
                <label htmlFor="profilePicture" className="guide-profile-upload-btn">
                  <Upload className="guide-profile-upload-icon" />
                  Choose Image
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'profilePicture')}
                  className="guide-profile-file-input"
                />
              </div>
            </div>

            {/* First Name */}
            <div className="guide-profile-field">
              <label htmlFor="firstName" className="guide-profile-label">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div className="guide-profile-field">
              <label htmlFor="lastName" className="guide-profile-label">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div className="guide-profile-field">
              <label htmlFor="email" className="guide-profile-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                placeholder="your.email@example.com"
              />
            </div>

            {/* Contact Number */}
            <div className="guide-profile-field">
              <label htmlFor="contactNumber" className="guide-profile-label">
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                pattern="0[0-9]{9}"
                placeholder="0771234567"
                maxLength="10"
              />
              <small className="guide-profile-help">Sri Lankan format (10 digits starting with 0)</small>
            </div>

            {/* NIC or Passport */}
            <div className="guide-profile-field">
              <label htmlFor="nicPassport" className="guide-profile-label">
                NIC or Passport Number *
              </label>
              <input
                type="text"
                id="nicPassport"
                name="nicPassport"
                value={formData.nicPassport}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                placeholder="199512345678 or N1234567"
              />
            </div>

            {/* Nationality */}
            <div className="guide-profile-field">
              <label htmlFor="nationality" className="guide-profile-label">
                Nationality *
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                placeholder="Sri Lankan"
              />
            </div>

            {/* Date of Birth */}
            <div className="guide-profile-field">
              <label htmlFor="dateOfBirth" className="guide-profile-label">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="guide-profile-section">
          <div className="guide-profile-section-header">
            <Briefcase className="guide-profile-section-icon" />
            <h2>Professional Details</h2>
          </div>
          
          <div className="guide-profile-form-grid">
            {/* Years of Experience */}
            <div className="guide-profile-field">
              <label htmlFor="yearsOfExperience" className="guide-profile-label">
                Years of Experience *
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                min="0"
                max="50"
                placeholder="5"
              />
            </div>

            {/* Guide License Number */}
            <div className="guide-profile-field">
              <label htmlFor="guideLicenseNumber" className="guide-profile-label">
                Guide License Number *
              </label>
              <input
                type="text"
                id="guideLicenseNumber"
                name="guideLicenseNumber"
                value={formData.guideLicenseNumber}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                placeholder="GL2024001234"
              />
            </div>

            {/* Tourist Board Registration */}
            <div className="guide-profile-field">
              <label htmlFor="touristBoardRegistration" className="guide-profile-label">
                Tourist Board Registration
              </label>
              <input
                type="text"
                id="touristBoardRegistration"
                name="touristBoardRegistration"
                value={formData.touristBoardRegistration}
                onChange={handleInputChange}
                className="guide-profile-input"
                placeholder="TB2024567890"
              />
            </div>

            {/* Base Location */}
            <div className="guide-profile-field">
              <label htmlFor="baseLocation" className="guide-profile-label">
                Base Location *
              </label>
              <input
                type="text"
                id="baseLocation"
                name="baseLocation"
                value={formData.baseLocation}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                placeholder="Colombo"
              />
            </div>

            {/* Hourly Rate */}
            <div className="guide-profile-field">
              <label htmlFor="hourlyRate" className="guide-profile-label">
                Hourly Rate (LKR) *
              </label>
              <input
                type="number"
                id="hourlyRate"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                min="0"
                placeholder="2500"
              />
            </div>

            {/* Daily Rate */}
            <div className="guide-profile-field">
              <label htmlFor="dailyRate" className="guide-profile-label">
                Daily Rate (LKR) *
              </label>
              <input
                type="number"
                id="dailyRate"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleInputChange}
                className="guide-profile-input"
                required
                min="0"
                placeholder="15000"
              />
            </div>

            {/* Availability Status */}
            <div className="guide-profile-field">
              <label htmlFor="availabilityStatus" className="guide-profile-label">
                Availability Status *
              </label>
              <select
                id="availabilityStatus"
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleInputChange}
                className="guide-profile-select"
                required
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Bio */}
            <div className="guide-profile-field guide-profile-field-full">
              <label htmlFor="bio" className="guide-profile-label">
                Professional Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="guide-profile-textarea"
                rows="4"
                placeholder="Tell us about your experience and what makes you a great guide..."
              />
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="guide-profile-section">
          <div className="guide-profile-section-header">
            <Languages className="guide-profile-section-icon" />
            <h2>Spoken Languages</h2>
          </div>
          
          <div className="guide-profile-checkbox-grid">
            {availableLanguages.map(language => (
              <label key={language} className="guide-profile-checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language)}
                  onChange={() => handleLanguageToggle(language)}
                  className="guide-profile-checkbox"
                />
                <span className="guide-profile-checkbox-label">{language}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Specializations Section */}
        <div className="guide-profile-section">
          <div className="guide-profile-section-header">
            <Star className="guide-profile-section-icon" />
            <h2>Tour Specializations</h2>
          </div>
          
          <div className="guide-profile-checkbox-grid">
            {availableSpecializations.map(specialization => (
              <label key={specialization} className="guide-profile-checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedSpecializations.includes(specialization)}
                  onChange={() => handleSpecializationToggle(specialization)}
                  className="guide-profile-checkbox"
                />
                <span className="guide-profile-checkbox-label">{specialization}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Service Areas Section */}
        <div className="guide-profile-section">
          <div className="guide-profile-section-header">
            <MapPin className="guide-profile-section-icon" />
            <h2>Service Areas</h2>
          </div>
          
          <div className="guide-profile-checkbox-grid">
            {availableServiceAreas.map(area => (
              <label key={area} className="guide-profile-checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedServiceAreas.includes(area)}
                  onChange={() => handleServiceAreaToggle(area)}
                  className="guide-profile-checkbox"
                />
                <span className="guide-profile-checkbox-label">{area}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="guide-profile-section">
          <div className="guide-profile-section-header">
            <FileText className="guide-profile-section-icon" />
            <h2>Documents & Certificates</h2>
          </div>
          
          <div className="guide-profile-documents-grid">
            {/* Guide License */}
            <div className="guide-profile-document-field">
              <label htmlFor="guideLicense" className="guide-profile-label">
                Guide License *
              </label>
              <div className="guide-profile-file-upload">
                <label htmlFor="guideLicense" className="guide-profile-file-label">
                  <Upload className="guide-profile-upload-icon" />
                  {formData.guideLicense ? formData.guideLicense.name : 'Upload Guide License'}
                </label>
                <input
                  type="file"
                  id="guideLicense"
                  name="guideLicense"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'guideLicense')}
                  className="guide-profile-file-input"
                />
              </div>
            </div>

            {/* National ID */}
            <div className="guide-profile-document-field">
              <label htmlFor="nationalId" className="guide-profile-label">
                National ID Copy *
              </label>
              <div className="guide-profile-file-upload">
                <label htmlFor="nationalId" className="guide-profile-file-label">
                  <Upload className="guide-profile-upload-icon" />
                  {formData.nationalId ? formData.nationalId.name : 'Upload ID Copy'}
                </label>
                <input
                  type="file"
                  id="nationalId"
                  name="nationalId"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'nationalId')}
                  className="guide-profile-file-input"
                />
              </div>
            </div>

            {/* Medical Certificate */}
            <div className="guide-profile-document-field">
              <label htmlFor="medicalCertificate" className="guide-profile-label">
                Medical Certificate
              </label>
              <div className="guide-profile-file-upload">
                <label htmlFor="medicalCertificate" className="guide-profile-file-label">
                  <Upload className="guide-profile-upload-icon" />
                  {formData.medicalCertificate ? formData.medicalCertificate.name : 'Upload Medical Certificate'}
                </label>
                <input
                  type="file"
                  id="medicalCertificate"
                  name="medicalCertificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'medicalCertificate')}
                  className="guide-profile-file-input"
                />
              </div>
            </div>

            {/* Language Certificates */}
            <div className="guide-profile-document-field">
              <label htmlFor="languageCertificates" className="guide-profile-label">
                Language Certificates
              </label>
              <div className="guide-profile-file-upload">
                <label htmlFor="languageCertificates" className="guide-profile-file-label">
                  <Upload className="guide-profile-upload-icon" />
                  {formData.languageCertificates ? formData.languageCertificates.name : 'Upload Language Certificates'}
                </label>
                <input
                  type="file"
                  id="languageCertificates"
                  name="languageCertificates"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'languageCertificates')}
                  className="guide-profile-file-input"
                  multiple
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="guide-profile-submit-container">
          <button type="submit" className="guide-profile-submit-btn">
            <Award className="guide-profile-btn-icon" />
            Update Guide Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuideProfile;