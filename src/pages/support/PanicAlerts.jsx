import React, { useState } from 'react';
import './PanicAlerts.css';

const mockAlert = {
  id: 'ALERT-20250622-001',
  time: '2025-06-22 14:37',
  location: 'Colombo Fort Railway Station',
  lat: 6.9344,
  lng: 79.8428,
  user: {
    name: 'Ayesha Fernando',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    phone: '+94 77 123 4567',
    email: 'ayesha.fernando@email.com',
    role: 'Tourist',
  },
  status: 'Active',
  incidentLog: [
    { time: '14:37', action: 'Alert received', by: 'System' },
    { time: '14:38', action: 'Agent assigned', by: 'Support Desk' },
  ],
};

const PanicAlerts = () => {
  const [alert, setAlert] = useState(mockAlert);
  const [log, setLog] = useState(mockAlert.incidentLog);
  const [resolution, setResolution] = useState('');
  const [handled, setHandled] = useState(false);

  const handleContact = (type) => {
    alert(
      `Simulating ${type === 'call' ? 'call' : 'message'} to ${alert.user.name}`
    );
    addLog(
      type === 'call'
        ? 'Called user for emergency check-in'
        : 'Sent emergency message to user'
    );
  };

  const addLog = (action) => {
    setLog((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
        by: 'Support Agent',
      },
    ]);
  };

  const handleMarkHandled = () => {
    if (!resolution.trim()) return;
    addLog('Marked as handled: ' + resolution);
    setHandled(true);
  };

  return (
    <div className="page">
      <div className="panic-container">
        <div className="panic-header">
          <h1>Panic Alert Response</h1>
          <p>Respond to real-time emergency alerts and log your actions</p>
        </div>

        <div className="panic-main-grid">
          {/* Alert Details */}
          <div className="panic-alert-card">
            <div className="panic-status">
              <span className={`status-dot ${alert.status === 'Active' ? 'active' : 'inactive'}`}></span>
              {alert.status}
            </div>
            <div className="panic-alert-title">
              <span className="panic-alert-id">{alert.id}</span>
              <span className="panic-alert-time">{alert.time}</span>
            </div>
            <div className="panic-location">
              <svg width="18" height="18" fill="none" stroke="#1e90ff" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1 1 16 0c0 4.627-3.582 10-8 10z"/>
                <circle cx="12" cy="11" r="3"/>
              </svg>
              <span>{alert.location}</span>
            </div>
            <div className="panic-user">
              <img src={alert.user.avatar} alt={alert.user.name} className="panic-avatar" />
              <div>
                <div className="panic-user-name">{alert.user.name} <span className="panic-user-role">{alert.user.role}</span></div>
                <div className="panic-user-contact">{alert.user.phone}</div>
                <div className="panic-user-contact">{alert.user.email}</div>
              </div>
            </div>
            <div className="panic-contact-btns">
              <button className="contact-btn" onClick={() => handleContact('call')}>
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.29a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.06.35 2.16.59 3.29.72a2 2 0 0 1 1.72 2z"/>
                </svg>
                Call
              </button>
              <button className="contact-btn email" onClick={() => handleContact('message')}>
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Message
              </button>
            </div>
          </div>

          {/* Incident Log & Resolution */}
          <div className="panic-log-card">
            <h3>Incident Log</h3>
            <div className="panic-log-list">
              {log.map((entry, idx) => (
                <div className="panic-log-entry" key={idx}>
                  <span className="panic-log-time">{entry.time}</span>
                  <span className="panic-log-action">{entry.action}</span>
                  <span className="panic-log-by">{entry.by}</span>
                </div>
              ))}
            </div>
            {!handled && (
              <div className="panic-resolution-section">
                <label htmlFor="resolution-note" className="panic-resolution-label">
                  Resolution Note
                </label>
                <textarea
                  id="resolution-note"
                  className="panic-resolution-textarea"
                  placeholder="Describe how the alert was handled..."
                  value={resolution}
                  onChange={e => setResolution(e.target.value)}
                  rows={2}
                />
                <button
                  className="btn-resolve"
                  onClick={handleMarkHandled}
                  disabled={!resolution.trim()}
                  type="button"
                >
                  Mark as Handled
                </button>
              </div>
            )}
            {handled && (
              <div className="panic-handled-info">
                <svg width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                Alert marked as handled. Resolution: <span>{resolution}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanicAlerts;