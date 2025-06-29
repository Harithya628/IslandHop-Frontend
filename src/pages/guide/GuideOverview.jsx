import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import "../Page.css";
import "./GuideDashboard.css";

// Mock data for dashboard overview
const mockTours = [
  {
    id: "TOUR-001",
    title: "Sigiriya Rock Fortress & Cultural Tour",
    duration: "8 hours",
    price: "USD 85",
    participants: 4,
    maxParticipants: 8,
    date: "2025-06-28",
    status: "Upcoming",
    location: "Sigiriya, Central Province",
  },
  {
    id: "TOUR-004",
    title: "Ella Nine Arches Bridge & Hiking Tour",
    duration: "5 hours",
    price: "USD 55",
    participants: 3,
    maxParticipants: 6,
    date: "2025-06-25",
    status: "Ongoing",
    location: "Ella, Uva Province",
  },
];

const GuideOverview = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewProfile = () => {
    setIsDropdownOpen(false);
    // Navigate to profile when implemented
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleViewTourDetails = (tourId) => {
    navigate(`/guide/tour/${tourId}`);
  };

  // Get upcoming and ongoing tours
  const upcomingTours = mockTours.filter(tour => tour.status === "Upcoming");
  const ongoingTours = mockTours.filter(tour => tour.status === "Ongoing");

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1>Guide Dashboard</h1>
              <p>Welcome back! Here's an overview of your tour activities.</p>
            </div>
            <div className="account-info" onClick={toggleDropdown}>
              <div className="account-details">
                <span className="account-name">John Guide</span>
                <span className="account-role">Tour Guide</span>
              </div>
              <div className="account-avatar">
                <span>JG</span>
              </div>
              {isDropdownOpen && (
                <div className="account-dropdown">
                  <button className="dropdown-item" onClick={handleViewProfile}>
                    View Profile
                  </button>
                  <button className="dropdown-item" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="availability-section">
          <div className="availability-toggle">
            <span className="availability-label">Availability Status:</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={() => setIsAvailable(!isAvailable)}
              />
              <span className="slider"></span>
            </label>
            <span className={`availability-status ${isAvailable ? "available" : "unavailable"}`}>
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Dashboard Overview Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>5</h3>
              <p>Upcoming Tours</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>2</h3>
              <p>Ongoing Tours</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>4.8</h3>
              <p>Average Rating</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>$2,450</h3>
              <p>This Month</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button 
              className="action-btn primary"
              onClick={() => navigate("/guide/my-tours")}
            >
              View All Tours
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => navigate("/guide/tour-requests")}
            >
              Check Requests
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => navigate("/guide/chat")}
            >
              Messages
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <div className="activity-section">
            <h2>Ongoing Tours</h2>
            {ongoingTours.length > 0 ? (
              <div className="tours-grid">
                {ongoingTours.map((tour) => (
                  <div key={tour.id} className="tour-card ongoing">
                    <div className="tour-status">
                      <span className="status-badge ongoing">Ongoing</span>
                    </div>
                    <h3>{tour.title}</h3>
                    <div className="tour-details">
                      <p><strong>Duration:</strong> {tour.duration}</p>
                      <p><strong>Participants:</strong> {tour.participants}/{tour.maxParticipants}</p>
                      <p><strong>Location:</strong> {tour.location}</p>
                      <p><strong>Price:</strong> {tour.price}</p>
                    </div>
                    <button 
                      className="view-details-btn"
                      onClick={() => handleViewTourDetails(tour.id)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-tours">No ongoing tours at the moment.</p>
            )}
          </div>

          <div className="activity-section">
            <h2>Upcoming Tours (Next 3)</h2>
            {upcomingTours.length > 0 ? (
              <div className="tours-grid">
                {upcomingTours.slice(0, 3).map((tour) => (
                  <div key={tour.id} className="tour-card upcoming">
                    <div className="tour-status">
                      <span className="status-badge upcoming">Upcoming</span>
                    </div>
                    <h3>{tour.title}</h3>
                    <div className="tour-details">
                      <p><strong>Date:</strong> {tour.date}</p>
                      <p><strong>Duration:</strong> {tour.duration}</p>
                      <p><strong>Participants:</strong> {tour.participants}/{tour.maxParticipants}</p>
                      <p><strong>Location:</strong> {tour.location}</p>
                    </div>
                    <button 
                      className="view-details-btn"
                      onClick={() => handleViewTourDetails(tour.id)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-tours">No upcoming tours scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideOverview;
