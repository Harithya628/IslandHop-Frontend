import React, { useState, useEffect } from "react";
import "../Page.css";
import "./SystemHistory.css";

const SystemHistory = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("activity");
  const [activityLogs, setActivityLogs] = useState([]);
  const [auditTrails, setAuditTrails] = useState([]);
  const [changeHistory, setChangeHistory] = useState([]);
  const [systemEvents, setSystemEvents] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: "7days",
    severity: "all",
    category: "all",
    user: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for activity logs
  const mockActivityLogs = [
    {
      id: 1,
      timestamp: "2024-06-25T15:30:00Z",
      user: "admin@islandhop.com",
      action: "User Login",
      details: "Admin user logged in successfully",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
    },
    {
      id: 2,
      timestamp: "2024-06-25T15:25:00Z",
      user: "john.doe@islandhop.com",
      action: "Profile Update",
      details: "Updated user profile information",
      ip: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      status: "success",
    },
    {
      id: 3,
      timestamp: "2024-06-25T15:20:00Z",
      user: "support@islandhop.com",
      action: "Password Reset",
      details: "Password reset for user ID: 1247",
      ip: "192.168.1.102",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      status: "success",
    },
    {
      id: 4,
      timestamp: "2024-06-25T15:15:00Z",
      user: "unknown",
      action: "Failed Login",
      details: "Failed login attempt for admin@islandhop.com",
      ip: "203.0.113.195",
      userAgent: "curl/7.68.0",
      status: "failed",
    },
    {
      id: 5,
      timestamp: "2024-06-25T15:10:00Z",
      user: "system",
      action: "Backup Created",
      details: "Automated database backup completed",
      ip: "127.0.0.1",
      userAgent: "System Process",
      status: "success",
    },
  ];

  // Mock data for audit trails
  const mockAuditTrails = [
    {
      id: 1,
      timestamp: "2024-06-25T14:45:00Z",
      user: "admin@islandhop.com",
      action: "User Account Suspended",
      resource: "User ID: 789",
      oldValue: "Active",
      newValue: "Suspended",
      reason: "Terms of Service Violation",
      severity: "high",
    },
    {
      id: 2,
      timestamp: "2024-06-25T14:30:00Z",
      user: "admin@islandhop.com",
      action: "Permission Modified",
      resource: "Driver Account: driver123",
      oldValue: "Standard Driver",
      newValue: "Premium Driver",
      reason: "Account upgrade approved",
      severity: "medium",
    },
    {
      id: 3,
      timestamp: "2024-06-25T14:15:00Z",
      user: "system",
      action: "Configuration Change",
      resource: "AI Settings",
      oldValue: "Model: GPT-3.5",
      newValue: "Model: GPT-4",
      reason: "Automatic system update",
      severity: "medium",
    },
    {
      id: 4,
      timestamp: "2024-06-25T14:00:00Z",
      user: "support@islandhop.com",
      action: "Data Export",
      resource: "User Analytics Data",
      oldValue: null,
      newValue: "Exported 1,247 records",
      reason: "Compliance request",
      severity: "low",
    },
  ];

  // Mock data for change history
  const mockChangeHistory = [
    {
      id: 1,
      timestamp: "2024-06-25T13:45:00Z",
      module: "User Management",
      change: "Added new user verification flow",
      version: "v2.1.4",
      author: "dev-team@islandhop.com",
      description:
        "Implemented enhanced KYC verification process for new user registrations",
      impact: "All new user registrations",
      rollbackAvailable: true,
    },
    {
      id: 2,
      timestamp: "2024-06-25T13:30:00Z",
      module: "Payment System",
      change: "Updated payment gateway integration",
      version: "v2.1.3",
      author: "payment-team@islandhop.com",
      description:
        "Migrated to new payment processor with improved fraud detection",
      impact: "All payment transactions",
      rollbackAvailable: true,
    },
    {
      id: 3,
      timestamp: "2024-06-25T13:15:00Z",
      module: "Notification System",
      change: "Enhanced push notification delivery",
      version: "v2.1.2",
      author: "backend-team@islandhop.com",
      description:
        "Optimized notification delivery with better retry mechanisms",
      impact: "All app notifications",
      rollbackAvailable: false,
    },
    {
      id: 4,
      timestamp: "2024-06-25T13:00:00Z",
      module: "Driver App",
      change: "Fixed GPS tracking accuracy",
      version: "v2.1.1",
      author: "mobile-team@islandhop.com",
      description:
        "Resolved GPS drift issues affecting driver location tracking",
      impact: "Driver location services",
      rollbackAvailable: true,
    },
  ];

  // Mock data for system events
  const mockSystemEvents = [
    {
      id: 1,
      timestamp: "2024-06-25T16:00:00Z",
      event: "High CPU Usage",
      severity: "warning",
      source: "API Server 1",
      message: "CPU usage exceeded 90% threshold",
      status: "resolved",
      duration: "15 minutes",
      affectedUsers: 0,
    },
    {
      id: 2,
      timestamp: "2024-06-25T15:45:00Z",
      event: "Database Connection Pool Full",
      severity: "critical",
      source: "Database Server",
      message: "Connection pool reached maximum capacity",
      status: "resolved",
      duration: "8 minutes",
      affectedUsers: 156,
    },
    {
      id: 3,
      timestamp: "2024-06-25T15:30:00Z",
      event: "Deployment Completed",
      severity: "info",
      source: "CI/CD Pipeline",
      message: "Successfully deployed version v2.1.4 to production",
      status: "completed",
      duration: "4 minutes",
      affectedUsers: 0,
    },
    {
      id: 4,
      timestamp: "2024-06-25T15:15:00Z",
      event: "Cache Server Restart",
      severity: "warning",
      source: "Cache Server",
      message: "Redis server restarted due to memory issues",
      status: "resolved",
      duration: "2 minutes",
      affectedUsers: 23,
    },
    {
      id: 5,
      timestamp: "2024-06-25T15:00:00Z",
      event: "Backup Completed",
      severity: "info",
      source: "Backup Service",
      message: "Daily database backup completed successfully",
      status: "completed",
      duration: "45 minutes",
      affectedUsers: 0,
    },
  ];

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setActivityLogs(mockActivityLogs);
      setAuditTrails(mockAuditTrails);
      setChangeHistory(mockChangeHistory);
      setSystemEvents(mockSystemEvents);
      setLoading(false);
    }, 1500);
  }, []);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      success: "history-status-success",
      failed: "history-status-failed",
      warning: "history-status-warning",
      info: "history-status-info",
      resolved: "history-status-resolved",
      completed: "history-status-completed",
    };

    return (
      <span className={`history-status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getSeverityBadge = (severity) => {
    const severityClasses = {
      low: "history-severity-low",
      medium: "history-severity-medium",
      high: "history-severity-high",
      critical: "history-severity-critical",
      info: "history-severity-info",
      warning: "history-severity-warning",
    };

    return (
      <span className={`history-severity-badge ${severityClasses[severity]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const exportData = (dataType) => {
    // Simulate data export
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const filename = `${dataType}_export_${timestamp}.csv`;
    console.log(`Exporting ${dataType} data to ${filename}`);
    // In real implementation, this would generate and download a CSV file
  };

  const filteredData = (data) => {
    return data.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-content-card">
          <div className="history-loading-container">
            <div className="history-loading-spinner"></div>
            <p>Loading system history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="history-header">
          <div>
            <h1>System History</h1>
            <p>
              Monitor system activity, audit trails, changes, and events across
              your platform.
            </p>
          </div>
          <div className="history-header-actions">
            <button
              className="history-btn history-btn-secondary"
              onClick={() => exportData(activeTab)}
            >
              Export Data
            </button>
            <button className="history-btn history-btn-primary">
              Generate Report
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="history-filters">
          <div className="history-search">
            <input
              type="text"
              placeholder="Search logs, events, or changes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="history-search-input"
            />
          </div>
          <div className="history-filter-controls">
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="history-select"
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <select
              value={filters.severity}
              onChange={(e) => handleFilterChange("severity", e.target.value)}
              className="history-select"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="history-select"
            >
              <option value="all">All Categories</option>
              <option value="security">Security</option>
              <option value="system">System</option>
              <option value="user">User Actions</option>
              <option value="deployment">Deployment</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="history-tabs">
          <button
            className={`history-tab ${
              activeTab === "activity" ? "history-tab-active" : ""
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity Logs
          </button>
          <button
            className={`history-tab ${
              activeTab === "audit" ? "history-tab-active" : ""
            }`}
            onClick={() => setActiveTab("audit")}
          >
            Audit Trails
          </button>
          <button
            className={`history-tab ${
              activeTab === "changes" ? "history-tab-active" : ""
            }`}
            onClick={() => setActiveTab("changes")}
          >
            Change History
          </button>
          <button
            className={`history-tab ${
              activeTab === "events" ? "history-tab-active" : ""
            }`}
            onClick={() => setActiveTab("events")}
          >
            System Events
          </button>
        </div>

        <div className="history-tab-content">
          {/* Activity Logs Tab */}
          {activeTab === "activity" && (
            <div className="history-activity-section">
              <div className="history-list">
                {filteredData(activityLogs).map((log) => (
                  <div key={log.id} className="history-activity-item">
                    <div className="history-item-header">
                      <div className="history-item-main">
                        <h4>{log.action}</h4>
                        <p className="history-item-user">by {log.user}</p>
                      </div>
                      <div className="history-item-meta">
                        <span className="history-timestamp">
                          {formatTimestamp(log.timestamp)}
                        </span>
                        {getStatusBadge(log.status)}
                      </div>
                    </div>
                    <div className="history-item-details">
                      <p>{log.details}</p>
                      <div className="history-item-tech">
                        <span>
                          <strong>IP:</strong> {log.ip}
                        </span>
                        <span>
                          <strong>User Agent:</strong>{" "}
                          {log.userAgent.substring(0, 50)}...
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Trails Tab */}
          {activeTab === "audit" && (
            <div className="history-audit-section">
              <div className="history-list">
                {filteredData(auditTrails).map((audit) => (
                  <div key={audit.id} className="history-audit-item">
                    <div className="history-item-header">
                      <div className="history-item-main">
                        <h4>{audit.action}</h4>
                        <p className="history-item-resource">
                          {audit.resource}
                        </p>
                      </div>
                      <div className="history-item-meta">
                        <span className="history-timestamp">
                          {formatTimestamp(audit.timestamp)}
                        </span>
                        {getSeverityBadge(audit.severity)}
                      </div>
                    </div>
                    <div className="history-audit-changes">
                      {audit.oldValue && (
                        <div className="history-change-item">
                          <span className="history-change-label">From:</span>
                          <span className="history-change-old">
                            {audit.oldValue}
                          </span>
                        </div>
                      )}
                      <div className="history-change-item">
                        <span className="history-change-label">To:</span>
                        <span className="history-change-new">
                          {audit.newValue}
                        </span>
                      </div>
                    </div>
                    <div className="history-item-details">
                      <p>
                        <strong>User:</strong> {audit.user}
                      </p>
                      <p>
                        <strong>Reason:</strong> {audit.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Change History Tab */}
          {activeTab === "changes" && (
            <div className="history-changes-section">
              <div className="history-list">
                {filteredData(changeHistory).map((change) => (
                  <div key={change.id} className="history-change-card">
                    <div className="history-item-header">
                      <div className="history-item-main">
                        <h4>{change.change}</h4>
                        <p className="history-item-module">
                          {change.module} • {change.version}
                        </p>
                      </div>
                      <div className="history-item-meta">
                        <span className="history-timestamp">
                          {formatTimestamp(change.timestamp)}
                        </span>
                        <span
                          className={`history-rollback-badge ${
                            change.rollbackAvailable
                              ? "available"
                              : "unavailable"
                          }`}
                        >
                          {change.rollbackAvailable
                            ? "Rollback Available"
                            : "No Rollback"}
                        </span>
                      </div>
                    </div>
                    <div className="history-item-details">
                      <p>{change.description}</p>
                      <div className="history-change-meta">
                        <span>
                          <strong>Author:</strong> {change.author}
                        </span>
                        <span>
                          <strong>Impact:</strong> {change.impact}
                        </span>
                      </div>
                    </div>
                    {change.rollbackAvailable && (
                      <div className="history-change-actions">
                        <button className="history-action-btn history-action-rollback">
                          Rollback Change
                        </button>
                        <button className="history-action-btn history-action-view">
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Events Tab */}
          {activeTab === "events" && (
            <div className="history-events-section">
              <div className="history-list">
                {filteredData(systemEvents).map((event) => (
                  <div key={event.id} className="history-event-item">
                    <div className="history-item-header">
                      <div className="history-item-main">
                        <h4>{event.event}</h4>
                        <p className="history-item-source">{event.source}</p>
                      </div>
                      <div className="history-item-meta">
                        <span className="history-timestamp">
                          {formatTimestamp(event.timestamp)}
                        </span>
                        {getSeverityBadge(event.severity)}
                      </div>
                    </div>
                    <div className="history-item-details">
                      <p>{event.message}</p>
                      <div className="history-event-stats">
                        <span>
                          <strong>Status:</strong>{" "}
                          {getStatusBadge(event.status)}
                        </span>
                        <span>
                          <strong>Duration:</strong> {event.duration}
                        </span>
                        <span>
                          <strong>Affected Users:</strong>{" "}
                          {event.affectedUsers.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemHistory;
