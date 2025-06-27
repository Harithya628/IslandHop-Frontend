import React, { useState, useEffect } from "react";
import "../Page.css";
import "./UserAccounts.css";

const UserAccounts = ({
  onPageChange = null,
  setSelectedUserId = null,
  users: propUsers = null,
  setUsers: propSetUsers = null,
}) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    userType: "all",
    joinedDate: "all",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [showAddSupportModal, setShowAddSupportModal] = useState(false);
  const [supportEmail, setSupportEmail] = useState("");
  const [addSupportLoading, setAddSupportLoading] = useState(false);
  const [addSupportMessage, setAddSupportMessage] = useState("");
  // Mock data - In a real app, this would come from your backend/Firebase
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      userType: "traveler",
      status: "active",
      joinedDate: "2024-01-15",
      lastActive: "2024-06-20",
      totalTrips: 5,
      profileComplete: true,
      phone: "+94 77 123 4567",
      address: "123 Galle Road, Colombo 03, Sri Lanka",
      dateOfBirth: "1990-03-15",
      emergencyContact: "+94 77 987 6543",
      languages: "English, Sinhala",
      bio: "Travel enthusiast exploring Sri Lanka's beautiful destinations.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      userType: "driver",
      status: "active",
      joinedDate: "2024-02-20",
      lastActive: "2024-06-19",
      totalTrips: 23,
      profileComplete: true,
      phone: "+94 71 456 7890",
      address: "45 Kandy Road, Peradeniya, Sri Lanka",
      dateOfBirth: "1985-07-22",
      emergencyContact: "+94 71 111 2222",
      licenseNumber: "B1234567",
      vehicleInfo: "Toyota Corolla 2020 - Blue",
      languages: "English, Sinhala, Tamil",
      bio: "Professional driver with 8 years of experience providing safe and comfortable rides.",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      userType: "guide",
      status: "restricted",
      joinedDate: "2024-03-10",
      lastActive: "2024-06-15",
      totalTrips: 8,
      profileComplete: false,
      phone: "+94 76 789 0123",
      address: "78 Temple Road, Kandy, Sri Lanka",
      dateOfBirth: "1988-11-05",
      emergencyContact: "+94 76 333 4444",
      languages: "English, Mandarin, Sinhala",
      specializations: "Cultural Tours, Wildlife Photography, Historical Sites",
      bio: "Experienced tour guide specializing in cultural heritage and wildlife tours across Sri Lanka.",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      userType: "traveler",
      status: "inactive",
      joinedDate: "2024-01-05",
      lastActive: "2024-05-20",
      totalTrips: 2,
      profileComplete: true,
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert.w@email.com",
      userType: "driver",
      status: "active",
      joinedDate: "2024-04-12",
      lastActive: "2024-06-21",
      totalTrips: 15,
      profileComplete: true,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      userType: "guide",
      status: "active",
      joinedDate: "2024-02-28",
      lastActive: "2024-06-18",
      totalTrips: 12,
      profileComplete: true,
    },
    {
      id: 7,
      name: "David Brown",
      email: "david.brown@email.com",
      userType: "traveler",
      status: "active",
      joinedDate: "2024-05-15",
      lastActive: "2024-06-21",
      totalTrips: 1,
      profileComplete: false,
    },
    {
      id: 8,
      name: "Jessica Taylor",
      email: "jessica.t@email.com",
      userType: "driver",
      status: "restricted",
      joinedDate: "2024-03-22",
      lastActive: "2024-06-10",
      totalTrips: 7,
      profileComplete: true,
    },
    {
      id: 9,
      name: "Kevin Martinez",
      email: "kevin.m@email.com",
      userType: "traveler",
      status: "active",
      joinedDate: "2024-04-08",
      lastActive: "2024-06-20",
      totalTrips: 3,
      profileComplete: true,
    },
    {
      id: 10,
      name: "Amanda White",
      email: "amanda.white@email.com",
      userType: "guide",
      status: "active",
      joinedDate: "2024-01-20",
      lastActive: "2024-06-19",
      totalTrips: 18,
      profileComplete: true,
    },
    // Add more mock users for pagination testing
    {
      id: 11,
      name: "James Wilson",
      email: "james.wilson@email.com",
      userType: "traveler",
      status: "active",
      joinedDate: "2024-05-01",
      lastActive: "2024-06-21",
      totalTrips: 4,
      profileComplete: true,
    },
    {
      id: 12,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      userType: "driver",
      status: "active",
      joinedDate: "2024-03-15",
      lastActive: "2024-06-20",
      totalTrips: 11,
      profileComplete: true,
    },
  ];
  useEffect(() => {
    // If we have users from props, use them, otherwise load mock data
    if (propUsers && propUsers.length > 0) {
      setUsers(propUsers);
      setFilteredUsers(propUsers);
      setLoading(false);
    } else {
      // Simulate API call
      setTimeout(() => {
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        // Also set the shared users state
        if (propSetUsers) {
          propSetUsers(mockUsers);
        }
        setLoading(false);
      }, 1000);
    }
  }, [propUsers]);

  // Sync local users state with prop users state
  useEffect(() => {
    if (propUsers && propUsers.length > 0) {
      setUsers(propUsers);
    }
  }, [propUsers]);

  useEffect(() => {
    applyFilters();
  }, [filters, users, sortConfig]);

  const applyFilters = () => {
    let filtered = [...users];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((user) => user.status === filters.status);
    }

    // User type filter
    if (filters.userType !== "all") {
      filtered = filtered.filter((user) => user.userType === filters.userType);
    }

    // Date filter
    if (filters.joinedDate !== "all") {
      const today = new Date();
      const filterDate = new Date();

      switch (filters.joinedDate) {
        case "last7days":
          filterDate.setDate(today.getDate() - 7);
          break;
        case "last30days":
          filterDate.setDate(today.getDate() - 30);
          break;
        case "last90days":
          filterDate.setDate(today.getDate() - 90);
          break;
        default:
          break;
      }

      if (filters.joinedDate !== "all") {
        filtered = filtered.filter(
          (user) => new Date(user.joinedDate) >= filterDate
        );
      }
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (
          sortConfig.key === "joinedDate" ||
          sortConfig.key === "lastActive"
        ) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };
  const handleUpdateUser = (userId) => {
    if (setSelectedUserId && onPageChange) {
      setSelectedUserId(userId);
      onPageChange("UpdateUserProfile");
    }
  };
  const handleRestrictUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    const newStatus = user.status === "restricted" ? "active" : "restricted";

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, status: newStatus } : u
    );

    setUsers(updatedUsers);

    // Also update the shared users state
    if (propSetUsers) {
      propSetUsers(updatedUsers);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      active: "status-active",
      inactive: "status-inactive",
      restricted: "status-restricted",
    };
    return (
      <span className={`status-badge ${statusClass[status]}`}>{status}</span>
    );
  };

  const getUserTypeBadge = (userType) => {
    const typeClass = {
      traveler: "type-traveler",
      driver: "type-driver",
      guide: "type-guide",
    };
    return (
      <span className={`user-type-badge ${typeClass[userType]}`}>
        {userType}
      </span>
    );
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="page">
        <div className="page-content-card">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading user accounts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1>User Accounts</h1>
              <p>Manage user accounts, profiles, and access permissions</p>
            </div>
            <button
              className="btn-add-support"
              style={{
                marginLeft: 24,
                height: 40,
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "0 18px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setShowAddSupportModal(true)}
            >
              + Add Customer Support Account
            </button>
            {showAddSupportModal && (
              <div
                className="modal-overlay"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.3)",
                  zIndex: 1000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="modal-content"
                  style={{
                    background: "#fff",
                    padding: 32,
                    borderRadius: 8,
                    minWidth: 320,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                  }}
                >
                  <h2 style={{ marginTop: 0 }}>
                    Add Customer Support Account
                  </h2>
                  <label
                    htmlFor="support-email"
                    style={{
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Support Email
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="Enter email address"
                    style={{
                      width: "100%",
                      padding: 8,
                      marginBottom: 16,
                      borderRadius: 4,
                      border: "1px solid #ccc",
                    }}
                    disabled={addSupportLoading}
                  />
                  {addSupportMessage && (
                    <div
                      style={{
                        marginBottom: 12,
                        color: addSupportMessage.startsWith("Success")
                          ? "#10b981"
                          : "#dc2626",
                      }}
                    >
                      {addSupportMessage}
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 8,
                    }}
                  >
                    <button
                      onClick={() => {
                        setShowAddSupportModal(false);
                        setSupportEmail("");
                        setAddSupportMessage("");
                        setAddSupportLoading(false);
                      }}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 4,
                        border: "none",
                        background: "#e5e7eb",
                        color: "#111",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                      disabled={addSupportLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        if (!supportEmail.trim()) {
                          setAddSupportMessage("Please enter an email address.");
                          return;
                        }
                        setAddSupportLoading(true);
                        setAddSupportMessage("");
                        try {
                          const res = await fetch(
                            "http://localhost:8083/api/v1/admin/create/support",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              credentials: "include",
                              body: JSON.stringify({ email: supportEmail }),
                            }
                          );
                          const data = await res.json();
                          if (res.ok) {
                            setAddSupportMessage(
                              "Success: " + (data.message || "Account created.")
                            );
                            setSupportEmail("");
                          } else {
                            setAddSupportMessage(
                              data.message
                                ? "Error: " + data.message
                                : "Error creating account."
                            );
                          }
                        } catch (e) {
                          setAddSupportMessage("Error: " + e.message);
                        }
                        setAddSupportLoading(false);
                      }}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 4,
                        border: "none",
                        background: "#2563eb",
                        color: "#fff",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      disabled={addSupportLoading}
                    >
                      {addSupportLoading ? "Adding..." : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">{users.length}</span>
                <span className="stat-label">Total Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {users.filter((u) => u.status === "active").length}
                </span>
                <span className="stat-label">Active</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {users.filter((u) => u.status === "restricted").length}
                </span>
                <span className="stat-label">Restricted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-row">
              <div className="filter-group">
                <label htmlFor="search">Search Users</label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or email..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="userType">User Type</label>
                <select
                  id="userType"
                  value={filters.userType}
                  onChange={(e) =>
                    handleFilterChange("userType", e.target.value)
                  }
                  className="filter-select"
                >
                  <option value="all">All Types</option>
                  <option value="traveler">Traveler</option>
                  <option value="driver">Driver</option>
                  <option value="guide">Guide</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="joinedDate">Joined Date</label>
                <select
                  id="joinedDate"
                  value={filters.joinedDate}
                  onChange={(e) =>
                    handleFilterChange("joinedDate", e.target.value)
                  }
                  className="filter-select"
                >
                  <option value="all">All Time</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last90days">Last 90 Days</option>
                </select>
              </div>
            </div>

            <div className="results-info">
              <span>
                Showing {currentUsers.length} of {filteredUsers.length} users
              </span>
            </div>
          </div>

          {/* Users Table */}
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")} className="sortable">
                    Name
                    {sortConfig.key === "name" && (
                      <span
                        className={`sort-indicator ${sortConfig.direction}`}
                      >
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("email")} className="sortable">
                    Email
                    {sortConfig.key === "email" && (
                      <span
                        className={`sort-indicator ${sortConfig.direction}`}
                      >
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    onClick={() => handleSort("userType")}
                    className="sortable"
                  >
                    Type
                    {sortConfig.key === "userType" && (
                      <span
                        className={`sort-indicator ${sortConfig.direction}`}
                      >
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort("status")} className="sortable">
                    Status
                    {sortConfig.key === "status" && (
                      <span
                        className={`sort-indicator ${sortConfig.direction}`}
                      >
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    onClick={() => handleSort("joinedDate")}
                    className="sortable"
                  >
                    Joined
                    {sortConfig.key === "joinedDate" && (
                      <span
                        className={`sort-indicator ${sortConfig.direction}`}
                      >
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    onClick={() => handleSort("lastActive")}
                    className="sortable"
                  >
                    Last Active
                    {sortConfig.key === "lastActive" && (
                      <span
                        className={`sort-indicator ${sortConfig.direction}`}
                      >
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    onClick={() => handleSort("totalTrips")}
                    className="sortable"
                  >
                    Trips
                    {sortConfig.key === "totalTrips" && (
                      <span
                        className={`sort-indicator ${sortConfig.direction}`}
                      >
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="user-row">
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="user-details">
                          <span className="user-name">{user.name}</span>
                          {!user.profileComplete && (
                            <span className="incomplete-profile">
                              Profile Incomplete
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{getUserTypeBadge(user.userType)}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>{formatDate(user.joinedDate)}</td>
                    <td>{formatDate(user.lastActive)}</td>
                    <td>{user.totalTrips}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-update"
                          onClick={() => handleUpdateUser(user.id)}
                          title="Update user information"
                        >
                          Update
                        </button>
                        <button
                          className={`btn-restrict ${
                            user.status === "restricted" ? "unrestrict" : ""
                          }`}
                          onClick={() => handleRestrictUser(user.id)}
                          title={
                            user.status === "restricted"
                              ? "Remove restriction"
                              : "Restrict user access"
                          }
                        >
                          {user.status === "restricted"
                            ? "Unrestrict"
                            : "Restrict"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      className={`pagination-number ${
                        currentPage === number ? "active" : ""
                      }`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  )
                )}
              </div>

              <button
                className="pagination-btn"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccounts;
