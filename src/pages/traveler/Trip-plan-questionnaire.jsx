import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Mountain, Waves, Camera, MapPin, Utensils, Music, Gamepad2, Book } from 'lucide-react';
import './Trip-plan-questionnaire.css' ; 

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const preferences = [
    { id: 'surfing', name: 'Surfing', icon: Waves },
    { id: 'hiking', name: 'Hiking', icon: Mountain },
    { id: 'photography', name: 'Photography', icon: Camera },
    { id: 'sightseeing', name: 'Sightseeing', icon: MapPin },
    { id: 'dining', name: 'Fine Dining', icon: Utensils },
    { id: 'nightlife', name: 'Nightlife', icon: Music },
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
        setEndDate(clickedDate);
      } else {
        setStartDate(clickedDate);
        setEndDate(null);
      }
    }
  };

  const handlePreferenceToggle = (preferenceId) => {
    setSelectedPreferences(prev => 
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
          {!isSecond && (
            <button 
              onClick={() => navigateMonth('prev')}
              className="nav-button"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {isSecond && <div className="nav-spacer"></div>}
          
          <div className="month-year">
            <span className="month">{months[month]}</span>
            <span className="year">{year}</span>
          </div>
          
          {!isSecond && (
            <button 
              onClick={() => navigateMonth('next')}
              className="nav-button"
            >
              <ChevronRight size={20} />
            </button>
          )}
          {isSecond && <div className="nav-spacer"></div>}
        </div>

        <div className="calendar-days-header">
          {daysOfWeek.map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day, month, year)}
              disabled={!day}
              className={`
                day-button
                ${!day ? 'day-empty' : ''}
                ${isDateSelected(day, month, year) ? 'day-selected' : ''}
                ${isDateInRange(day, month, year) ? 'day-in-range' : ''}
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const DateSelection = () => (
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
        <h2>What are your interests?</h2>
        <p>Select activities and experiences you'd like to enjoy</p>
      </div>

      <div className="preferences-grid">
        {preferences.map(preference => {
          const IconComponent = preference.icon;
          return (
            <button
              key={preference.id}
              onClick={() => handlePreferenceToggle(preference.id)}
              className={`preference-card ${selectedPreferences.includes(preference.id) ? 'selected' : ''}`}
            >
              <IconComponent size={32} className="preference-icon" />
              <span className="preference-name">{preference.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const StepThree = () => (
    <div className="step-content">
      <div className="step-header">
        <h2>Coming Soon</h2>
        <p>This step is still being developed</p>
      </div>
      <div className="coming-soon">
        <div className="coming-soon-content">
          <h3>Step 3 will be available soon!</h3>
          <p>We're working on adding more features to make your trip planning even better.</p>
        </div>
      </div>
    </div>
  );

  const canProceed = () => {
    if (currentStep === 1) return startDate && endDate;
    if (currentStep === 2) return selectedPreferences.length > 0;
    return false;
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      
      
      <div className="trip-planning-container">
        <div className="form-container">
          <div className="progress-section">
            <p className="progress-indicator">{currentStep} of 3</p>
            <h1 className="main-title">Planning your trip</h1>
            
            <div className="progress-bar">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}></div>
            </div>
          </div>

          {currentStep === 1 && <DateSelection />}
          {currentStep === 2 && <PreferencesSelection />}
          {currentStep === 3 && <StepThree />}

          <div className="navigation">
            <button 
              onClick={handleBack}
              className="nav-button-secondary"
              disabled={currentStep === 1}
            >
              <ChevronLeft size={18} />
              Back
            </button>
            
            <button 
              onClick={handleNext}
              className="next-button"
              disabled={!canProceed()}
            >
              Next
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionnaire;