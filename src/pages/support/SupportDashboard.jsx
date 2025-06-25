import React from 'react';
import './SupportDashboard.css';
import profilePic from '../../assets/islandHopIcon.png';

console.log('SupportDashboard component loaded');

// Summary data for stat cards
const summaryData = [
  {
    label: 'New Tickets',
    count: 8,
    color: '#1e90ff',
    bgColor: '#eff6ff'
  },
  {
    label: 'In Progress',
    count: 5,
    color: '#f59e0b',
    bgColor: '#fef3c7'
  },
  {
    label: 'Escalated',
    count: 2,
    color: '#ef4444',
    bgColor: '#fee2e2'
  },
  {
    label: 'Refunds',
    count: 3,
    color: '#10b981',
    bgColor: '#d1fae5'
  },
  {
    label: 'Lost Items',
    count: 4,
    color: '#8b5cf6',
    bgColor: '#f3e8ff'
  },
  {
    label: 'Panic Alerts',
    count: 1,
    color: '#f97316',
    bgColor: '#fed7aa'
  },
];

const recentActivities = [
  { id: 1, action: 'New ticket created', user: 'John Doe', time: '5 min ago' },
  { id: 2, action: 'Ticket resolved', user: 'Sarah Wilson', time: '12 min ago' },
  { id: 3, action: 'Escalated to manager', user: 'Mike Johnson', time: '20 min ago' },
  { id: 4, action: 'Refund processed', user: 'Emma Davis', time: '35 min ago' },
];

const quickActions = [
  { title: 'View All Tickets', action: 'ViewTickets' },
  { title: 'Handle Complaints', action: 'ResolveComplaint' },
  { title: 'Process Refunds', action: 'RefundCompensation' },
  { title: 'Check Lost Items', action: 'LostItemTracker' },
];

const SupportDashboard = ({ onProfileClick }) => {
  return (
    <div className="support-dashboard">
      <div className="dashboard-header">
        <div className="header-text">
          <h1>Support Dashboard</h1>
          <p>Monitor support activities and manage customer requests</p>
        </div>
        <div className="header-stats-and-profile">
          <div className="header-stats">
            <div className="quick-stat">
              <span className="stat-value">24</span>
              <span className="stat-label">Active Today</span>
            </div>
            <div className="quick-stat">
              <span className="stat-value">96%</span>
              <span className="stat-label">Resolution Rate</span>
            </div>
          </div>
          <div className="profile-info" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
            <img src={profilePic} alt="Profile" className="profile-avatar" />
            <span className="profile-name">Alex Support</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Stats Cards - Top row */}
        <div className="stats-section">
          {summaryData.map((card) => (
            <div className="stat-card" key={card.label} style={{ 
              '--card-color': card.color,
              '--card-bg': card.bgColor 
            }}>
              <div className="stat-content">
                <h3 className="stat-number">{card.count}</h3>
                <p className="stat-label">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions - Left side */}
        <div className="quick-actions-card">
          <h3 className="card-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <button key={action.title} className="quick-action-btn">
                <span className="action-title">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity - Right side */}
        <div className="activity-card">
          <h3 className="card-title">Recent Activity</h3>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-user">by {activity.user}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart - Bottom left */}
        <div className="chart-card">
          <h3 className="card-title">Daily Performance</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: '60%' }}></div>
              <div className="chart-bar" style={{ height: '80%' }}></div>
              <div className="chart-bar" style={{ height: '45%' }}></div>
              <div className="chart-bar" style={{ height: '90%' }}></div>
              <div className="chart-bar" style={{ height: '70%' }}></div>
              <div className="chart-bar" style={{ height: '85%' }}></div>
              <div className="chart-bar" style={{ height: '95%' }}></div>
            </div>
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Team Status - Bottom right */}
        <div className="team-card">
          <h3 className="card-title">Team Status</h3>
          <div className="team-members">
            <div className="team-member">
              <div className="member-avatar online"></div>
              <div className="member-info">
                <p className="member-name">Alice Cooper</p>
                <p className="member-status">Available</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-avatar busy"></div>
              <div className="member-info">
                <p className="member-name">Bob Smith</p>
                <p className="member-status">On Call</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-avatar away"></div>
              <div className="member-info">
                <p className="member-name">Carol Johnson</p>
                <p className="member-status">Break</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
