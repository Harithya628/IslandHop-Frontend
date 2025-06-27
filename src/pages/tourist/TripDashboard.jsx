import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, Calendar, MapPin, Trash2, Edit, Share, MoreHorizontal } from 'lucide-react';
import './TripDashboard.css';

const TripDashboard = () => {
  const navigate = useNavigate();
  const [openSettingsId, setOpenSettingsId] = useState(null);

  // Sample data - replace with your actual data
  const upcomingTrips = [
    {
      id: 1,
      name: "Tokyo Adventure",
      dates: "Dec 15 - Dec 22, 2024",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      destination: "Tokyo, Japan"
    },
    {
      id: 2,
      name: "Bali Retreat",
      dates: "Jan 10 - Jan 20, 2025",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      destination: "Bali, Indonesia"
    },
    {
      id: 3,
      name: "European Explorer",
      dates: "Mar 5 - Mar 18, 2025",
      image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=400&h=300&fit=crop",
      destination: "Paris, France"
    }
  ];

  const pastTrips = [
    {
      id: 4,
      name: "Maldives Escape",
      dates: "Aug 12 - Aug 19, 2024",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      destination: "Maldives"
    },
    {
      id: 5,
      name: "Mountain Hiking",
      dates: "Jun 8 - Jun 15, 2024",
      image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1e95?w=400&h=300&fit=crop",
      destination: "Swiss Alps"
    },
    {
      id: 6,
      name: "City Break",
      dates: "Apr 20 - Apr 23, 2024",
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop",
      destination: "New York, USA"
    },
    {
      id: 7,
      name: "Beach Vacation",
      dates: "Feb 14 - Feb 21, 2024",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      destination: "Santorini, Greece"
    }
  ];
  const toggleSettings = (tripId) => {
    setOpenSettingsId(openSettingsId === tripId ? null : tripId);
  };
    const handlePlanNewTrip = () => {
    navigate('/traveler/trip-plan-questionnaire');
  };

  const TripCard = ({ trip, isPast = false }) => (
    <div className="trip-card">
      <div className="trip-card-image-container">
        <img 
          src={trip.image} 
          alt={trip.name}
          className="trip-card-image"
        />
        <div className="trip-card-overlay" />
        
        {/* Settings Button */}
        <div className="settings-button-container">
          <button
            onClick={() => toggleSettings(trip.id)}
            className="settings-button"
          >
            <Settings className="settings-icon" />
          </button>
          
          {/* Settings Dropdown */}
          {openSettingsId === trip.id && (
            <div className="settings-dropdown">
              <button className="settings-dropdown-item">
                <Edit className="dropdown-icon" />
                Edit Trip
              </button>
              <button className="settings-dropdown-item">
                <Share className="dropdown-icon" />
                Share Trip
              </button>
              <button className="settings-dropdown-item">
                <MoreHorizontal className="dropdown-icon" />
                More Options
              </button>
              <hr className="dropdown-divider" />
              <button className="settings-dropdown-item delete-item">
                <Trash2 className="dropdown-icon" />
                Delete Trip
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="trip-card-content">
        <h3 className="trip-card-title">
          {trip.name}
        </h3>
        <div className="trip-card-info">
          <MapPin className="info-icon" />
          <span className="info-text">{trip.destination}</span>
        </div>
        <div className="trip-card-info">
          <Calendar className="info-icon" />
          <span className="info-text">{trip.dates}</span>
        </div>
        
        {isPast && (
          <div className="completed-badge">
            Completed
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            Your Travel Journey
          </h1>
          <p className="dashboard-subtitle">
            Explore your adventures, plan new destinations, and create memories that last forever
          </p>
        </div>        {/* Plan New Trip Button */}
        <div className="plan-trip-container">          <button 
            className="plan-trip-button"
            onClick={handlePlanNewTrip}
          >
            <div className="plan-trip-overlay" />
            <Plus className="plan-trip-icon" />
            Plan New Trip
            <div className="plan-trip-glow" />
          </button>
        </div>

        {/* Upcoming Trips */}
        <section className="trips-section">
          <div className="section-header">
            <div className="section-accent upcoming-accent" />
            <h2 className="section-title">Upcoming Adventures</h2>
            <div className="section-divider" />
          </div>
          
          {upcomingTrips.length > 0 ? (
            <div className="trips-grid upcoming-grid">
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Calendar className="empty-state-icon" />
              <p className="empty-state-title">No upcoming trips planned</p>
              <p className="empty-state-subtitle">Start planning your next adventure!</p>
            </div>
          )}
        </section>

        {/* Past Trips */}
        <section className="trips-section">
          <div className="section-header">
            <div className="section-accent past-accent" />
            <h2 className="section-title">Travel Memories</h2>
            <div className="section-divider" />
          </div>
          
          {pastTrips.length > 0 ? (
            <div className="trips-grid past-grid">
              {pastTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} isPast={true} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <MapPin className="empty-state-icon" />
              <p className="empty-state-title">No past trips yet</p>
              <p className="empty-state-subtitle">Your travel history will appear here</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TripDashboard;