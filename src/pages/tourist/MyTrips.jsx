import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreHorizontal, Calendar, MapPin, Users, Bot, Play, Navigation, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CreateTripModal from '../../components/CreateTripModal';
import './MyTrips.css';

const MyTrips = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for existing trips
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'Sri Lanka Adventure',
      dates: 'Jun 11 → Jun 21, 2025',
      destination: 'Sri Lanka',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      status: 'planning',
      participants: 2
    },
    {
      id: 2,
      name: 'Hill Country Explorer',
      dates: 'Aug 15 → Aug 25, 2025',
      destination: 'Kandy, Nuwara Eliya, Ella',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      status: 'completed',
      participants: 4
    },
    {
      id: 3,
      name: 'Cultural Heritage Tour',
      dates: 'Sep 10 → Sep 20, 2025',
      destination: 'Anuradhapura, Sigiriya',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      status: 'upcoming',
      participants: 3
    },
    {
      id: 4,
      name: 'Coastal Paradise Tour',
      dates: 'Jul 2 → Jul 8, 2025',
      destination: 'Galle, Mirissa, Unawatuna',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      status: 'ongoing',
      participants: 2,
      currentLocation: 'Galle Fort',
      progress: 40,
      nextActivity: 'Whale Watching in Mirissa',
      nextActivityTime: '6:00 AM'
    }
  ]);

  const handleCreateTrip = (tripName) => {
    // Create new trip with name and navigate to date selection
    const newTrip = {
      id: Date.now(),
      name: tripName,
      status: 'planning',
      participants: 1
    };
    
    // Store trip data in localStorage temporarily
    localStorage.setItem('currentTrip', JSON.stringify(newTrip));
    
    // Navigate to date selection
    navigate('/plan-trip-dates');
  };

  const handleTripClick = (trip) => {
    if (trip.status === 'planning') {
      localStorage.setItem('currentTrip', JSON.stringify(trip));
      navigate('/trip-itinerary');
    } else {
      // View completed/upcoming trip details
      navigate(`/trip-details/${trip.id}`);
    }
  };

  const planningTrips = trips.filter(trip => trip.status === 'planning');
  const completedTrips = trips.filter(trip => trip.status === 'completed');
  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming');
  const ongoingTrips = trips.filter(trip => trip.status === 'ongoing');

  return (
    <div className="my-trips-page">
      <Navbar />
      <div className="my-trips-container">
        <div className="my-trips-header">
          <h1>My trips</h1>
        </div>

        {/* Create New Trip Buttons */}
        <div className="create-trip-section">
          <div className="create-trip-cards">
            <button 
              className="create-trip-card primary"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={20} />
              <span>Create a new trip</span>
            </button>
            
            <button 
              className="create-trip-card secondary"
              onClick={() => setShowCreateModal(true)}
            >
              <Bot size={20} />
              <span>Build a trip with AI</span>
            </button>
          </div>
        </div>

        {/* Ongoing Trip */}
        {ongoingTrips.length > 0 && (
          <div className="trips-section">
            <h2>Current Trip</h2>
            <div className="trips-grid ongoing-grid">
              {ongoingTrips.map((trip) => (
                <OngoingTripCard 
                  key={trip.id} 
                  trip={trip} 
                  onClick={() => handleTripClick(trip)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Trips */}
        {upcomingTrips.length > 0 && (
          <div className="trips-section">
            <h2>Upcoming trips</h2>
            <div className="trips-grid">
              {upcomingTrips.map((trip) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onClick={() => handleTripClick(trip)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Trips */}
        {completedTrips.length > 0 && (
          <div className="trips-section">
            <h2>Completed trips</h2>
            <div className="trips-grid">
              {completedTrips.map((trip) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onClick={() => handleTripClick(trip)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Draft Trips */}
        {planningTrips.length > 0 && (
          <div className="trips-section">
            <h2>Drafts</h2>
            <div className="trips-grid">
              {planningTrips.map((trip) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onClick={() => handleTripClick(trip)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Trip Modal */}
      {showCreateModal && (
        <CreateTripModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTrip}
        />
      )}

      <Footer />
    </div>
  );
};

// Ongoing Trip Card Component
const OngoingTripCard = ({ trip, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="trip-card ongoing-trip" onClick={onClick}>
      <div className="trip-card-image">
        {trip.image ? (
          <img src={trip.image} alt={trip.name} />
        ) : (
          <div className="trip-card-placeholder">
            <MapPin size={48} />
          </div>
        )}
        <div className="trip-card-overlay">
          <button 
            className="trip-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreHorizontal size={20} />
          </button>
          {showMenu && (
            <div className="trip-menu">
              <button>View Details</button>
              <button>Contact Guide</button>
              <button>Share</button>
            </div>
          )}
        </div>
        
        {/* Progress overlay for ongoing trips */}
        <div className="progress-overlay">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${trip.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{trip.progress}% Complete</span>
        </div>
      </div>
      
      <div className="trip-card-content ongoing-content">
        <div className="trip-header">
          <h3>{trip.name}</h3>
          <div className="trip-status">
            <Play size={16} />
            <span>In Progress</span>
          </div>
        </div>
        
        <div className="trip-details">
          <div className="trip-info">
            <MapPin size={16} />
            <span>{trip.destination}</span>
          </div>
          <div className="trip-info">
            <Calendar size={16} />
            <span>{trip.dates}</span>
          </div>
          <div className="trip-info">
            <Navigation size={16} />
            <span>Currently at: {trip.currentLocation}</span>
          </div>
          <div className="trip-info">
            <Users size={16} />
            <span>{trip.participants} {trip.participants === 1 ? 'traveler' : 'travelers'}</span>
          </div>
        </div>
        
        {trip.nextActivity && (
          <div className="next-activity">
            <h4>Next Activity</h4>
            <div className="activity-info">
              <span className="activity-name">{trip.nextActivity}</span>
              <span className="activity-time">{trip.nextActivityTime}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Trip Card Component
const TripCard = ({ trip, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="trip-card" onClick={onClick}>
      <div className="trip-card-image">
        {trip.image ? (
          <img src={trip.image} alt={trip.name} />
        ) : (
          <div className="trip-card-placeholder">
            <MapPin size={48} />
          </div>
        )}
        <div className="trip-card-overlay">
          <button 
            className="trip-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreHorizontal size={20} />
          </button>
          {showMenu && (
            <div className="trip-menu">
              <button>Edit trip</button>
              <button>Duplicate</button>
              <button>Share</button>
              <button className="delete">Delete</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="trip-card-content">
        <h3>{trip.name}</h3>
        {trip.dates && (
          <div className="trip-info">
            <Calendar size={16} />
            <span>{trip.dates}</span>
          </div>
        )}
        {trip.destination && (
          <div className="trip-info">
            <MapPin size={16} />
            <span>{trip.destination}</span>
          </div>
        )}
        <div className="trip-info">
          <Users size={16} />
          <span>{trip.participants} {trip.participants === 1 ? 'traveler' : 'travelers'}</span>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
