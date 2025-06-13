import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import sriLankaVideo from '../assets/sri-lanka-video.mp4';
import islandHopLogo from '../assets/IslandHopWhite.png';
import islandHopIcon from '../assets/islandHopIcon.png';
import './SignupPage.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [isClosing, setIsClosing] = useState(false); // Show popup on page visit
  const [nationality, setNationality] = useState('');
  const [showCountries, setShowCountries] = useState(false);
  const [languages, setLanguages] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showLanguages, setShowLanguages] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const navigate = useNavigate();

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
    'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
    'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea', 'South Korea', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
    'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau',
    'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
    'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
    'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain',
    'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
    'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen',
    'Zambia', 'Zimbabwe'
  ];

  const languagesList = [
    'Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian',
    'Bulgarian', 'Burmese', 'Catalan', 'Chinese (Mandarin)', 'Chinese (Cantonese)', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English',
    'Estonian', 'Filipino', 'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek', 'Gujarati', 'Hebrew',
    'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Irish', 'Italian', 'Japanese', 'Javanese', 'Kannada', 'Kazakh',
    'Khmer', 'Korean', 'Kurdish', 'Kyrgyz', 'Lao', 'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian',
    'Malay', 'Malayalam', 'Maltese', 'Marathi', 'Mongolian', 'Nepali', 'Norwegian', 'Pashto', 'Persian', 'Polish',
    'Portuguese', 'Punjabi', 'Romanian', 'Russian', 'Serbian', 'Sinhala', 'Slovak', 'Slovenian', 'Somali', 'Spanish',
    'Swahili', 'Swedish', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Uzbek', 'Vietnamese', 'Welsh', 'Xhosa', 'Yiddish', 'Yoruba', 'Zulu'
  ];

  const filteredCountries = nationality.trim() === '' 
    ? countries 
    : countries.filter(country =>
        country.toLowerCase().includes(nationality.toLowerCase())
      );

  const filteredLanguages = languages.trim() === ''
    ? languagesList
    : languagesList.filter(language =>
        language.toLowerCase().includes(languages.toLowerCase())
      );

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300); // Match the animation duration
  };

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
    setShowCountries(true);
  };

  const selectCountry = (country) => {
    setNationality(country);
    setShowCountries(false);
  };

  const handleLanguageChange = (e) => {
    setLanguages(e.target.value);
    setShowLanguages(true);
  };

  const selectLanguage = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
    setLanguages('');
    setShowLanguages(false);
  };

  const removeLanguage = (languageToRemove) => {
    setSelectedLanguages(selectedLanguages.filter(lang => lang !== languageToRemove));
  };

  // Calendar functions
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    setDateOfBirth(formatDate(selectedDate));
  };

  const changeMonth = (direction) => {
    setCalendarDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const changeYear = (direction) => {
    setCalendarDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + direction);
      return newDate;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside nationality field
      if (!event.target.closest('.nationality-field')) {
        setShowCountries(false);
      }
      
      // Check if click is outside languages field
      if (!event.target.closest('.languages-field')) {
        setShowLanguages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="signup-container">
      {/* Left side - Video area */}
      <div className="video-section">
        <div className="video-container">
          <video 
            className="signup-video"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src={sriLankaVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-logo" onClick={handleLogoClick}>
            <img src={islandHopIcon} alt="IslandHop Icon" className="logo-icon" />
            <img src={islandHopLogo} alt="IslandHop" className="logo-image" />
          </div>
          <div className="video-overlay">
            <div className="video-content">
              <h3>Welcome to IslandHop</h3>
              <p>Discover the beauty of Sri Lanka with our curated travel experiences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="form-section">
        <div className="signup-box">
          <h2>Create Account</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleEmailSignup}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <span 
                className="forgot-password" 
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </span>
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="divider"><span>or</span></div>
          <button onClick={handleGoogleSignup} className="google-button">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          <p className="login-link">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className={`popup-container ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Complete Your Profile</h3>
              <button className="close-button" onClick={closePopup}>
                ×
              </button>
            </div>
            <div className="popup-content">
              <p>
                Help us personalize your travel experience! We use this information to connect you with 
                like-minded travelers who share similar backgrounds and preferences for our ride pooling feature.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>
                <strong>Note:</strong> Skipping this step will disable ride pooling recommendations until completed. 
                All other IslandHop features will remain fully accessible.
              </p>
              <div className="popup-form">
                <div className="popup-input-group nationality-field">
                  <label>Nationality</label>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search for your country..."
                      value={nationality}
                      onChange={handleNationalityChange}
                      onFocus={() => setShowCountries(true)}
                      autoComplete="off"
                    />
                    {showCountries && (
                      <div className="countries-dropdown">
                        {filteredCountries.slice(0, 15).map((country) => (
                          <div
                            key={country}
                            className="country-option"
                            onClick={() => selectCountry(country)}
                          >
                            {country}
                          </div>
                        ))}
                        {filteredCountries.length === 0 && (
                          <div className="country-option no-results">
                            No countries found
                          </div>
                        )}
                        {filteredCountries.length > 15 && (
                          <div className="country-option show-more">
                            {filteredCountries.length - 15} more countries... (keep typing to filter)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="popup-input-group languages-field">
                  <label>Languages Spoken</label>
                  {selectedLanguages.length > 0 && (
                    <div className="selected-languages">
                      {selectedLanguages.map((language) => (
                        <span key={language} className="language-tag">
                          {language}
                          <button
                            type="button"
                            className="remove-language"
                            onClick={() => removeLanguage(language)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search and add languages..."
                      value={languages}
                      onChange={handleLanguageChange}
                      onFocus={() => setShowLanguages(true)}
                      autoComplete="off"
                    />
                    {showLanguages && (
                      <div className="countries-dropdown">
                        {filteredLanguages
                          .filter(lang => !selectedLanguages.includes(lang))
                          .slice(0, 15)
                          .map((language) => (
                          <div
                            key={language}
                            className="country-option"
                            onClick={() => selectLanguage(language)}
                          >
                            {language}
                          </div>
                        ))}
                        {filteredLanguages.filter(lang => !selectedLanguages.includes(lang)).length === 0 && (
                          <div className="country-option no-results">
                            {selectedLanguages.length > 0 ? 'All matching languages already selected' : 'No languages found'}
                          </div>
                        )}
                        {filteredLanguages.filter(lang => !selectedLanguages.includes(lang)).length > 15 && (
                          <div className="country-option show-more">
                            {filteredLanguages.filter(lang => !selectedLanguages.includes(lang)).length - 15} more languages... (keep typing to filter)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="popup-input-group date-field">
                  <label>Date of Birth</label>
                  {dateOfBirth && (
                    <div className="selected-date">
                      Selected: {dateOfBirth}
                    </div>
                  )}
                  <div className="calendar-container">
                    <div className="calendar-header">
                      <div className="year-controls">
                        <button type="button" onClick={() => changeYear(-1)}>‹‹</button>
                        <span className="year-display">{calendarDate.getFullYear()}</span>
                        <button type="button" onClick={() => changeYear(1)}>››</button>
                      </div>
                      <div className="month-controls">
                        <button type="button" onClick={() => changeMonth(-1)}>‹</button>
                        <span className="month-display">
                          {calendarDate.toLocaleDateString('en-US', { month: 'long' })}
                        </span>
                        <button type="button" onClick={() => changeMonth(1)}>›</button>
                      </div>
                    </div>
                    <div className="calendar-grid">
                      <div className="weekdays">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="weekday">{day}</div>
                        ))}
                      </div>
                      <div className="days-grid">
                        {Array.from({ length: getFirstDayOfMonth(calendarDate) }, (_, i) => (
                          <div key={`empty-${i}`} className="day empty"></div>
                        ))}
                        {Array.from({ length: getDaysInMonth(calendarDate) }, (_, i) => {
                          const day = i + 1;
                          const isSelected = dateOfBirth === formatDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day));
                          return (
                            <div
                              key={day}
                              className={`day ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleDateSelect(day)}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popup-buttons">
                  <button className="popup-submit-btn">Complete Setup</button>
                  <button className="popup-skip-btn" onClick={closePopup}>Skip for Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupPage;
