import React from 'react';
import './DriverDashboard.css';

const DriverDashboard = ({ onPageChange }) => {
  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <h1>Driver Dashboard</h1>
        <p>Welcome back! Here's your driving overview.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Today's Earnings</h3>
          <p className="stat-value">$120.50</p>
          <span className="stat-change positive">+15% from yesterday</span>
        </div>
        
        <div className="stat-card">
          <h3>Completed Rides</h3>
          <p className="stat-value">8</p>
          <span className="stat-change positive">+2 from yesterday</span>
        </div>
        
        <div className="stat-card">
          <h3>Hours Driven</h3>
          <p className="stat-value">6.5</p>
          <span className="stat-change neutral">Same as yesterday</span>
        </div>
        
        <div className="stat-card">
          <h3>Rating</h3>
          <p className="stat-value">4.8⭐</p>
          <span className="stat-change positive">+0.1 this week</span>
        </div>
      </div>

      <div className="dashboard-actions">
        <div className="action-card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button 
              className="action-btn primary"
              onClick={() => onPageChange('Rides')}
            >
              View Active Rides
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => onPageChange('Schedule')}
            >
              Manage Schedule
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => onPageChange('Earnings')}
            >
              View Earnings
            </button>
          </div>
        </div>

        <div className="action-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">10:30 AM</span>
              <span className="activity-text">Completed ride to Airport</span>
              <span className="activity-amount">+$25.00</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">9:15 AM</span>
              <span className="activity-text">Completed ride to Hotel</span>
              <span className="activity-amount">+$18.50</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">8:45 AM</span>
              <span className="activity-text">Completed ride to Beach</span>
              <span className="activity-amount">+$22.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
