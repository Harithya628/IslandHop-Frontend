import React, { useState } from 'react';
import '../Page.css';
import './APIs.css';

const APIs = () => {
  const [apiData, setApiData] = useState({
    googleMaps: {
      name: 'Google Maps API',
      status: 'active',
      cost: '$127.45',
      monthlyCost: '$1,480.00',
      requests: '45,230',
      monthlyRequests: '523,400',
      latency: '187ms',
      uptime: '99.9%',
      lastUpdated: '2 minutes ago',
      description: 'Location services, routing, and geocoding',
      keyStatus: 'Valid',
      rateLimit: '1,000 requests/hour',
      nextBilling: 'Jan 15, 2025'
    },
    weather: {
      name: 'OpenWeather API',
      status: 'active',
      cost: '$23.80',
      monthlyCost: '$89.50',
      requests: '12,450',
      monthlyRequests: '156,780',
      latency: '120ms',
      uptime: '99.7%',
      lastUpdated: '5 minutes ago',
      description: 'Real-time weather data and forecasts',
      keyStatus: 'Valid',
      rateLimit: '500 requests/hour',
      nextBilling: 'Jan 12, 2025'
    },
    messaging: {
      name: 'Twilio SMS API',
      status: 'active',
      cost: '$45.20',
      monthlyCost: '$198.75',
      requests: '3,240',
      monthlyRequests: '38,920',
      latency: '95ms',
      uptime: '99.8%',
      lastUpdated: '1 minute ago',
      description: 'SMS notifications and messaging services',
      keyStatus: 'Valid',
      rateLimit: '100 requests/hour',
      nextBilling: 'Jan 18, 2025'
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      case 'error':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <div className="apis-container">
        <div className="apis-header">
          <h1>API Management</h1>
          <p>Monitor API usage, costs, and performance across all integrated services</p>
        </div>

        {/* API Overview Stats */}
        <div className="api-overview">
          <div className="overview-card">
            <h3>Total Monthly Cost</h3>
            <span className="overview-value">$1,768.25</span>
            <span className="overview-change positive">↑ 12.5%</span>
          </div>
          <div className="overview-card">
            <h3>Total Requests</h3>
            <span className="overview-value">719,100</span>
            <span className="overview-change positive">↑ 8.2%</span>
          </div>
          <div className="overview-card">
            <h3>Average Uptime</h3>
            <span className="overview-value">99.8%</span>
            <span className="overview-change neutral">→ 0.1%</span>
          </div>
        </div>

        {/* API Cards Grid */}
        <div className="apis-grid">
          {Object.entries(apiData).map(([key, api]) => (
            <div key={key} className="api-card">
              <div className="api-header">
                <div className="api-title">
                  <h3>{api.name}</h3>
                  <div className="api-status" style={{ color: getStatusColor(api.status) }}>
                    {getStatusIcon(api.status)}
                    <span>{api.status.charAt(0).toUpperCase() + api.status.slice(1)}</span>
                  </div>
                </div>
                <p className="api-description">{api.description}</p>
              </div>

              <div className="api-metrics">
                <div className="metric-row">
                  <div className="metric">
                    <span className="metric-label">Today's Cost</span>
                    <span className="metric-value cost">{api.cost}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Monthly Cost</span>
                    <span className="metric-value cost">{api.monthlyCost}</span>
                  </div>
                </div>

                <div className="metric-row">
                  <div className="metric">
                    <span className="metric-label">Today's Requests</span>
                    <span className="metric-value">{api.requests}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Monthly Requests</span>
                    <span className="metric-value">{api.monthlyRequests}</span>
                  </div>
                </div>

                <div className="metric-row">
                  <div className="metric">
                    <span className="metric-label">Avg Latency</span>
                    <span className="metric-value latency">{api.latency}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Uptime</span>
                    <span className="metric-value uptime">{api.uptime}</span>
                  </div>
                </div>
              </div>

              <div className="api-details">
                <div className="detail-item">
                  <span className="detail-label">API Key Status:</span>
                  <span className="detail-value key-valid">{api.keyStatus}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rate Limit:</span>
                  <span className="detail-value">{api.rateLimit}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Next Billing:</span>
                  <span className="detail-value">{api.nextBilling}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Updated:</span>
                  <span className="detail-value">{api.lastUpdated}</span>
                </div>
              </div>

              <div className="api-actions">
                <button className="btn-secondary">View Logs</button>
                <button className="btn-primary">Configure</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIs;
