import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Plane, DollarSign, Clock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './TripDatesSelection.css';

const TripDatesSelection = () => {
  const navigate = useNavigate();
  const [currentTrip, setCurrentTrip] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(6); // July (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [flightData, setFlightData] = useState([]);
  const [selectedDateFlights, setSelectedDateFlights] = useState([]);

  useEffect(() => {
    // Get current trip from localStorage
    const tripData = localStorage.getItem('currentTrip');
    if (tripData) {
      setCurrentTrip(JSON.parse(tripData));
    } else {
      navigate('/my-trips');
    }

    // Load mock flight data
    loadFlightData();
  }, [navigate]);

  const loadFlightData = () => {
    // Mock flight data for different dates
    const mockFlights = [
      {
        date: '2025-07-11',
        flights: [
          {
            airline: 'SriLankan Airlines',
            price: 750,
            departure: '08:30',
            arrival: '14:45',
            duration: '14h 15m',
            stops: '1 stop'
          },
          {
            airline: 'Emirates',
            price: 920,
            departure: '10:15',
            arrival: '16:30',
            duration: '12h 15m',
            stops: '1 stop'
          },
          {
            airline: 'Qatar Airways',
            price: 850,
            departure: '22:30',
            arrival: '05:45+1',
            duration: '13h 15m',
            stops: '1 stop'
          }
        ]
      },
      {
        date: '2025-07-12',
        flights: [
          {
            airline: 'SriLankan Airlines',
            price: 780,
            departure: '09:00',
            arrival: '15:15',
            duration: '14h 15m',
            stops: '1 stop'
          },
          {
            airline: 'Emirates',
            price: 950,
            departure: '11:30',
            arrival: '17:45',
            duration: '12h 15m',
            stops: '1 stop'
          }
        ]
      }
    ];
    setFlightData(mockFlights);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    const dateString = clickedDate.toISOString().split('T')[0];
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      // Load flight data for this date
      const dayFlights = flightData.find(data => data.date === dateString);
      setSelectedDateFlights(dayFlights ? dayFlights.flights : []);
    } else if (startDate && !endDate) {
      if (clickedDate >= startDate) {
        // Calculate the difference in days
        const diffTime = Math.abs(clickedDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Check if the date range is within 30 days
        if (diffDays <= 30) {
          setEndDate(clickedDate);
        } else {
          // If more than 30 days, set the end date to start date + 30 days
          const maxEndDate = new Date(startDate);
          maxEndDate.setDate(startDate.getDate() + 30);
          setEndDate(maxEndDate);
        }
      } else {
        setStartDate(clickedDate);
        setEndDate(null);
      }
    }
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
    if (!day) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(year, month, day);
    return date < today;
  };

  const handleContinue = () => {
    if (startDate && endDate && currentTrip) {
      const updatedTrip = {
        ...currentTrip,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        dates: `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${endDate.getFullYear()}`
      };
      localStorage.setItem('currentTrip', JSON.stringify(updatedTrip));
      navigate('/plan-trip-preferences');
    }
  };

  const getNextMonth = () => {
    if (currentMonth === 11) {
      return { month: 0, year: currentYear + 1 };
    }
    return { month: currentMonth + 1, year: currentYear };
  };

  const nextMonth = getNextMonth();

  const Calendar = ({ month, year }) => {
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

        <div className="calendar-days">
          {days.map((day, index) => (
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
  };

  if (!currentTrip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trip-dates-page">
      <Navbar />
      <div className="trip-dates-container">
        <div className="planning-header">
          <h2>Planning your trip</h2>
        </div>
        
        <div className="step-indicator">
          <span>1 of 4</span>
        </div>
        
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-step active"></div>
            <div className="progress-step"></div>
            <div className="progress-step"></div>
            <div className="progress-step"></div>
          </div>
        </div>
        
        <div className="dates-header">
          <h1>When are you going to {currentTrip.name}?</h1>
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

        <div className="content-layout">
          <div className="calendars-section">
            <div className="calendars-container">
              <Calendar month={currentMonth} year={currentYear} />
              <Calendar month={nextMonth.month} year={nextMonth.year} />
            </div>

            {/* Flight Data Section */}
            {startDate && selectedDateFlights.length > 0 && (
              <div className="flight-data-section">
                <h3>
                  <Plane size={20} />
                  Flights for {startDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <div className="flights-list">
                  {selectedDateFlights.map((flight, index) => (
                    <div key={index} className="flight-card">
                      <div className="flight-main">
                        <div className="airline">{flight.airline}</div>
                        <div className="flight-times">
                          <span className="departure">{flight.departure}</span>
                          <div className="flight-duration">
                            <Clock size={14} />
                            <span>{flight.duration}</span>
                          </div>
                          <span className="arrival">{flight.arrival}</span>
                        </div>
                        <div className="flight-stops">{flight.stops}</div>
                      </div>
                      <div className="flight-price">
                        <DollarSign size={16} />
                        <span>${flight.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="dates-footer">
          <button 
            className="back-btn"
            onClick={() => navigate('/my-trips')}
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <button 
            className="next-btn"
            onClick={handleContinue}
            disabled={!startDate || !endDate}
          >
            Next
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripDatesSelection;
