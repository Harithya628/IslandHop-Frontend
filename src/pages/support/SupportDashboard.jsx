import React from 'react';
import {
  TicketIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import './SupportDashboard.css';

// Dummy data for summary cards
const summaryData = [
  {
    label: 'New Tickets',
    count: 8,
    icon: <TicketIcon className="dashboard-icon" />,
    color: 'blue',
    link: '/support/view-tickets',
  },
  {
    label: 'Tickets In Progress',
    count: 5,
    icon: <ArrowPathIcon className="dashboard-icon" />,
    color: 'indigo',
    link: '/support/resolve-complaint',
  },
  {
    label: 'Escalated Issues',
    count: 2,
    icon: <ArrowTrendingUpIcon className="dashboard-icon" />,
    color: 'orange',
    link: '/support/escalate-issue',
  },
  {
    label: 'Refund Requests',
    count: 3,
    icon: <CurrencyDollarIcon className="dashboard-icon" />,
    color: 'teal',
    link: '/support/refund-compensation',
  },
  {
    label: 'Lost Item Reports',
    count: 4,
    icon: <MagnifyingGlassIcon className="dashboard-icon" />,
    color: 'purple',
    link: '/support/lost-item-tracker',
  },
  {
    label: 'Panic Alerts Today',
    count: 1,
    icon: <ExclamationTriangleIcon className="dashboard-icon" />,
    color: 'red',
    link: '/support/panic-alerts',
  },
];

// Quick links (could be same as summaryData or more detailed)
const quickLinks = [
  {
    label: 'View Tickets',
    icon: <TicketIcon className="quicklink-icon" />,
    link: '/support/view-tickets',
    color: 'blue',
  },
  {
    label: 'Resolve Complaint',
    icon: <ArrowPathIcon className="quicklink-icon" />,
    link: '/support/resolve-complaint',
    color: 'indigo',
  },
  {
    label: 'Escalate Issue',
    icon: <ArrowTrendingUpIcon className="quicklink-icon" />,
    link: '/support/escalate-issue',
    color: 'orange',
  },
  {
    label: 'Refund/Compensation',
    icon: <CurrencyDollarIcon className="quicklink-icon" />,
    link: '/support/refund-compensation',
    color: 'teal',
  },
  {
    label: 'Lost Item Tracker',
    icon: <MagnifyingGlassIcon className="quicklink-icon" />,
    link: '/support/lost-item-tracker',
    color: 'purple',
  },
  {
    label: 'Panic Alerts',
    icon: <ExclamationTriangleIcon className="quicklink-icon" />,
    link: '/support/panic-alerts',
    color: 'red',
  },
  {
    label: 'Complaint Reports',
    icon: (
      <svg className="quicklink-icon" fill="none" stroke="#8B5CF6" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#8B5CF6" />
        <path d="M8 10h8M8 14h6" stroke="#8B5CF6" />
      </svg>
    ),
    link: '/support/complaint-reports',
    color: 'violet',
  },
  {
    label: 'Chat/Email Support',
    icon: (
      <svg className="quicklink-icon" fill="none" stroke="#1976D2" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#1976D2" />
        <polyline points="22,6 12,13 2,6" stroke="#1976D2" />
      </svg>
    ),
    link: '/support/chat-email-support',
    color: 'blue',
  },
];

const agentName = 'Samantha'; // Placeholder, replace with prop/context if needed

const SupportDashboard = () => {
  // For navigation, use react-router-dom's useNavigate if available
  const handleCardClick = (link) => {
    window.location.href = link;
  };

  return (
    <div className="page">
      <div className="support-dashboard-container">
        <div className="support-dashboard-header">
          <h1>Welcome, {agentName}!</h1>
          <p>
            Here’s your support dashboard. Quickly access tickets, alerts, and key actions.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="dashboard-summary-grid">
          {summaryData.map((card) => (
            <div
              className={`dashboard-summary-card color-${card.color}`}
              key={card.label}
              onClick={() => handleCardClick(card.link)}
              tabIndex={0}
              role="button"
              title={card.label}
            >
              <div className="dashboard-summary-icon">{card.icon}</div>
              <div className="dashboard-summary-info">
                <div className="dashboard-summary-label">{card.label}</div>
                <div className="dashboard-summary-count">{card.count}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="dashboard-quicklinks-title">Quick Links</div>
        <div className="dashboard-quicklinks-grid">
          {quickLinks.map((link) => (
            <div
              className={`dashboard-quicklink-card color-${link.color}`}
              key={link.label}
              onClick={() => handleCardClick(link.link)}
              tabIndex={0}
              role="button"
              title={link.label}
            >
              <div className="dashboard-quicklink-icon">{link.icon}</div>
              <div className="dashboard-quicklink-label">{link.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;