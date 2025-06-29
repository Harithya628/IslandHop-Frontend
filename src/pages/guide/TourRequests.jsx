import React, { useState } from "react";
import "../Page.css";
import "./GuideDashboard.css";

// Mock data for tour requests
const mockTourRequests = [
  {
    id: "REQ-001",
    tourist: "John Smith",
    tourTitle: "Custom Wildlife Safari",
    requestedDate: "2025-07-05",
    participants: 2,
    budget: "USD 120",
    message:
      "We are interested in a personalized wildlife safari with elephant watching.",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    contactEmail: "john.smith@email.com",
    contactPhone: "+1-555-0123",
  },
  {
    id: "REQ-002",
    tourist: "Emma Wilson",
    tourTitle: "Photography Tour",
    requestedDate: "2025-07-08",
    participants: 1,
    budget: "USD 80",
    message:
      "Looking for a photography-focused tour of scenic locations around Ella.",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    contactEmail: "emma.wilson@email.com",
    contactPhone: "+1-555-0456",
  },
  {
    id: "REQ-003",
    tourist: "Michael Chen",
    tourTitle: "Cultural Heritage Tour",
    requestedDate: "2025-07-10",
    participants: 4,
    budget: "USD 200",
    message:
      "Family tour focusing on cultural sites and traditional experiences.",
    status: "Accepted",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    contactEmail: "michael.chen@email.com",
    contactPhone: "+1-555-0789",
  },
  {
    id: "REQ-004",
    tourist: "Sarah Johnson",
    tourTitle: "Adventure Hiking Tour",
    requestedDate: "2025-07-12",
    participants: 3,
    budget: "USD 150",
    message: "Looking for challenging hiking trails with scenic views.",
    status: "Rejected",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    contactEmail: "sarah.johnson@email.com",
    contactPhone: "+1-555-0321",
  },
];

const TourRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter requests based on status and search term
  const getFilteredRequests = () => {
    let filtered = mockTourRequests;

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (request) => request.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.tourTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredRequests = getFilteredRequests();

  const handleAcceptRequest = (requestId) => {
    console.log("Accepting request:", requestId);
    // Here you would implement the accept logic
    alert("Request accepted! You can now coordinate with the tourist.");
  };

  const handleRejectRequest = (requestId) => {
    console.log("Rejecting request:", requestId);
    // Here you would implement the reject logic
    alert("Request rejected.");
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#f59e0b";
      case "accepted":
        return "#10b981";
      case "rejected":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1>Tour Requests</h1>
              <p>Review and manage incoming tour requests from tourists</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="request-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search by tourist name or tour title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Request Stats */}
        <div className="request-stats">
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>
                {mockTourRequests.filter((r) => r.status === "Pending").length}
              </h3>
              <p>Pending Requests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>
                {mockTourRequests.filter((r) => r.status === "Accepted").length}
              </h3>
              <p>Accepted This Month</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>$550</h3>
              <p>Potential Revenue</p>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="requests-content">
          {filteredRequests.length > 0 ? (
            <div className="requests-list">
              {filteredRequests.map((request) => (
                <div key={request.id} className="request-card">
                  <div className="request-header">
                    <div className="tourist-info">
                      <img
                        src={request.avatar}
                        alt={request.tourist}
                        className="tourist-avatar"
                      />
                      <div>
                        <h3>{request.tourist}</h3>
                        <p className="request-id">#{request.id}</p>
                      </div>
                    </div>
                    <div
                      className="request-status"
                      style={{ color: getStatusColor(request.status) }}
                    >
                      {request.status}
                    </div>
                  </div>

                  <div className="request-details">
                    <h4>{request.tourTitle}</h4>
                    <div className="request-meta">
                      <div className="meta-item">
                        <span>📅</span>
                        <span>{request.requestedDate}</span>
                      </div>
                      <div className="meta-item">
                        <span>👥</span>
                        <span>{request.participants} participants</span>
                      </div>
                      <div className="meta-item">
                        <span>💰</span>
                        <span>{request.budget}</span>
                      </div>
                    </div>
                    <p className="request-message">{request.message}</p>
                  </div>

                  <div className="request-actions">
                    <button
                      className="action-btn secondary"
                      onClick={() => handleViewDetails(request)}
                    >
                      View Details
                    </button>
                    {request.status === "Pending" && (
                      <>
                        <button
                          className="action-btn success"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="action-btn danger"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-requests">
              <p>No tour requests found.</p>
              {searchTerm || filterStatus !== "all" ? (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  className="clear-filters-btn"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          )}
        </div>

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Request Details</h2>
                <button className="close-btn" onClick={closeModal}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="request-detail-section">
                  <h3>Tourist Information</h3>
                  <div className="tourist-details">
                    <img
                      src={selectedRequest.avatar}
                      alt={selectedRequest.tourist}
                      className="tourist-avatar large"
                    />
                    <div>
                      <p>
                        <strong>Name:</strong> {selectedRequest.tourist}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedRequest.contactEmail}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedRequest.contactPhone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="request-detail-section">
                  <h3>Tour Details</h3>
                  <p>
                    <strong>Tour Title:</strong> {selectedRequest.tourTitle}
                  </p>
                  <p>
                    <strong>Requested Date:</strong>{" "}
                    {selectedRequest.requestedDate}
                  </p>
                  <p>
                    <strong>Participants:</strong>{" "}
                    {selectedRequest.participants}
                  </p>
                  <p>
                    <strong>Budget:</strong> {selectedRequest.budget}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      className="status-inline"
                      style={{ color: getStatusColor(selectedRequest.status) }}
                    >
                      {selectedRequest.status}
                    </span>
                  </p>
                </div>

                <div className="request-detail-section">
                  <h3>Message</h3>
                  <p className="message-detail">{selectedRequest.message}</p>
                </div>
              </div>

              <div className="modal-footer">
                {selectedRequest.status === "Pending" && (
                  <>
                    <button
                      className="action-btn success"
                      onClick={() => {
                        handleAcceptRequest(selectedRequest.id);
                        closeModal();
                      }}
                    >
                      Accept Request
                    </button>
                    <button
                      className="action-btn danger"
                      onClick={() => {
                        handleRejectRequest(selectedRequest.id);
                        closeModal();
                      }}
                    >
                      Reject Request
                    </button>
                  </>
                )}
                <button className="action-btn secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourRequests;
