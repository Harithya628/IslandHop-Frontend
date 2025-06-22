import React, { useState } from 'react';
import './EscalateIssue.css';

const mockTicket = {
  id: 'TCK-20250621-0012',
  title: 'Driver did not arrive at pickup location',
  createdAt: '2025-06-21 09:14',
  assignedTo: 'Agent Samantha',
  description:
    'Tourist reported that the assigned driver did not arrive at the scheduled pickup location in Colombo. The tourist waited for 30 minutes and had to book another ride.',
  tourist: {
    name: 'Ayesha Fernando',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'Tourist',
    email: 'ayesha.fernando@email.com',
    phone: '+94 77 123 4567',
  },
  driver: {
    name: 'Nuwan Perera',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    role: 'Driver',
    email: 'nuwan.perera@email.com',
    phone: '+94 76 987 6543',
  },
};

const EscalateIssue = () => {
  const [notes, setNotes] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [escalated, setEscalated] = useState(false);

  const handleFileChange = (e) => {
    // Dummy upload: just store file names
    const files = Array.from(e.target.files);
    setScreenshots(files.map((f) => f.name));
  };

  const handleEscalate = () => {
    setEscalated(true);
    alert(
      'Ticket escalated to Admin. User and Driver have been notified.'
    );
    // Simulate notification (could also use console.log)
  };

  return (
    <div className="page">
      <div className="resolve-complaint-container">
        <div className="resolve-header">
          <h1>Escalate Issue</h1>
          <p>
            Forward this ticket to Admins for further review. Add escalation notes and supporting screenshots.
          </p>
        </div>

        <div className="resolve-main-grid">
          {/* Left: Ticket Summary */}
          <div>
            <div className="ticket-card">
              <div className="ticket-status escalated">Escalated</div>
              <div className="ticket-title">{mockTicket.title}</div>
              <div className="ticket-meta">
                Ticket ID: {mockTicket.id} &nbsp;|&nbsp; Created: {mockTicket.createdAt}
                <br />
                Assigned to: {mockTicket.assignedTo}
              </div>
              <div className="ticket-desc">{mockTicket.description}</div>
            </div>

            <div className="resolution-section">
              <label className="resolution-label" htmlFor="escalation-notes">
                Escalation Notes
              </label>
              <textarea
                id="escalation-notes"
                className="resolution-notes"
                placeholder="Describe why this ticket needs admin attention..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={escalated}
              />

              <label className="resolution-label" htmlFor="screenshot-upload" style={{ marginTop: 12 }}>
                Attach Screenshots (optional)
              </label>
              <input
                id="screenshot-upload"
                type="file"
                multiple
                accept="image/*"
                style={{ marginBottom: 12, display: 'block' }}
                onChange={handleFileChange}
                disabled={escalated}
              />
              {screenshots.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <b>Attached:</b>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: 18 }}>
                    {screenshots.map((name, idx) => (
                      <li key={idx} style={{ fontSize: 13, color: '#64748b' }}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="resolution-actions">
                <button
                  className="btn-escalate"
                  onClick={handleEscalate}
                  disabled={escalated || !notes.trim()}
                >
                  Mark as Escalated
                </button>
              </div>
              {escalated && (
                <div style={{ marginTop: 16, color: '#059669', fontWeight: 600 }}>
                  Ticket escalated. User and driver notified.
                </div>
              )}
            </div>
          </div>

          {/* Right: User & Driver Summary */}
          <div>
            {/* Tourist */}
            <div className="user-profile-card">
              <img
                src={mockTicket.tourist.avatar}
                alt={mockTicket.tourist.name}
                className="user-avatar"
              />
              <div className="user-name">{mockTicket.tourist.name}</div>
              <div className="user-role">{mockTicket.tourist.role}</div>
              <ul className="user-history-list">
                <li>
                  <span role="img" aria-label="email">📧</span> {mockTicket.tourist.email}
                </li>
                <li>
                  <span role="img" aria-label="phone">📞</span> {mockTicket.tourist.phone}
                </li>
              </ul>
            </div>
            {/* Driver */}
            <div className="user-profile-card">
              <img
                src={mockTicket.driver.avatar}
                alt={mockTicket.driver.name}
                className="user-avatar"
              />
              <div className="user-name">{mockTicket.driver.name}</div>
              <div className="user-role">{mockTicket.driver.role}</div>
              <ul className="user-history-list">
                <li>
                  <span role="img" aria-label="email">📧</span> {mockTicket.driver.email}
                </li>
                <li>
                  <span role="img" aria-label="phone">📞</span> {mockTicket.driver.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalateIssue;