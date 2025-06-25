import React, { useState } from 'react';
import './LostItemTracker.css';

const mockReports = [
  {
    id: 'LI-20250621-001',
    date: '2025-06-21',
    item: 'Black Backpack',
    desc: 'Left in the back seat of the vehicle after trip from Colombo to Kandy.',
    tourist: {
      name: 'Ayesha Fernando',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      email: 'ayesha.fernando@email.com',
      phone: '+94 77 123 4567',
    },
    driver: {
      name: 'Nuwan Perera',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      email: 'nuwan.perera@email.com',
      phone: '+94 76 987 6543',
    },
    status: 'Ongoing',
    update: '',
  },
  {
    id: 'LI-20250620-002',
    date: '2025-06-20',
    item: 'iPhone 13',
    desc: 'Tourist lost phone during city tour. Suspected left in the van.',
    tourist: {
      name: 'Ruwan Silva',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
      email: 'ruwan.silva@email.com',
      phone: '+94 76 987 6543',
    },
    driver: {
      name: 'Saman Jayasuriya',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      email: 'saman.j@email.com',
      phone: '+94 77 555 1234',
    },
    status: 'Unresolved',
    update: '',
  },
  {
    id: 'LI-20250619-003',
    date: '2025-06-19',
    item: 'Blue Suitcase',
    desc: 'Forgotten in hotel lobby, guide last seen with item.',
    tourist: {
      name: 'Ishara Perera',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      email: 'ishara.p@email.com',
      phone: '+94 71 222 3344',
    },
    driver: null,
    guide: {
      name: 'Dilani Fernando',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      email: 'dilani.f@email.com',
      phone: '+94 77 888 9999',
    },
    status: 'Resolved',
    update: 'Suitcase returned to tourist on 2025-06-20.',
  },
];

const statusOptions = ['Ongoing', 'Resolved', 'Unresolved'];

const LostItemTracker = () => {
  const [reports, setReports] = useState(mockReports);

  const handleStatusChange = (idx, newStatus) => {
    setReports((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, status: newStatus } : r))
    );
  };

  const handleContact = (type, person) => {
    alert(
      `Simulating ${type === 'chat' ? 'chat' : 'email'} with ${person.name}`
    );
  };

  const handleUpdate = (idx, value) => {
    setReports((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, update: value } : r))
    );
  };

  const handleSaveUpdate = (idx) => {
    alert('Tourist update saved!');
  };

  return (
    <div className="page">
      <div className="lostitem-container">
        <div className="lostitem-header">
          <h1>Lost Item Tracker</h1>
          <p>Track and resolve lost item reports. Contact drivers/guides and update tourists.</p>
        </div>

        <div className="lostitem-list">
          {reports.map((report, idx) => (
            <div className="lostitem-card" key={report.id}>
              <div className="lostitem-row">
                <div className="lostitem-main">
                  <div className="lostitem-title">
                    <span className="lostitem-id">{report.id}</span>
                    <span className={`lostitem-status status-${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="lostitem-meta">
                    <span className="lostitem-date">{report.date}</span>
                    <span className="lostitem-item">{report.item}</span>
                  </div>
                  <div className="lostitem-desc">{report.desc}</div>
                </div>
                <div className="lostitem-status-dropdown">
                  <label>Status:</label>
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(idx, e.target.value)}
                    className={`status-select status-${report.status.toLowerCase()}`}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="lostitem-contacts">
                {/* Tourist */}
                <div className="lostitem-person">
                  <img src={report.tourist.avatar} alt={report.tourist.name} className="lostitem-avatar" />
                  <div>
                    <div className="lostitem-person-name">{report.tourist.name} <span className="lostitem-role">Tourist</span></div>
                    <div className="lostitem-person-email">{report.tourist.email}</div>
                    <div className="lostitem-person-phone">{report.tourist.phone}</div>
                  </div>
                </div>
                {/* Driver or Guide */}
                {report.driver && (
                  <div className="lostitem-person">
                    <img src={report.driver.avatar} alt={report.driver.name} className="lostitem-avatar" />
                    <div>
                      <div className="lostitem-person-name">{report.driver.name} <span className="lostitem-role">Driver</span></div>
                      <div className="lostitem-person-email">{report.driver.email}</div>
                      <div className="lostitem-person-phone">{report.driver.phone}</div>
                    </div>
                    <div className="lostitem-contact-btns">
                      <button
                        className="contact-btn"
                        onClick={() => handleContact('chat', report.driver)}
                        title="Chat"
                      >
                        <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        Chat
                      </button>
                      <button
                        className="contact-btn email"
                        onClick={() => handleContact('email', report.driver)}
                        title="Email"
                      >
                        <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Email
                      </button>
                    </div>
                  </div>
                )}
                {report.guide && (
                  <div className="lostitem-person">
                    <img src={report.guide.avatar} alt={report.guide.name} className="lostitem-avatar" />
                    <div>
                      <div className="lostitem-person-name">{report.guide.name} <span className="lostitem-role">Guide</span></div>
                      <div className="lostitem-person-email">{report.guide.email}</div>
                      <div className="lostitem-person-phone">{report.guide.phone}</div>
                    </div>
                    <div className="lostitem-contact-btns">
                      <button
                        className="contact-btn"
                        onClick={() => handleContact('chat', report.guide)}
                        title="Chat"
                      >
                        <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        Chat
                      </button>
                      <button
                        className="contact-btn email"
                        onClick={() => handleContact('email', report.guide)}
                        title="Email"
                      >
                        <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Email
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tourist Update Section */}
              <div className="lostitem-update-section">
                <label htmlFor={`update-${report.id}`} className="lostitem-update-label">
                  Tourist Update
                </label>
                <textarea
                  id={`update-${report.id}`}
                  className="lostitem-update-textarea"
                  placeholder="Add update for tourist (e.g., item found, in progress, etc.)"
                  value={report.update}
                  onChange={e => handleUpdate(idx, e.target.value)}
                  rows={2}
                />
                <button
                  className="btn-update"
                  onClick={() => handleSaveUpdate(idx)}
                  disabled={!report.update.trim()}
                  type="button"
                >
                  Save Update
                </button>
                {report.status === 'Resolved' && report.update && (
                  <div className="lostitem-update-info">
                    <svg width="16" height="16" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    {report.update}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostItemTracker;