import React from 'react';
import '../Page.css';

// Summary data for stat cards
const summaryData = [
  {
    label: 'New Tickets',
    count: 8,
  },
  {
    label: 'Tickets In Progress',
    count: 5,
  },
  {
    label: 'Escalated Issues',
    count: 2,
  },
  {
    label: 'Refund Requests',
    count: 3,
  },
  {
    label: 'Lost Item Reports',
    count: 4,
  },
  {
    label: 'Panic Alerts Today',
    count: 1,
  },
];

const SupportDashboard = () => {
  return (
    <div className="page">
      <div className="page-content-card">
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1>Support Dashboard</h1>
              <p>Support ticket overview and quick actions</p>
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="stats-grid">
            {summaryData.map((card) => (
              <div className="stat-card" key={card.label}>
                <h3>{card.label}</h3>
                <p className="stat-number">{card.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
