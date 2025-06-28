import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './TripSummary.css';

const TripSummary = () => {
  const mapRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [planningData, setPlanningData] = useState({});

  // Mock data for selected dates - replace with actual data from questionnaire
  useEffect(() => {
    // This would typically come from props, context, or localStorage
    const mockDates = [
      { date: '2025-07-01', activity: 'Arrival in Colombo', location: 'Colombo' },
      { date: '2025-07-02', activity: 'Beach Day', location: 'Bentota' },
      { date: '2025-07-03', activity: 'Cultural Tour', location: 'Kandy' },
      { date: '2025-07-04', activity: 'Tea Plantation Visit', location: 'Nuwara Eliya' },
      { date: '2025-07-05', activity: 'Safari', location: 'Yala National Park' },
      { date: '2025-07-06', activity: 'Ancient City Tour', location: 'Anuradhapura' },
      { date: '2025-07-07', activity: 'Beach Relaxation', location: 'Mirissa' },
      { date: '2025-07-08', activity: 'Whale Watching', location: 'Mirissa' },
      { date: '2025-07-09', activity: 'City Exploration', location: 'Galle' },
      { date: '2025-07-10', activity: 'Departure', location: 'Colombo' }
    ];
    setSelectedDates(mockDates);

    // Initialize planning data for each date
    const initialPlanningData = {};
    mockDates.forEach((date, index) => {
      initialPlanningData[index] = {
        activities: [
          { name: date.activity, time: '10:00 AM' }
        ],
        location: date.location,
        notes: `Plan your ${date.activity.toLowerCase()} in ${date.location}`
      };
    });
    setPlanningData(initialPlanningData);
  }, []);

  const handleDateSelect = (index) => {
    setSelectedDateIndex(index);
  };

  const getSelectedDateInfo = () => {
    if (selectedDateIndex === null) return null;
    return selectedDates[selectedDateIndex];
  };

  const getSelectedPlanningData = () => {
    if (selectedDateIndex === null) return null;
    return planningData[selectedDateIndex] || {};
  };

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    // Initialize the map
    const initializeMap = () => {
      if (mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 7.8731, lng: 80.7718 }, // Sri Lanka center
          zoom: 8,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        });
      }
    };

    loadGoogleMaps();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="trip-summary-container">
        {/* Left Sidebar for Selected Dates */}
        <div className="trip-sidebar">
          <div className="dates-container">
            {selectedDates.map((item, index) => (
              <div 
                key={index} 
                className={`date-card ${selectedDateIndex === index ? 'selected' : ''}`}
                onClick={() => handleDateSelect(index)}
              >
                <div className="date-text">
                  {new Date(item.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Sidebar */}
        <div className="planning-sidebar">
          {selectedDateIndex !== null ? (
            <>
              <div className="planning-header">
                <h3>Day Planning</h3>
                <div className="planning-date">
                  {new Date(getSelectedDateInfo().date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <div className="planning-section">
                <h4>Location</h4>
                <div className="location-info">
                  <div className="location-name">{getSelectedPlanningData().location}</div>
                  <div className="location-description">
                    {getSelectedPlanningData().notes}
                  </div>
                </div>
              </div>

              <div className="planning-section">
                <h4>Activities</h4>
                <div className="activity-list">
                  {getSelectedPlanningData().activities?.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div>
                        <div className="activity-name">{activity.name}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="add-activity-btn">
                  + Add Activity
                </button>
              </div>
            </>
          ) : (
            <div className="no-date-selected">
              <div>
                <p>Select a date from the left sidebar</p>
                <p>to start planning your day</p>
              </div>
            </div>
          )}
        </div>

        {/* Map Container */}
        <div 
          ref={mapRef} 
          className="map-container"
        />
      </div>
      <Footer />
    </div>
  );
};

export default TripSummary;