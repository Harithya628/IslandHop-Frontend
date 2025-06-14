import { useState, useEffect } from 'react';
import Calendar from './Calendar';
import { countries } from '../data/countries';
import { languages } from '../data/languages';

function ProfileCompletionPopup({ showPopup, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [nationality, setNationality] = useState('');
  const [showCountries, setShowCountries] = useState(false);
  const [languageSearch, setLanguageSearch] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showLanguages, setShowLanguages] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');

  const filteredCountries = nationality.trim() === '' 
    ? countries 
    : countries.filter(country =>
        country.toLowerCase().includes(nationality.toLowerCase())
      );

  const filteredLanguages = languageSearch.trim() === ''
    ? languages
    : languages.filter(language =>
        language.toLowerCase().includes(languageSearch.toLowerCase())
      );

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
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
    setLanguageSearch(e.target.value);
    setShowLanguages(true);
  };

  const selectLanguage = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
    setLanguageSearch('');
    setShowLanguages(false);
  };

  const removeLanguage = (languageToRemove) => {
    setSelectedLanguages(selectedLanguages.filter(lang => lang !== languageToRemove));
  };

  const handleDateSelect = (formattedDate) => {
    setDateOfBirth(formattedDate);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log({
      nationality,
      selectedLanguages,
      dateOfBirth
    });
    closePopup();
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

  if (!showPopup) return null;

  return (
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
                  value={languageSearch}
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
              <Calendar 
                selectedDate={dateOfBirth}
                onDateSelect={handleDateSelect}
              />
            </div>
            <div className="popup-buttons">
              <button className="popup-submit-btn" onClick={handleSubmit}>Complete Setup</button>
              <button className="popup-skip-btn" onClick={closePopup}>Skip for Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCompletionPopup;
