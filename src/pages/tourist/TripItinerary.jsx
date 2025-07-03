import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  ChevronDown,
  ChevronUp,
  X,
  Hotel,
  Camera,
  Utensils,
  Car
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LocationSearchModal from '../../components/LocationSearchModal';
import './TripItinerary.css';

const TripItinerary = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [expandedDays, setExpandedDays] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationSearchType, setLocationSearchType] = useState('attraction');
  const [tripDays, setTripDays] = useState([]);

  const generateMockLocations = (dayNumber) => {
    const mockLocations = [
      {
        id: 1,
        name: 'Sigiriya Rock Fortress',
        type: 'attraction',
        time: '09:00',
        duration: '3 hours',
        description: 'Ancient rock fortress and palace ruins',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
        rating: 4.8,
        category: 'Historical Site'
      },
      {
        id: 2,
        name: 'Heritance Kandalama',
        type: 'hotel',
        time: '15:00',
        duration: 'Overnight',
        description: 'Luxury eco-hotel with stunning views',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop',
        rating: 4.6,
        category: 'Accommodation'
      },
      {
        id: 3,
        name: 'Dambulla Cave Temple',
        type: 'attraction',
        time: '11:00',
        duration: '2 hours',
        description: 'Ancient Buddhist cave temple complex',
        image: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=300&h=200&fit=crop',
        rating: 4.7,
        category: 'Religious Site'
      }
    ];

    // Return different locations based on day number
    if (dayNumber === 1) {
      return [mockLocations[0], mockLocations[1]];
    } else if (dayNumber === 2) {
      return [mockLocations[2]];
    }
    
    return [];
  };

  useEffect(() => {
    const tripData = localStorage.getItem('currentTrip');
    if (tripData) {
      const trip = JSON.parse(tripData);
      setCurrentTrip(trip);
      
      // Generate trip days
      if (trip.startDate && trip.endDate) {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        const days = [];
        
        let currentDate = new Date(startDate);
        let dayNumber = 1;

        while (currentDate <= endDate) {
          days.push({
            id: dayNumber,
            date: new Date(currentDate),
            dayNumber,
            locations: generateMockLocations(dayNumber)
          });
          
          currentDate.setDate(currentDate.getDate() + 1);
          dayNumber++;
        }

        setTripDays(days);
        setSelectedDate(days[0]?.date);
        setExpandedDays({ [days[0]?.id]: true });
      }
    } else {
      navigate('/my-trips');
    }
  }, [navigate]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && mapRef.current && selectedDate && tripDays.length > 0) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 7.8731, lng: 80.7718 },
        zoom: 8,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });

      // Add markers for selected day's locations
      const selectedDay = tripDays.find(day => 
        day.date.toDateString() === selectedDate?.toDateString()
      );

      if (selectedDay?.locations) {
        selectedDay.locations.forEach((location, index) => {
          const marker = new window.google.maps.Marker({
            position: { lat: 7.8731 + (index * 0.1), lng: 80.7718 + (index * 0.1) },
            map: map,
            title: location.name,
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; max-width: 200px;">
                <h4 style="margin: 0 0 5px 0; color: #333;">${location.name}</h4>
                <p style="margin: 0; color: #666; font-size: 14px;">${location.description}</p>
                <p style="margin: 5px 0 0 0; color: #007bff; font-weight: bold;">${location.time}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      }
    }
  }, [selectedDate, tripDays]);

  const handleDateSelect = (day) => {
    setSelectedDate(day.date);
    setExpandedDays({ [day.id]: true });
  };

  const toggleDayExpansion = (dayId) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  const handleAddLocation = (type) => {
    setLocationSearchType(type);
    setShowLocationModal(true);
  };

  const handleLocationSelect = (location) => {
    // Add location to the selected day
    const updatedDays = tripDays.map(day => {
      if (day.date.toDateString() === selectedDate?.toDateString()) {
        return {
          ...day,
          locations: [...day.locations, {
            ...location,
            id: Date.now(),
            time: '10:00' // Default time
          }]
        };
      }
      return day;
    });
    
    setTripDays(updatedDays);
    setShowLocationModal(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    });
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'hotel': return <Hotel size={18} />;
      case 'restaurant': return <Utensils size={18} />;
      case 'attraction': return <Camera size={18} />;
      case 'transport': return <Car size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  if (!currentTrip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trip-itinerary-page">
      <Navbar />
      
      <div className="trip-itinerary-container">
        <div className="planning-header">
          <h2>Planning your trip</h2>
        </div>
        
        <div className="step-indicator">
          <span>4 of 4</span>
        </div>
        
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-step active"></div>
            <div className="progress-step active"></div>
            <div className="progress-step active"></div>
            <div className="progress-step active"></div>
          </div>
        </div>
      
        <div className="trip-header">
          <div className="trip-header-content">
            <div className="trip-info">
              <h1>{currentTrip.name}</h1>
              <div className="trip-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{currentTrip.dates}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>Sri Lanka</span>
                </div>
                <div className="meta-item">
                  <Users size={16} />
                  <span>{currentTrip.participants} traveler{currentTrip.participants !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trip-content">
        <div className="itinerary-layout">
          {/* Left Panel - Days List */}
          <div className="days-panel">
            {tripDays.map((day) => (
              <div 
                key={day.id} 
                className={`day-card ${selectedDate?.toDateString() === day.date.toDateString() ? 'selected' : ''}`}
              >
                <div 
                  className="day-header"
                  onClick={() => handleDateSelect(day)}
                >
                  <div className="day-info">
                    <h3>{formatDate(day.date)}</h3>
                    <p>Day {day.dayNumber}</p>
                  </div>
                  <button 
                    className="expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDayExpansion(day.id);
                    }}
                  >
                    {expandedDays[day.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedDays[day.id] && (
                  <div className="day-content">
                    {day.locations.length > 0 ? (
                      <div className="locations-list">
                        {day.locations.map((location, locIndex) => (
                          <div key={location.id} className="location-item">
                            <div className="location-number">{locIndex + 1}</div>
                            <div className="location-details">
                              <div className="location-header">
                                <div className="location-icon">
                                  {getLocationIcon(location.type)}
                                </div>
                                <div className="location-info">
                                  <h4>{location.name}</h4>
                                  <p>{location.category}</p>
                                </div>
                              </div>
                              <div className="location-time">
                                <Clock size={14} />
                                <span>{location.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-day">
                        <p>Build your day by adding from your saves or adding custom travel details not on IslandHop.</p>
                      </div>
                    )}

                    <div className="add-location-section">
                      <button 
                        className="add-btn"
                        onClick={() => handleAddLocation('attraction')}
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>

                    {/* Quick Add Buttons */}
                    <div className="quick-add-buttons">
                      <button 
                        className="quick-add-btn"
                        onClick={() => handleAddLocation('hotel')}
                      >
                        <Hotel size={16} />
                      </button>
                      <button 
                        className="quick-add-btn"
                        onClick={() => handleAddLocation('restaurant')}
                      >
                        <Utensils size={16} />
                      </button>
                      <button 
                        className="quick-add-btn"
                        onClick={() => handleAddLocation('attraction')}
                      >
                        <Camera size={16} />
                      </button>
                      <button 
                        className="quick-add-btn"
                        onClick={() => handleAddLocation('transport')}
                      >
                        <Car size={16} />
                      </button>
                      <button 
                        className="quick-add-btn"
                        onClick={() => handleAddLocation('attraction')}
                      >
                        <Search size={16} />
                      </button>
                      <button className="quick-add-btn">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Panel - Map */}
          <div className="map-panel">
            <div 
              ref={mapRef}
              className="map-container"
            />
          </div>
        </div>
      </div>

      {/* Location Search Modal */}
      {showLocationModal && (
        <LocationSearchModal
          type={locationSearchType}
          onClose={() => setShowLocationModal(false)}
          onSelect={handleLocationSelect}
        />
      )}

      {/* Action Buttons */}
      <div className="trip-actions">
        <button 
          className="back-btn"
          onClick={() => navigate('/plan-trip-preferences')}
        >
          Back
        </button>
        <button 
          className="finish-btn"
          onClick={() => navigate('/my-trips')}
        >
          Finish Planning
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default TripItinerary;
