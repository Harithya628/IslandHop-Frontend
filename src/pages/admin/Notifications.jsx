import React, { useState, useEffect } from "react";
import "../Page.css";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    priority: "all",
    search: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Mock data for system notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Database Connection Issue",
      message:
        "Primary database server experiencing intermittent connection issues. Users may experience slow loading times.",
      type: "system",
      priority: "high",
      status: "active",
      timestamp: "2024-06-25T10:30:00Z",
      affectedServices: ["User Authentication", "Booking System"],
      resolvedAt: null,
      reportedBy: "System Monitor",
      actions: ["Restart Database", "Switch to Backup"],
    },
    {
      id: 2,
      title: "Payment Gateway Maintenance",
      message:
        "Scheduled maintenance on payment processing system. All transactions will be temporarily unavailable.",
      type: "maintenance",
      priority: "medium",
      status: "scheduled",
      timestamp: "2024-06-26T02:00:00Z",
      affectedServices: ["Payment Processing", "Booking Confirmation"],
      resolvedAt: null,
      reportedBy: "DevOps Team",
      actions: ["Schedule Maintenance", "Notify Users"],
    },
    {
      id: 3,
      title: "High Server Load Detected",
      message:
        "Server CPU usage exceeded 90% threshold. Performance monitoring shows increased response times.",
      type: "performance",
      priority: "high",
      status: "investigating",
      timestamp: "2024-06-25T14:15:00Z",
      affectedServices: ["Web Application", "API Services"],
      resolvedAt: null,
      reportedBy: "Performance Monitor",
      actions: ["Scale Resources", "Optimize Queries"],
    },
    {
      id: 4,
      title: "Email Service Restored",
      message:
        "Email notification service has been fully restored after 2-hour outage. All pending emails have been sent.",
      type: "system",
      priority: "medium",
      status: "resolved",
      timestamp: "2024-06-25T08:00:00Z",
      affectedServices: ["Email Notifications", "User Communication"],
      resolvedAt: "2024-06-25T10:00:00Z",
      reportedBy: "System Monitor",
      actions: ["Service Restart", "Queue Processing"],
    },
    {
      id: 5,
      title: "Security Patch Applied",
      message:
        "Critical security update has been successfully applied to all server instances. No user action required.",
      type: "security",
      priority: "high",
      status: "resolved",
      timestamp: "2024-06-24T22:00:00Z",
      affectedServices: ["Authentication", "User Data Protection"],
      resolvedAt: "2024-06-24T22:30:00Z",
      reportedBy: "Security Team",
      actions: ["Apply Patches", "Security Scan"],
    },
    {
      id: 6,
      title: "API Rate Limit Exceeded",
      message:
        "Third-party mapping service API has exceeded rate limits. Alternative routing service activated.",
      type: "integration",
      priority: "medium",
      status: "mitigated",
      timestamp: "2024-06-25T16:45:00Z",
      affectedServices: ["Route Planning", "Location Services"],
      resolvedAt: null,
      reportedBy: "API Monitor",
      actions: ["Switch Provider", "Upgrade Plan"],
    },
    {
      id: 7,
      title: "Backup Process Failed",
      message:
        "Daily backup process failed due to insufficient storage space. Manual backup initiated.",
      type: "backup",
      priority: "high",
      status: "active",
      timestamp: "2024-06-25T03:00:00Z",
      affectedServices: ["Data Backup", "Disaster Recovery"],
      resolvedAt: null,
      reportedBy: "Backup System",
      actions: ["Clear Storage", "Manual Backup"],
    },
    {
      id: 8,
      title: "Mobile App Update Released",
      message:
        "Version 2.1.3 of the mobile application has been released with bug fixes and performance improvements.",
      type: "update",
      priority: "low",
      status: "completed",
      timestamp: "2024-06-24T14:00:00Z",
      affectedServices: ["Mobile Application", "User Experience"],
      resolvedAt: "2024-06-24T14:00:00Z",
      reportedBy: "Development Team",
      actions: ["Deploy Update", "Monitor Metrics"],
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = notifications;

    if (filters.type !== "all") {
      filtered = filtered.filter((notif) => notif.type === filters.type);
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((notif) => notif.status === filters.status);
    }

    if (filters.priority !== "all") {
      filtered = filtered.filter(
        (notif) => notif.priority === filters.priority
      );
    }

    if (filters.search) {
      filtered = filtered.filter(
        (notif) =>
          notif.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          notif.message.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [filters, notifications]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: (
        <span className="notifications-status-badge notifications-status-active">
          Active
        </span>
      ),
      resolved: (
        <span className="notifications-status-badge notifications-status-resolved">
          Resolved
        </span>
      ),
      investigating: (
        <span className="notifications-status-badge notifications-status-investigating">
          Investigating
        </span>
      ),
      scheduled: (
        <span className="notifications-status-badge notifications-status-scheduled">
          Scheduled
        </span>
      ),
      mitigated: (
        <span className="notifications-status-badge notifications-status-mitigated">
          Mitigated
        </span>
      ),
      completed: (
        <span className="notifications-status-badge notifications-status-completed">
          Completed
        </span>
      ),
    };
    return (
      badges[status] || (
        <span className="notifications-status-badge">{status}</span>
      )
    );
  };

  const getTypeBadge = (type) => {
    const badges = {
      system: (
        <span className="notifications-type-badge notifications-type-system">
          System
        </span>
      ),
      maintenance: (
        <span className="notifications-type-badge notifications-type-maintenance">
          Maintenance
        </span>
      ),
      performance: (
        <span className="notifications-type-badge notifications-type-performance">
          Performance
        </span>
      ),
      security: (
        <span className="notifications-type-badge notifications-type-security">
          Security
        </span>
      ),
      integration: (
        <span className="notifications-type-badge notifications-type-integration">
          Integration
        </span>
      ),
      backup: (
        <span className="notifications-type-badge notifications-type-backup">
          Backup
        </span>
      ),
      update: (
        <span className="notifications-type-badge notifications-type-update">
          Update
        </span>
      ),
    };
    return (
      badges[type] || <span className="notifications-type-badge">{type}</span>
    );
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleResolveNotification = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id
          ? {
              ...notif,
              status: "resolved",
              resolvedAt: new Date().toISOString(),
            }
          : notif
      )
    );
    setShowModal(false);
  };

  const handleAcknowledgeNotification = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: "investigating" } : notif
      )
    );
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-content-card">
          <div className="notifications-loading-container">
            <div className="notifications-loading-spinner"></div>
            <p>Loading notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="notifications-page-header">
          <div className="notifications-header-content">
            <div>
              <h1>System Notifications</h1>
              <p>
                Monitor system alerts, service status, and maintenance
                notifications
              </p>
            </div>
            <div className="notifications-header-stats">
              <div className="notifications-stat-item">
                <span className="notifications-stat-number">
                  {notifications.length}
                </span>
                <span className="notifications-stat-label">Total</span>
              </div>
              <div className="notifications-stat-item">
                <span className="notifications-stat-number">
                  {notifications.filter((n) => n.status === "active").length}
                </span>
                <span className="notifications-stat-label">Active</span>
              </div>
              <div className="notifications-stat-item">
                <span className="notifications-stat-number">
                  {notifications.filter((n) => n.priority === "high").length}
                </span>
                <span className="notifications-stat-label">High Priority</span>
              </div>
            </div>
          </div>
        </div>

        <div className="notifications-page-content">
          {/* Filters Section */}
          <div className="notifications-filters-section">
            <div className="notifications-filters-row">
              <div className="notifications-filter-group">
                <label htmlFor="search">Search Notifications</label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title or message..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="notifications-filter-input"
                />
              </div>

              <div className="notifications-filter-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="notifications-filter-select"
                >
                  <option value="all">All Types</option>
                  <option value="system">System</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="performance">Performance</option>
                  <option value="security">Security</option>
                  <option value="integration">Integration</option>
                  <option value="backup">Backup</option>
                  <option value="update">Update</option>
                </select>
              </div>

              <div className="notifications-filter-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="notifications-filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                  <option value="investigating">Investigating</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="mitigated">Mitigated</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="notifications-filter-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={filters.priority}
                  onChange={(e) =>
                    handleFilterChange("priority", e.target.value)
                  }
                  className="notifications-filter-select"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="notifications-results-info">
              <span>
                Showing {filteredNotifications.length} of {notifications.length}{" "}
                notifications
              </span>
            </div>
          </div>

          {/* Notifications List */}
          <div className="notifications-main-container">
            {filteredNotifications.length === 0 ? (
              <div className="notifications-no-results">
                <h3>No notifications found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notifications-card notifications-priority-${notification.priority} notifications-status-${notification.status}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notifications-card-header">
                    <div className="notifications-card-title">
                      <span className="notifications-priority-icon">
                        {getPriorityIcon(notification.priority)}
                      </span>
                      <h3>{notification.title}</h3>
                    </div>
                    <div className="notifications-card-badges">
                      {getTypeBadge(notification.type)}
                      {getStatusBadge(notification.status)}
                    </div>
                  </div>

                  <div className="notifications-card-content">
                    <p className="notifications-card-message">
                      {notification.message}
                    </p>
                    <div className="notifications-card-meta">
                      <span className="notifications-timestamp">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      <span className="notifications-reported-by">
                        Reported by: {notification.reportedBy}
                      </span>
                    </div>

                    <div className="notifications-affected-services">
                      <span className="notifications-services-label">
                        Affected Services:
                      </span>
                      {notification.affectedServices.map((service, index) => (
                        <span key={index} className="notifications-service-tag">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="notifications-card-actions">
                    {notification.status === "active" && (
                      <button
                        className="notifications-action-btn notifications-action-acknowledge"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcknowledgeNotification(notification.id);
                        }}
                      >
                        Acknowledge
                      </button>
                    )}
                    <button className="notifications-action-btn notifications-action-view">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notification Detail Modal */}
        {showModal && selectedNotification && (
          <div
            className="notifications-modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <div
              className="notifications-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="notifications-modal-header">
                <h2>{selectedNotification.title}</h2>
                <button
                  className="notifications-modal-close"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              <div className="notifications-modal-body">
                <div className="notifications-modal-section">
                  <h4>Details</h4>
                  <p>{selectedNotification.message}</p>
                </div>

                <div className="notifications-modal-section">
                  <h4>Information</h4>
                  <div className="notifications-info-grid">
                    <div className="notifications-info-item">
                      <span className="notifications-info-label">Type:</span>
                      {getTypeBadge(selectedNotification.type)}
                    </div>
                    <div className="notifications-info-item">
                      <span className="notifications-info-label">
                        Priority:
                      </span>
                      <span
                        className={`notifications-priority-text notifications-priority-${selectedNotification.priority}`}
                      >
                        {getPriorityIcon(selectedNotification.priority)}{" "}
                        {selectedNotification.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="notifications-info-item">
                      <span className="notifications-info-label">Status:</span>
                      {getStatusBadge(selectedNotification.status)}
                    </div>
                    <div className="notifications-info-item">
                      <span className="notifications-info-label">
                        Reported:
                      </span>
                      <span>
                        {formatTimestamp(selectedNotification.timestamp)}
                      </span>
                    </div>
                    <div className="notifications-info-item">
                      <span className="notifications-info-label">
                        Reported By:
                      </span>
                      <span>{selectedNotification.reportedBy}</span>
                    </div>
                    {selectedNotification.resolvedAt && (
                      <div className="notifications-info-item">
                        <span className="notifications-info-label">
                          Resolved:
                        </span>
                        <span>
                          {formatTimestamp(selectedNotification.resolvedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="notifications-modal-section">
                  <h4>Affected Services</h4>
                  <div className="notifications-services-list">
                    {selectedNotification.affectedServices.map(
                      (service, index) => (
                        <span
                          key={index}
                          className="notifications-service-tag notifications-service-large"
                        >
                          {service}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="notifications-modal-section">
                  <h4>Recommended Actions</h4>
                  <ul className="notifications-actions-list">
                    {selectedNotification.actions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="notifications-modal-footer">
                {selectedNotification.status !== "resolved" && (
                  <button
                    className="notifications-modal-btn notifications-modal-resolve"
                    onClick={() =>
                      handleResolveNotification(selectedNotification.id)
                    }
                  >
                    Mark as Resolved
                  </button>
                )}
                <button
                  className="notifications-modal-btn notifications-modal-cancel"
                  onClick={() => setShowModal(false)}
                >
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

export default Notifications;
