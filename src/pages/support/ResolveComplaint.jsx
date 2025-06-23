import React, { useState } from 'react';
import './ResolveComplaint.css';

const mockTicket = {
  id: 'TCK-20250621-0012',
  title: 'Driver did not arrive at pickup location',
  status: 'pending',
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
    history: [
      { label: 'Total Bookings', value: 18 },
      { label: 'Complaints Filed', value: 2 },
      { label: 'Last Trip', value: '2025-06-19' },
    ],
  },
  driver: {
    name: 'Nuwan Perera',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    role: 'Driver',
    email: 'nuwan.perera@email.com',
    phone: '+94 76 987 6543',
    history: [
      { label: 'Total Rides', value: 142 },
      { label: 'Complaints Received', value: 1 },
      { label: 'Last Trip', value: '2025-06-21' },
    ],
  },
};

const ResolveComplaint = () => {
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(mockTicket.status);

  const handleContact = (type, person) => {
    alert(
      `Simulating ${type === 'chat' ? 'chat' : 'email'} with ${person.name} (${person.role})`
    );
  };

  const handleResolve = () => {
    setStatus('resolved');
    alert('Ticket marked as resolved!');
  };

  const handleEscalate = () => {
    setStatus('escalated');
    alert('Ticket escalated to supervisor!');
  };

  return (
    <div className="page">
      <div className="resolve-complaint-container">
        <div className="resolve-header">
          <h1>Resolve Complaint</h1>
          <p>Review ticket details, contact parties, and resolve or escalate the issue</p>
        </div>

        <div className="resolve-main-grid">
          {/* Left: Ticket Details & Resolution */}
          <div>
            <div className="ticket-card">
              <div
                className={`ticket-status ${
                  status === 'resolved'
                    ? 'resolved'
                    : status === 'escalated'
                    ? 'escalated'
                    : ''
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
              <div className="ticket-title">{mockTicket.title}</div>
              <div className="ticket-meta">
                Ticket ID: {mockTicket.id} &nbsp;|&nbsp; Created: {mockTicket.createdAt}
                <br />
                Assigned to: {mockTicket.assignedTo}
              </div>
              <div className="ticket-desc">{mockTicket.description}</div>
            </div>

            <div className="resolution-section">
              <label className="resolution-label" htmlFor="resolution-notes">
                Resolution Notes
              </label>
              <textarea
                id="resolution-notes"
                className="resolution-notes"
                placeholder="Add your notes or actions taken..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={status !== 'pending'}
              />
              <div className="resolution-actions">
                <button
                  className="btn-resolve"
                  onClick={handleResolve}
                  disabled={status !== 'pending'}
                >
                  Mark as Resolved
                </button>
                <button
                  className="btn-escalate"
                  onClick={handleEscalate}
                  disabled={status !== 'pending'}
                >
                  Escalate
                </button>
              </div>
            </div>
          </div>

          {/* Right: User Profile & History */}
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
                {mockTicket.tourist.history.map((item, idx) => (
                  <li key={idx}>
                    <span role="img" aria-label="dot">
                      •
                    </span>
                    {item.label}: <b>{item.value}</b>
                  </li>
                ))}
              </ul>
              <div className="contact-btns">
                <button
                  className="contact-btn"
                  onClick={() => handleContact('chat', mockTicket.tourist)}
                >
                  <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Chat
                </button>
                <button
                  className="contact-btn email"
                  onClick={() => handleContact('email', mockTicket.tourist)}
                >
                  <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email
                </button>
              </div>
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
                {mockTicket.driver.history.map((item, idx) => (
                  <li key={idx}>
                    <span role="img" aria-label="dot">
                      •
                    </span>
                    {item.label}: <b>{item.value}</b>
                  </li>
                ))}
              </ul>
              <div className="contact-btns">
                <button
                  className="contact-btn"
                  onClick={() => handleContact('chat', mockTicket.driver)}
                >
                  <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Chat
                </button>
                <button
                  className="contact-btn email"
                  onClick={() => handleContact('email', mockTicket.driver)}
                >
                  <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolveComplaint;