import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Mountain, Waves, Camera, MapPin, Utensils, Music, Gamepad2, Book, Building } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Trip-plan-questionnaire.css' ;

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedTerrainPreferences, setSelectedTerrainPreferences] = useState([]);
  const [selectedActivityPreferences, setSelectedActivityPreferences] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];  const terrainPreferences = [
    { id: 'beaches', name: 'Beach', icon: Waves },
    { id: 'mountains', name: 'Mountain', icon: Mountain },
    { id: 'forests', name: 'Forest', icon: Mountain },
    { id: 'historical', name: 'Historical', icon: Book },
    { id: 'city', name: 'City', icon: Building },
    { id: 'parks', name: 'Park', icon: MapPin },
    { id: 'islands', name: 'Island', icon: Waves },
    { id: 'wetland', name: 'Wetland', icon: Camera },
    { id: 'countryside', name: 'Countryside', icon: MapPin }
  ];
  
  const activityPreferences = [
    { id: 'surfing', name: 'Surfing', icon: Waves },
    { id: 'hiking', name: 'Hiking', icon: Mountain },
    { id: 'photography', name: 'Photography', icon: Camera },
    { id: 'sightseeing', name: 'Sightseeing', icon: MapPin },
    { id: 'dining', name: 'Fine Dining', icon: Utensils },
    { id: 'nightlife', name: 'Nightlife', icon: Music },
    { id: 'snorkeling', name: 'Snorkeling', icon: Waves },
    { id: 'adventure', name: 'Adventure Sports', icon: Gamepad2 },
    { id: 'culture', name: 'Cultural Tours', icon: Book }
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };
  const handleDateClick = (day, month, year) => {
    if (!day) return;
    
    const clickedDate = new Date(year, month, day);
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate >= startDate) {
        // Calculate the difference in days
        const diffTime = Math.abs(clickedDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Check if the date range is within 14 days
        if (diffDays <= 14) {
          setEndDate(clickedDate);        } else {
          // If more than 14 days, set the end date to start date + 14 days
          const maxEndDate = new Date(startDate);
          maxEndDate.setDate(startDate.getDate() + 14);
          setEndDate(maxEndDate);
        }
      } else {
        setStartDate(clickedDate);
        setEndDate(null);
      }
    }
  };
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

  const isDateSelected = (day, month, year) => {
    if (!day) return false;
    const date = new Date(year, month, day);
    return (startDate && date.getTime() === startDate.getTime()) ||
           (endDate && date.getTime() === endDate.getTime());
  };

  const isDateInRange = (day, month, year) => {
    if (!day || !startDate || !endDate) return false;
    const date = new Date(year, month, day);
    return date > startDate && date < endDate;
  };
  const isDateDisabled = (day, month, year) => {
    if (!day) return true; // Empty days are disabled
    if (!startDate) return false; // If no start date selected, nothing is disabled
    
    const date = new Date(year, month, day);
    if (date < startDate) return false; // Previous dates from start date should be selectable for re-selection
    
    // Check if the date is more than 14 days after the start date
    const diffTime = Math.abs(date - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 14;
  };

  const getNextMonth = () => {
    if (currentMonth === 11) {
      return { month: 0, year: currentYear + 1 };
    }
    return { month: currentMonth + 1, year: currentYear };
  };

  const nextMonth = getNextMonth();
  const Calendar = ({ month, year, isSecond = false }) => {
    const days = generateCalendarDays(month, year);

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button 
            onClick={() => navigateMonth('prev')}
            className="nav-button"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="month-year">
            <span className="month">{months[month]}</span>
            <span className="year">{year}</span>
          </div>
          
          <button 
            onClick={() => navigateMonth('next')}
            className="nav-button"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-days-header">
          {daysOfWeek.map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day, month, year)}
              disabled={!day || isDateDisabled(day, month, year)}
              className={`
                day-button
                ${!day ? 'day-empty' : ''}
                ${isDateSelected(day, month, year) ? 'day-selected' : ''}
                ${isDateInRange(day, month, year) ? 'day-in-range' : ''}
                ${isDateDisabled(day, month, year) && day ? 'day-disabled' : ''}
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  };  const DateSelection = () => (
    <div className="step-content">
      <div className="step-header">
        <h2>When are you going?</h2>
        <p>Select your trip start and end dates</p>
      </div>

      {(startDate || endDate) && (
        <div className="date-display">
          <div className="selected-dates">
            {startDate && (
              <div className="date-info">
                <span className="date-label">Start: </span>
                <span className="date-value">{startDate.toLocaleDateString()}</span>
              </div>
            )}
            {startDate && endDate && <ArrowRight size={16} className="date-arrow" />}
            {endDate && (
              <div className="date-info">
                <span className="date-label">End: </span>
                <span className="date-value">{endDate.toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="calendars-container">
        <Calendar month={currentMonth} year={currentYear} />
        <Calendar month={nextMonth.month} year={nextMonth.year} isSecond={true} />
      </div>
    </div>
  );
  const PreferencesSelection = () => (
    <div className="step-content">
      <div className="step-header">
        <h2>What terrains do you prefer?</h2>
        <p>Select the types of landscapes you'd like to visit</p>
      </div>

      <div className="preferences-grid">
        {terrainPreferences.map(preference => {
          const IconComponent = preference.icon;
          return (
            <button
              key={preference.id}
              onClick={() => handleTerrainToggle(preference.id)}
              className={`preference-card ${selectedTerrainPreferences.includes(preference.id) ? 'selected' : ''}`}
            >
              <IconComponent size={32} className="preference-icon" />
              <span className="preference-name">{preference.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const ActivitiesSelection = () => (
    <div className="step-content">
      <div className="step-header">
        <h2>What activities interest you?</h2>
        <p>Select the activities you'd like to enjoy during your trip</p>
      </div>

      <div className="preferences-grid">
        {activityPreferences.map(activity => {
          const IconComponent = activity.icon;
          return (
            <button
              key={activity.id}
              onClick={() => handleActivityToggle(activity.id)}
              className={`preference-card ${selectedActivityPreferences.includes(activity.id) ? 'selected' : ''}`}
            >
              <IconComponent size={32} className="preference-icon" />
              <span className="preference-name">{activity.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
  const canProceed = () => {
    if (currentStep === 1) return startDate && endDate;
    if (currentStep === 2) return selectedTerrainPreferences.length > 0;
    if (currentStep === 3) return selectedActivityPreferences.length > 0;
    return false;  };

  const handleNext = () => {
    if (canProceed()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Handle form completion - navigate to summary page & log data
        console.log("Trip planning completed!", {
          dates: { start: startDate, end: endDate },
          terrainPreferences: selectedTerrainPreferences,
          activityPreferences: selectedActivityPreferences
        });
        
        // Navigate to the trip summary page
        navigate("/trip-summary");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };  return (
    <div className="questionnaire-page">
      <Navbar />
        <div className="trip-planning-container">        <div className="progress-section">
          <p className="progress-indicator">Step {currentStep} of 3</p>
          <h1 className="main-title">Plan Your Perfect Trip</h1>
            <div className="questionnaire-progress-bar">
            <div className={`questionnaire-progress-step ${currentStep >= 1 ? 'active' : ''}`}></div>
            <div className={`questionnaire-progress-step ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`questionnaire-progress-step ${currentStep >= 3 ? 'active' : ''}`}></div>
          </div>
        </div>
          <div className="step-container">          {currentStep === 1 && <DateSelection />}
          {currentStep === 2 && <PreferencesSelection />}
          {currentStep === 3 && <ActivitiesSelection />}
          
          <div className="navigation"><button 
              onClick={handleBack}
              className="nav-button-secondary"
              disabled={currentStep === 1}
            >
              <ChevronLeft size={20} />
              <span className="button-text">Back</span>
            </button>
            
            <button 
              onClick={handleNext}
              className={`next-button ${currentStep === 3 ? 'final-step' : ''}`}
              disabled={!canProceed()}
            >
              <span className="button-text">{currentStep === 3 ? 'Finish' : 'Next'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Questionnaire;