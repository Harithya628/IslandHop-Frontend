import React, { useState } from 'react';
import './ViewTickets.css';

const dummyTickets = [
  {
    id: 'TCK-20250621-0012',
    type: 'Complaint',
    subject: 'Driver did not arrive at pickup location',
    createdAt: '2025-06-21 09:14',
    user: {
      name: 'Ayesha Fernando',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    assignedTo: '',
    status: 'New',
  },
  {
    id: 'TCK-20250621-0013',
    type: 'Lost Item',
    subject: 'Lost iPhone in vehicle',
    createdAt: '2025-06-21 10:22',
    user: {
      name: 'Ruwan Silva',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
    assignedTo: 'Agent Samantha',
    status: 'In Progress',
  },
  {
    id: 'TCK-20250621-0014',
    type: 'Safety Alert',
    subject: 'Panic button pressed during ride',
    createdAt: '2025-06-21 11:05',
    user: {
      name: 'Ishara Perera',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    assignedTo: '',
    status: 'New',
  },
  {
    id: 'TCK-20250620-0015',
    type: 'Complaint',
    subject: 'Driver was rude',
    createdAt: '2025-06-20 16:44',
    user: {
      name: 'Dilani Fernando',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    assignedTo: 'Agent Samantha',
    status: 'Resolved',
  },
  {
    id: 'TCK-20250620-0016',
    type: 'Lost Item',
    subject: 'Forgot suitcase at hotel',
    createdAt: '2025-06-20 18:10',
    user: {
      name: 'Nuwan Perera',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    assignedTo: '',
    status: 'New',
  },
];

const issueTypes = ['All', 'Complaint', 'Lost Item', 'Safety Alert'];

const agentName = 'Agent Samantha';

const statusColors = {
  New: 'badge-new',
  'In Progress': 'badge-inprogress',
  Resolved: 'badge-resolved',
};

const ViewTickets = () => {
  const [tickets, setTickets] = useState(dummyTickets);
  const [filter, setFilter] = useState('All');

  const filteredTickets =
    filter === 'All'
      ? tickets
      : tickets.filter((t) => t.type === filter);

  const handleClaim = (id) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, assignedTo: agentName, status: 'In Progress' }
          : t
      )
    );
  };

  const handleAssign = (id) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, assignedTo: agentName }
          : t
      )
    );
  };

  const handleMarkInProgress = (id) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: 'In Progress' }
          : t
      )
    );
  };

  return (
    <div className="page">
      <div className="viewtickets-container">
        <div className="viewtickets-header">
          <h1>Support Tickets</h1>
          <p>View, filter, and manage all support tickets in the system</p>
        </div>

        <div className="viewtickets-controls">
          <label htmlFor="ticket-filter" className="filter-label">
            Filter by Issue Type
          </label>
          <select
            id="ticket-filter"
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {issueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="tickets-list">
          {filteredTickets.length === 0 && (
            <div className="no-tickets">No tickets found for this filter.</div>
          )}
          {filteredTickets.map((ticket) => (
            <div className="ticket-row" key={ticket.id}>
              <div className="ticket-user">
                <img
                  src={ticket.user.avatar}
                  alt={ticket.user.name}
                  className="ticket-avatar"
                />
                <div>
                  <div className="ticket-user-name">{ticket.user.name}</div>
                  <div className="ticket-id">{ticket.id}</div>
                </div>
              </div>
              <div className="ticket-info">
                <div className="ticket-type">{ticket.type}</div>
                <div className="ticket-subject">{ticket.subject}</div>
                <div className="ticket-created">{ticket.createdAt}</div>
              </div>
              <div className="ticket-status-actions">
                <span className={`ticket-status-badge ${statusColors[ticket.status]}`}>
                  {ticket.status}
                </span>
                <div className="ticket-actions">
                  {!ticket.assignedTo && (
                    <button
                      className="btn-claim"
                      onClick={() => handleClaim(ticket.id)}
                    >
                      Claim
                    </button>
                  )}
                  {ticket.assignedTo && ticket.status === 'New' && (
                    <button
                      className="btn-inprogress"
                      onClick={() => handleMarkInProgress(ticket.id)}
                    >
                      Mark In Progress
                    </button>
                  )}
                  {ticket.assignedTo && (
                    <div className="assigned-to">
                      <span>Assigned to:</span>
                      <span className="assigned-name">{ticket.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTickets;