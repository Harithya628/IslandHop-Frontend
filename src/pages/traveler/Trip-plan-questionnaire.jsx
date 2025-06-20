import React, { useState, useEffect } from 'react';
import { CalendarIcon, ChevronRight, ChevronLeft, Mountain, Waves, Tent, Camera, MapPin, Users, Utensils, Car } from 'lucide-react';
import './Trip-plan-questionnaire.css';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    preferences: []
  });

  const travelPreferences = [
    { id: 'hiking', label: 'Hiking', icon: Mountain },
    { id: 'surfing', label: 'Surfing', icon: Waves },
    { id: 'camping', label: 'Camping', icon: Tent },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'sightseeing', label: 'Sightseeing', icon: MapPin },
    { id: 'socializing', label: 'Meeting People', icon: Users },
    { id: 'foodie', label: 'Food Tours', icon: Utensils },
    { id: 'roadtrip', label: 'Road Trips', icon: Car }
  ];

  const handleDateChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceToggle = (prefId) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(prefId)
        ? prev.preferences.filter(id => id !== prefId)
        : [...prev.preferences, prefId]
    }));
  };
  // Determine if steps are valid and ready to proceed
  const isStep1Valid = formData.startDate && formData.endDate;
  const isStep2Valid = formData.preferences.length > 0;

  const handleNext = () => {
    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid) {
      // Handle final submission or move to next step
      console.log('Trip data:', formData);
      alert('Trip preferences saved! Ready for next step.');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };  // Calendar component for direct date selection
  const DateRangePicker = ({ startDate, endDate, onDateRangeChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hoverDate, setHoverDate] = useState(null);
    const [selectingStartDate, setSelectingStartDate] = useState(!startDate);
    
    // Reset selection mode when dates change externally
    useEffect(() => {
      if (!startDate) {
        setSelectingStartDate(true);
      } else if (!endDate) {
        setSelectingStartDate(false);
      }
    }, [startDate, endDate]);
    
    // Get days in month
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };
    
    // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
    const getFirstDayOfMonth = (year, month) => {
      return new Date(year, month, 1).getDay();
    };
    
    const handleDateClick = (day) => {
      const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      
      if (selectingStartDate) {
        // Selecting start date
        onDateRangeChange(formatDate(clickedDate), null);
        setSelectingStartDate(false);
      } else {
        // Selecting end date
        const start = new Date(startDate);
        
        // Ensure end date is not before start date
        if (clickedDate >= start) {
          onDateRangeChange(startDate, formatDate(clickedDate));
        } else {
          // If clicked date is before start date, reset and use it as the start date
          onDateRangeChange(formatDate(clickedDate), null);
          setSelectingStartDate(false);
        }
      }
    };
    
    const handleMouseEnter = (day) => {
      if (!selectingStartDate && startDate) {
        const hoverDateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setHoverDate(formatDate(hoverDateObj));
      }
    };
    
    const handleMouseLeave = () => {
      setHoverDate(null);
    };
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const isDateInRange = (day) => {
      if (!startDate || (!endDate && !hoverDate)) return false;
      
      const date = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
      const end = endDate || hoverDate;
      
      return date >= startDate && date <= end;
    };
    
    const isStartDate = (day) => {
      if (!startDate) return false;
      const date = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
      return date === startDate;
    };
    
    const isEndDate = (day) => {
      if (!endDate) return false;
      const date = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
      return date === endDate;
    };
    
    const changeMonth = (delta) => {
      setCurrentMonth(prevMonth => {
        const newMonth = new Date(prevMonth);
        newMonth.setMonth(prevMonth.getMonth() + delta);
        return newMonth;
      });
    };
    
    // Today's date for minDate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Render calendar
    const renderCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDayOfMonth = getFirstDayOfMonth(year, month);
      
      let days = [];
      
      // Add empty cells for days before first day of month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
      }
      
      // Add cells for days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isPast = date < today;
        const isStart = isStartDate(day);
        const isEnd = isEndDate(day);
        const isInRange = isDateInRange(day);
        
        days.push(
          <div
            key={`day-${day}`}
            className={`calendar-day ${isPast ? 'past' : ''} 
                        ${isStart ? 'start-date' : ''} 
                        ${isEnd ? 'end-date' : ''} 
                        ${isInRange && !isStart && !isEnd ? 'in-range' : ''}
                        ${!isPast ? 'selectable' : ''}`}
            onClick={() => !isPast && handleDateClick(day)}
            onMouseEnter={() => !isPast && handleMouseEnter(day)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="day-number">{day}</span>
          </div>
        );
      }
      
      return days;
    };
    
    // Format dates for display
    const formatDateForDisplay = (dateStr) => {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    };

    return (
      <div className="date-range-picker">
        <div className="calendar-select-info">
          {selectingStartDate ? 
            'Select your trip start date' : 
            startDate && !endDate ? 'Now select your trip end date' : ''}
        </div>
        
        <div className="calendar-container">
          <div className="calendar-header">
            <button onClick={() => changeMonth(-1)} className="month-nav">
              <ChevronLeft size={18} />
            </button>
            <div className="current-month">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button onClick={() => changeMonth(1)} className="month-nav">
              <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="weekday-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => 
              <div key={day} className="weekday">{day}</div>
            )}
          </div>
          
          <div className="calendar-days">
            {renderCalendarDays()}
          </div>
        </div>

        {/* <div className="selected-dates-display">
          <div className="date-display">
            <div className="date-label">Start Date:</div>
            <div className="date-value">
              {startDate ? formatDateForDisplay(startDate) : 'Not selected'}
            </div>
          </div>
          
          <div className="date-display">
            <div className="date-label">End Date:</div>
            <div className="date-value">
              {endDate ? formatDateForDisplay(endDate) : 'Not selected'}
            </div>
          </div>
        </div> */}
        
        {startDate && endDate && (
          <div className="duration-info">
            <p className="duration-text">
              Trip duration: {Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
        )}
      </div>
    );
  };

  const DateSelectionStep = () => {
    const handleDateRangeChange = (startDate, endDate) => {
      setFormData(prev => ({
        ...prev,
        startDate: startDate,
        endDate: endDate
      }));
    };
      return (
      <div className="date-selection-container">
        <div className="step-header">
          <CalendarIcon className="step-icon" strokeWidth={2} />
          <h2 className="step-title">When are you going?</h2>
        </div>
        
        <DateRangePicker
          startDate={formData.startDate}
          endDate={formData.endDate}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
    );
  };
  const PreferencesStep = () => (
    <div className="preferences-container">
      <div className="preferences-header">
        <div className="step-header">
          <Mountain className="step-icon" strokeWidth={2} />
          <h2 className="step-title">Choose Your Travel Preferences</h2>
        </div>
        <p className="step-subtitle">Select all activities that interest you</p>
      </div>
      
      <div className="preferences-grid">
        {travelPreferences.map((pref) => {
          const IconComponent = pref.icon;
          const isSelected = formData.preferences.includes(pref.id);
          
          return (
            <button
              key={pref.id}
              onClick={() => handlePreferenceToggle(pref.id)}
              className={`preference-card ${isSelected ? 'selected' : ''}`}
            >
              <IconComponent className={`preference-icon ${isSelected ? 'selected' : ''}`} />
              <p className="preference-label">{pref.label}</p>
            </button>
          );
        })}
      </div>
      
      {/* {formData.preferences.length > 0 && (
        <div className="selected-preferences">
          <p className="selected-text">
            Selected: {formData.preferences.map(id => 
              travelPreferences.find(p => p.id === id)?.label
            ).join(', ')}
          </p>
        </div>
      )} */}
    </div>
  );

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-wrapper">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              1
            </div>
            <div className={`progress-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              2
            </div>
          </div>
          <div className="progress-labels">
            <span>Dates</span>
            <span>Preferences</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content1">
         
          
          {currentStep === 1 && <DateSelectionStep />}
          {currentStep === 2 && <PreferencesStep />}
          
          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button
              onClick={handleBack}
              className={`nav-button back-button ${currentStep === 1 ? 'invisible' : ''}`}
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid)
              }
              className={`nav-button next-button ${
                ((currentStep === 1 && isStep1Valid) || (currentStep === 2 && isStep2Valid))
                  ? 'enabled'
                  : 'disabled'
              }`}
            >
              {currentStep === 2 ? 'Complete' : 'Next'}
              {currentStep === 1 && <ChevronRight className="next-icon" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;