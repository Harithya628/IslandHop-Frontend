import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mountain, Waves, Camera, MapPin, Utensils, Music, Gamepad2, Book, Building, ChevronLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './TripPreferencesSelection.css';

const TripPreferencesSelection = () => {
  const navigate = useNavigate();
  const [currentTrip, setCurrentTrip] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTerrainPreferences, setSelectedTerrainPreferences] = useState([]);
  const [selectedActivityPreferences, setSelectedActivityPreferences] = useState([]);

  useEffect(() => {
    const tripData = localStorage.getItem('currentTrip');
    if (tripData) {
      setCurrentTrip(JSON.parse(tripData));
    } else {
      navigate('/my-trips');
    }
  }, [navigate]);

  const terrainPreferences = [
    { id: 'beaches', name: 'Beach', icon: Waves, color: '#007bff' },
    { id: 'mountains', name: 'Mountain', icon: Mountain, color: '#28a745' },
    { id: 'forests', name: 'Forest', icon: Mountain, color: '#20c997' },
    { id: 'historical', name: 'Historical', icon: Book, color: '#6f42c1' },
    { id: 'city', name: 'City', icon: Building, color: '#fd7e14' },
    { id: 'parks', name: 'National Park', icon: MapPin, color: '#198754' },
    { id: 'islands', name: 'Island', icon: Waves, color: '#0dcaf0' },
    { id: 'wetland', name: 'Wetland', icon: Camera, color: '#6c757d' },
    { id: 'countryside', name: 'Countryside', icon: MapPin, color: '#ffc107' }
  ];
  
  const activityPreferences = [
    { id: 'surfing', name: 'Surfing', icon: Waves, color: '#007bff' },
    { id: 'hiking', name: 'Hiking', icon: Mountain, color: '#28a745' },
    { id: 'photography', name: 'Photography', icon: Camera, color: '#6f42c1' },
    { id: 'sightseeing', name: 'Sightseeing', icon: MapPin, color: '#fd7e14' },
    { id: 'dining', name: 'Fine Dining', icon: Utensils, color: '#dc3545' },
    { id: 'nightlife', name: 'Nightlife', icon: Music, color: '#e83e8c' },
    { id: 'snorkeling', name: 'Snorkeling', icon: Waves, color: '#0dcaf0' },
    { id: 'adventure', name: 'Adventure Sports', icon: Gamepad2, color: '#ff6b35' },
    { id: 'culture', name: 'Cultural Tours', icon: Book, color: '#6f42c1' },
    { id: 'wildlife', name: 'Wildlife Safari', icon: Camera, color: '#198754' },
    { id: 'wellness', name: 'Spa & Wellness', icon: Mountain, color: '#20c997' },
    { id: 'shopping', name: 'Shopping', icon: Building, color: '#ffc107' }
  ];

  const handleTerrainToggle = (preferenceId) => {
    setSelectedTerrainPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleActivityToggle = (preferenceId) => {
    setSelectedActivityPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedTerrainPreferences.length > 0;
    if (currentStep === 2) return selectedActivityPreferences.length > 0;
    return false;
  };

  const handleNext = () => {
    if (canProceed()) {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
      } else {
        // Save preferences and navigate to itinerary planning
        const updatedTrip = {
          ...currentTrip,
          terrainPreferences: selectedTerrainPreferences,
          activityPreferences: selectedActivityPreferences
        };
        localStorage.setItem('currentTrip', JSON.stringify(updatedTrip));
        navigate('/trip-itinerary');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/plan-trip-dates');
    }
  };

  if (!currentTrip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trip-preferences-page">
      <Navbar />
      <div className="trip-preferences-container">
        <div className="preferences-header">
          <div className="progress-section">
            <p className="progress-indicator">Step {currentStep} of 2</p>
            <h1>Tell us about your travel style</h1>
            <div className="progress-bar">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="step-container">
          {currentStep === 1 && (
            <div className="step-content">
              <div className="step-header">
                <h2>What terrains do you prefer?</h2>
                <p>Select the types of landscapes you'd like to visit in Sri Lanka</p>
              </div>

              <div className="preferences-grid">
                {terrainPreferences.map(preference => {
                  const IconComponent = preference.icon;
                  const isSelected = selectedTerrainPreferences.includes(preference.id);
                  return (
                    <button
                      key={preference.id}
                      onClick={() => handleTerrainToggle(preference.id)}
                      className={`preference-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        '--accent-color': preference.color,
                        borderColor: isSelected ? preference.color : '#e9ecef'
                      }}
                    >
                      <div className="preference-icon-wrapper">
                        <IconComponent 
                          size={32} 
                          className="preference-icon"
                          style={{ color: isSelected ? 'white' : preference.color }}
                        />
                      </div>
                      <span className="preference-name">{preference.name}</span>
                      {isSelected && <div className="selection-indicator">✓</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <div className="step-header">
                <h2>What activities interest you?</h2>
                <p>Select the activities you'd like to enjoy during your trip</p>
              </div>

              <div className="preferences-grid activities-grid">
                {activityPreferences.map(activity => {
                  const IconComponent = activity.icon;
                  const isSelected = selectedActivityPreferences.includes(activity.id);
                  return (
                    <button
                      key={activity.id}
                      onClick={() => handleActivityToggle(activity.id)}
                      className={`preference-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        '--accent-color': activity.color,
                        borderColor: isSelected ? activity.color : '#e9ecef'
                      }}
                    >
                      <div className="preference-icon-wrapper">
                        <IconComponent 
                          size={28} 
                          className="preference-icon"
                          style={{ color: isSelected ? 'white' : activity.color }}
                        />
                      </div>
                      <span className="preference-name">{activity.name}</span>
                      {isSelected && <div className="selection-indicator">✓</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="navigation">
            <button 
              onClick={handleBack}
              className="nav-button-secondary"
            >
              <ChevronLeft size={20} />
              <span className="button-text">Back</span>
            </button>
            
            <button 
              onClick={handleNext}
              className={`next-button ${currentStep === 2 ? 'final-step' : ''}`}
              disabled={!canProceed()}
            >
              <span className="button-text">
                {currentStep === 2 ? 'Start Planning' : 'Next'}
              </span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripPreferencesSelection;
