import React, { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import './TripSummary.css';

// Mock locations data
const mockLocations = [
  { id: 1, name: 'Galle Fort', lat: 6.0257, lng: 80.2168, type: 'historical' },
  { id: 2, name: 'Hikkaduwa Beach', lat: 6.1395, lng: 80.1063, type: 'beach' },
  { id: 3, name: 'Yala National Park', lat: 6.3598, lng: 81.5048, type: 'park' },
  { id: 4, name: 'Sigiriya Rock', lat: 7.9570, lng: 80.7603, type: 'historical' },
  { id: 5, name: 'Kandy City', lat: 7.2906, lng: 80.6337, type: 'city' },
  { id: 6, name: 'Ella', lat: 6.8667, lng: 81.0466, type: 'mountain' },
  { id: 7, name: 'Mirissa Beach', lat: 5.9483, lng: 80.4564, type: 'beach' },
  { id: 8, name: 'Trincomalee', lat: 8.5711, lng: 81.2335, type: 'beach' },
];

const TripSummary = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const handleLocationClick = (locationId) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(selectedLocations.filter(id => id !== locationId));
    } else {
      setSelectedLocations([...selectedLocations, locationId]);
    }
  };

  const getLocationStyles = (location) => {
    const isSelected = selectedLocations.includes(location.id);
    const isHovered = hoveredLocation === location.id;
    
    let styles = {
      top: `${100 - (location.lat - 5.9) * 35}%`,
      left: `${(location.lng - 80) * 150}%`
    };
    
    if (isSelected) {
      styles.transform = 'scale(1.2)';
      styles.zIndex = 10;
    }
    
    if (isHovered) {
      styles.transform = 'scale(1.3)';
      styles.zIndex = 15;
    }
    
    return styles;
  };
  return (
    <div className="trip-dashboard-page">
      <Navbar />
      <div className="trip-dashboard-container">
        <div className="trip-dashboard-header">
          <h1>Trip Summary</h1>
          <p>Select destinations for your adventure</p>
        </div>
        <div className="trip-dashboard-content">
          <div className="map-section">
            <div className="map-container integrated">
              <div className="sri-lanka-map">
                <img src="/src/assets/sri-lanka-bg.jpg" alt="Sri Lanka Map" className="map-image" />
                
                {mockLocations.map((location) => (
                  <div 
                    key={location.id}
                    className={`map-pin ${selectedLocations.includes(location.id) ? 'selected' : ''} ${location.type}`}
                    style={getLocationStyles(location)}
                    onClick={() => handleLocationClick(location.id)}
                    onMouseEnter={() => setHoveredLocation(location.id)}
                    onMouseLeave={() => setHoveredLocation(null)}
                  >
                    {selectedLocations.includes(location.id) ? (
                      <Check size={16} className="pin-icon check" />
                    ) : (
                      <MapPin size={20} className="pin-icon" />
                    )}
                    <div className="location-tooltip">{location.name}</div>
                  </div>
                ))}
                
                <div className="overlay-panel">
                  <h3>Selected Destinations ({selectedLocations.length})</h3>
                  {selectedLocations.length === 0 ? (
                    <div className="empty-selection">
                      <p className="no-locations">Click pins on the map to select destinations</p>
                    </div>
                  ) : (
                    <ul className="location-list">
                      {mockLocations
                        .filter(loc => selectedLocations.includes(loc.id))
                        .map(location => (
                          <li key={location.id} className="location-item">
                            <span className="location-name">{location.name}</span>
                            <button 
                              className="remove-location" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLocationClick(location.id);
                              }}
                            >
                              ✕
                            </button>
                          </li>
                        ))
                      }
                    </ul>
                  )}
                  
                  {selectedLocations.length > 0 && (
                    <button className="save-locations-btn">
                      Create Itinerary
                    </button>
                  )}
                </div>
              </div>
              
              <div className="map-instructions">
                <p>Click on map pins to select destinations for your trip</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
