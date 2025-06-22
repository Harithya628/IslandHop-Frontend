import React, { useState } from 'react';
import '../Page.css';
import './PlanTripPage.css';

const PlanTrip = ({ onPageChange }) => {
  const [tripType, setTripType] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState([]);
  const [accommodation, setAccommodation] = useState('');
  const [transportation, setTransportation] = useState('');

  const sriLankanDestinations = [
    'Colombo', 'Kandy', 'Galle', 'Ella', 'Sigiriya', 'Anuradhapura', 
    'Polonnaruwa', 'Nuwara Eliya', 'Bentota', 'Mirissa', 'Hikkaduwa',
    'Trincomalee', 'Jaffna', 'Dambulla', 'Negombo', 'Arugam Bay'
  ];

  const tripTypes = [
    { value: 'adventure', label: 'Adventure & Nature', icon: '🏔️' },
    { value: 'cultural', label: 'Cultural Heritage', icon: '🏛️' },
    { value: 'beach', label: 'Beach & Relaxation', icon: '🏖️' },
    { value: 'wildlife', label: 'Wildlife Safari', icon: '🐘' },
    { value: 'spiritual', label: 'Spiritual Journey', icon: '🙏' },
    { value: 'food', label: 'Culinary Experience', icon: '🍛' }
  ];

  const budgetRanges = [
    { value: 'budget', label: 'Budget ($10-30/day)', icon: '💰' },
    { value: 'mid', label: 'Mid-range ($30-80/day)', icon: '💳' },
    { value: 'luxury', label: 'Luxury ($80+/day)', icon: '💎' }
  ];

  const interestOptions = [
    'Temples & Ancient Sites', 'National Parks', 'Beaches', 'Mountains',
    'Tea Plantations', 'Local Markets', 'Street Food', 'Photography',
    'Hiking & Trekking', 'Water Sports', 'Spa & Wellness', 'Train Rides'
  ];

  const accommodationTypes = [
    { value: 'hotel', label: 'Hotel', icon: '🏨' },
    { value: 'guesthouse', label: 'Guesthouse', icon: '🏠' },
    { value: 'villa', label: 'Villa', icon: '🏡' },
    { value: 'hostel', label: 'Hostel', icon: '🛏️' },
    { value: 'resort', label: 'Resort', icon: '🌴' },
    { value: 'homestay', label: 'Homestay', icon: '👨‍👩‍👧‍👦' }
  ];

  const transportationOptions = [
    { value: 'rental', label: 'Car Rental', icon: '🚗' },
    { value: 'driver', label: 'Private Driver', icon: '👨‍✈️' },
    { value: 'public', label: 'Public Transport', icon: '🚌' },
    { value: 'tuk', label: 'Tuk Tuk', icon: '🛺' },
    { value: 'train', label: 'Train', icon: '🚂' },
    { value: 'mixed', label: 'Mixed Transport', icon: '🚊' }
  ];

  const handleInterestToggle = (interest) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handlePlanTrip = () => {
    // Here you would normally send the data to your backend
    console.log('Trip Plan:', {
      tripType, destination, startDate, endDate, travelers,
      budget, interests, accommodation, transportation
    });
    
    // For now, just show a success message
    alert('Trip plan created! We\'ll send you personalized recommendations soon.');
  };

  return (
    <div className="page">
      <div className="plan-trip-container">
        <div className="plan-trip-header">
          <h1>Plan Your Perfect Sri Lankan Adventure</h1>
          <p>Let us help you create an unforgettable journey through the Pearl of the Indian Ocean</p>
        </div>

        <div className="trip-planning-form">
          {/* Trip Type Selection */}
          <div className="form-section">
            <h3>What type of experience are you looking for?</h3>
            <div className="trip-type-grid">
              {tripTypes.map((type) => (
                <div 
                  key={type.value}
                  className={`trip-type-card ${tripType === type.value ? 'selected' : ''}`}
                  onClick={() => setTripType(type.value)}
                >
                  <span className="trip-type-icon">{type.icon}</span>
                  <span className="trip-type-label">{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destination and Dates */}
          <div className="form-section">
            <h3>Where and when would you like to go?</h3>
            <div className="destination-dates-row">
              <div className="form-group">
                <label>Preferred Destination</label>
                <select 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a destination</option>
                  <option value="flexible">I'm flexible</option>
                  {sriLankanDestinations.map(dest => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Number of Travelers</label>
                <input 
                  type="number" 
                  min="1" 
                  max="20"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Budget Selection */}
          <div className="form-section">
            <h3>What's your budget range?</h3>
            <div className="budget-grid">
              {budgetRanges.map((budgetOption) => (
                <div 
                  key={budgetOption.value}
                  className={`budget-card ${budget === budgetOption.value ? 'selected' : ''}`}
                  onClick={() => setBudget(budgetOption.value)}
                >
                  <span className="budget-icon">{budgetOption.icon}</span>
                  <span className="budget-label">{budgetOption.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="form-section">
            <h3>What interests you most? (Select all that apply)</h3>
            <div className="interests-grid">
              {interestOptions.map((interest) => (
                <div 
                  key={interest}
                  className={`interest-tag ${interests.includes(interest) ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>

          {/* Accommodation */}
          <div className="form-section">
            <h3>Preferred accommodation type</h3>
            <div className="accommodation-grid">
              {accommodationTypes.map((type) => (
                <div 
                  key={type.value}
                  className={`accommodation-card ${accommodation === type.value ? 'selected' : ''}`}
                  onClick={() => setAccommodation(type.value)}
                >
                  <span className="accommodation-icon">{type.icon}</span>
                  <span className="accommodation-label">{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div className="form-section">
            <h3>How would you like to get around?</h3>
            <div className="transportation-grid">
              {transportationOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`transportation-card ${transportation === option.value ? 'selected' : ''}`}
                  onClick={() => setTransportation(option.value)}
                >
                  <span className="transportation-icon">{option.icon}</span>
                  <span className="transportation-label">{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-section">
            <button 
              className="plan-trip-btn"
              onClick={handlePlanTrip}
              disabled={!tripType || !startDate || !endDate || !budget}
            >
              Create My Trip Plan
            </button>
            <p className="form-note">
              We'll use this information to create a personalized itinerary and connect you with relevant travel companions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;
