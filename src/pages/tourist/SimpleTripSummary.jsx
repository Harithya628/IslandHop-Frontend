import React, { useState } from 'react';
import { MapPin, Check, Navigation } from 'lucide-react';
import Navbar from '../../components/Navbar';
import './TripSummary.css';

// Mock locations data
const mockLocations = [
  { 
    id: 1, 
    name: 'Galle Fort', 
    lat: 6.0257, 
    lng: 80.2168, 
    type: 'historical',
    description: 'Historic fort built by the Portuguese in the 16th century'
  },
  { 
    id: 2, 
    name: 'Hikkaduwa Beach', 
    lat: 6.1395, 
    lng: 80.1063, 
    type: 'beach',
    description: 'Famous beach for surfing and marine life'
  },
  { 
    id: 3, 
    name: 'Yala National Park', 
    lat: 6.3598, 
    lng: 81.5048, 
    type: 'park',
    description: 'Sri Lanka\'s most famous wildlife park, home to leopards and elephants'
  },
  { 
    id: 4, 
    name: 'Sigiriya Rock', 
    lat: 7.9570, 
    lng: 80.7603, 
    type: 'historical',
    description: 'Ancient rock fortress with frescoes and landscaped gardens'
  },
  { 
    id: 5, 
    name: 'Kandy City', 
    lat: 7.2906, 
    lng: 80.6337, 
    type: 'city',
    description: 'Cultural capital known for the Temple of the Sacred Tooth Relic'
  },
  { 
    id: 6, 
    name: 'Ella', 
    lat: 6.8667, 
    lng: 81.0466, 
    type: 'mountain',
    description: 'Mountain village with spectacular views and hiking trails'
  },
  { 
    id: 7, 
    name: 'Mirissa Beach', 
    lat: 5.9483, 
    lng: 80.4564, 
    type: 'beach',
    description: 'Popular beach for whale watching and relaxation'
  },
  { 
    id: 8, 
    name: 'Trincomalee', 
    lat: 8.5711, 
    lng: 81.2335, 
    type: 'beach',
    description: 'Harbor city with pristine beaches and coral reefs'
  },
];

/**
 * A simplified version of TripSummary without Google Maps
 * Use this component if the Google Maps integration is causing issues
 */
const SimpleTripSummary = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const handleLocationClick = (locationId) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(selectedLocations.filter(id => id !== locationId));
    } else {
      setSelectedLocations([...selectedLocations, locationId]);
    }
  };
  
  // Helper function to get color based on location type
  const getLocationColor = (type) => {
    const colors = {
      beach: '#1FA9FF',
      historical: '#FF9900',
      mountain: '#7C4700',
      city: '#FF3E3E',
      park: '#33CC66'
    };
    return colors[type] || '#1FA9FF';
  };

  return (
    <div className="trip-dashboard-page">
      <Navbar />
      
      {/* Simplified map with color boxes instead of Google Map */}
      <div className="google-map-container">
        <div className="simple-map">
          <h2>Selected Destinations Map</h2>
          
          {selectedLocations.length === 0 ? (
            <div className="empty-map-message">
              <p>Select destinations from the panel to see them on your trip plan</p>
            </div>
          ) : (
            <div className="simple-map-grid">
              {mockLocations
                .filter(loc => selectedLocations.includes(loc.id))
                .map(location => (
                  <div 
                    key={location.id}
                    className="map-location-card"
                    style={{ 
                      borderLeft: `4px solid ${getLocationColor(location.type)}`
                    }}
                  >
                    <h3>{location.name}</h3>
                    <p>{location.description}</p>
                    <div className="location-coordinates">
                      <small>Location: {location.lat}, {location.lng}</small>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        
        {/* Destinations panel overlay */}
        <div className="destinations-panel">
          <div className="panel-header">
            <h3>Sri Lanka Destinations</h3>
          </div>
          
          <div className="location-selection">
            <h4>Select places to visit ({selectedLocations.length})</h4>
            <div className="location-options">
              {mockLocations.map(location => (
                <div 
                  key={location.id} 
                  className={`location-option ${selectedLocations.includes(location.id) ? 'selected' : ''}`}
                  onClick={() => handleLocationClick(location.id)}
                >
                  <div className={`location-icon ${location.type}`}>
                    {selectedLocations.includes(location.id) ? (
                      <Check size={16} />
                    ) : (
                      <MapPin size={16} />
                    )}
                  </div>
                  <span className="location-name">{location.name}</span>
                </div>
              ))}
            </div>
            
            {selectedLocations.length > 0 && (
              <div className="selected-locations-summary">
                <h4>Your Itinerary</h4>
                <ul className="selected-list">
                  {mockLocations
                    .filter(loc => selectedLocations.includes(loc.id))
                    .map((location, index) => (
                      <li key={location.id} className="selected-item">
                        <div className="item-number">{index + 1}</div>
                        <div className="item-content">
                          <span className="item-name">{location.name}</span>
                          <span className="item-type">{location.type}</span>
                        </div>
                        <button 
                          className="remove-btn"
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
                
                <button className="create-btn">
                  <Navigation size={16} />
                  Create Itinerary
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTripSummary;
