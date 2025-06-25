import React, { useState, useEffect } from "react";
import "../Page.css";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    userType: "all",
    rating: "all",
    reportStatus: "all",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Mock data for reviews with reported comments
  const mockReviews = [
    {
      id: 1,
      reviewerName: "John Smith",
      reviewerEmail: "john.smith@email.com",
      targetType: "driver",
      targetName: "Sarah Johnson",
      targetEmail: "sarah.j@email.com",
      rating: 2,
      comment: "Very rude behavior and unsafe driving. Would not recommend.",
      reportReason: "Inappropriate language",
      reportedBy: "Mike Chen",
      reportDate: "2024-06-20",
      reviewDate: "2024-06-15",
      status: "reported",
      isReported: true,
      tripId: "TRIP001",
    },
    {
      id: 2,
      reviewerName: "Emily Davis",
      reviewerEmail: "emily.davis@email.com",
      targetType: "guide",
      targetName: "Mike Chen",
      targetEmail: "mike.chen@email.com",
      rating: 1,
      comment:
        "Completely unprofessional and showed up late. Ruined our entire day.",
      reportReason: "False information",
      reportedBy: "Admin",
      reportDate: "2024-06-19",
      reviewDate: "2024-06-10",
      status: "reported",
      isReported: true,
      tripId: "TRIP002",
    },
    {
      id: 3,
      reviewerName: "Robert Wilson",
      reviewerEmail: "robert.w@email.com",
      targetType: "driver",
      targetName: "Jessica Taylor",
      targetEmail: "jessica.t@email.com",
      rating: 5,
      comment: "Excellent service, very professional and courteous.",
      reportReason: null,
      reportedBy: null,
      reportDate: null,
      reviewDate: "2024-06-18",
      status: "approved",
      isReported: false,
      tripId: "TRIP003",
    },
    {
      id: 4,
      reviewerName: "Lisa Anderson",
      reviewerEmail: "lisa.anderson@email.com",
      targetType: "guide",
      targetName: "Amanda White",
      targetEmail: "amanda.white@email.com",
      rating: 1,
      comment: "Terrible experience. Guide was intoxicated and inappropriate.",
      reportReason: "Serious misconduct",
      reportedBy: "System",
      reportDate: "2024-06-17",
      reviewDate: "2024-06-16",
      status: "reported",
      isReported: true,
      tripId: "TRIP004",
    },
    {
      id: 5,
      reviewerName: "David Brown",
      reviewerEmail: "david.brown@email.com",
      targetType: "driver",
      targetName: "Robert Wilson",
      targetEmail: "robert.w@email.com",
      rating: 4,
      comment: "Good driver, arrived on time and was helpful.",
      reportReason: null,
      reportedBy: null,
      reportDate: null,
      reviewDate: "2024-06-14",
      status: "approved",
      isReported: false,
      tripId: "TRIP005",
    },
    {
      id: 6,
      reviewerName: "Kevin Martinez",
      reviewerEmail: "kevin.m@email.com",
      targetType: "guide",
      targetName: "Lisa Anderson",
      targetEmail: "lisa.anderson@email.com",
      rating: 2,
      comment:
        "Guide used offensive language and was disrespectful to local customs.",
      reportReason: "Inappropriate behavior",
      reportedBy: "Tourist Board",
      reportDate: "2024-06-13",
      reviewDate: "2024-06-12",
      status: "under_review",
      isReported: true,
      tripId: "TRIP006",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      setFilteredReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, reviews]);

  const applyFilters = () => {
    let filtered = [...reviews];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (review) =>
          review.reviewerName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          review.targetName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          review.comment.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((review) => review.status === filters.status);
    }

    // User type filter
    if (filters.userType !== "all") {
      filtered = filtered.filter(
        (review) => review.targetType === filters.userType
      );
    }

    // Rating filter
    if (filters.rating !== "all") {
      const ratingValue = parseInt(filters.rating);
      filtered = filtered.filter((review) => review.rating === ratingValue);
    }

    // Report status filter
    if (filters.reportStatus !== "all") {
      const isReported = filters.reportStatus === "reported";
      filtered = filtered.filter((review) => review.isReported === isReported);
    }

    setFilteredReviews(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleRemoveReview = (reviewId) => {
    const review = reviews.find((r) => r.id === reviewId);
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const confirmRemoveReview = () => {
    const updatedReviews = reviews.filter((r) => r.id !== reviewToDelete.id);
    setReviews(updatedReviews);
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  const cancelRemoveReview = () => {
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  const handleApproveReview = (reviewId) => {
    const updatedReviews = reviews.map((r) =>
      r.id === reviewId ? { ...r, status: "approved", isReported: false } : r
    );
    setReviews(updatedReviews);
  };

  const handleRejectReview = (reviewId) => {
    const updatedReviews = reviews.map((r) =>
      r.id === reviewId ? { ...r, status: "rejected" } : r
    );
    setReviews(updatedReviews);
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      reported: "status-reported",
      under_review: "status-under-review",
      approved: "status-approved",
      rejected: "status-rejected",
    };
    return (
      <span className={`status-badge ${statusClass[status]}`}>
        {status.replace("_", " ")}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : "empty"}`}>
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-content-card">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading reviews...</p>
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
              <h1>Reviews Management</h1>
              <p>
                Manage customer reviews, handle reported comments, and moderate
                feedback
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">{reviews.length}</span>
                <span className="stat-label">Total Reviews</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {reviews.filter((r) => r.isReported).length}
                </span>
                <span className="stat-label">Reported</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {reviews.filter((r) => r.status === "under_review").length}
                </span>
                <span className="stat-label">Under Review</span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-row">
              <div className="filter-group">
                <label htmlFor="search">Search Reviews</label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by reviewer, target, or comment..."
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
                  <option value="reported">Reported</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="userType">Target Type</label>
                <select
                  id="userType"
                  value={filters.userType}
                  onChange={(e) =>
                    handleFilterChange("userType", e.target.value)
                  }
                  className="filter-select"
                >
                  <option value="all">All Types</option>
                  <option value="driver">Drivers</option>
                  <option value="guide">Guides</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="rating">Rating</label>
                <select
                  id="rating"
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Ratings</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="reportStatus">Report Status</label>
                <select
                  id="reportStatus"
                  value={filters.reportStatus}
                  onChange={(e) =>
                    handleFilterChange("reportStatus", e.target.value)
                  }
                  className="filter-select"
                >
                  <option value="all">All</option>
                  <option value="reported">Reported Only</option>
                  <option value="not_reported">Not Reported</option>
                </select>
              </div>
            </div>

            <div className="results-info">
              <span>
                Showing {filteredReviews.length} of {reviews.length} reviews
              </span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-container">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`review-card ${review.isReported ? "reported" : ""}`}
              >
                <div className="review-header">
                  <div className="review-info">
                    <div className="reviewer-details">
                      <h3>{review.reviewerName}</h3>
                      <span className="reviewer-email">
                        {review.reviewerEmail}
                      </span>
                    </div>
                    <div className="review-target">
                      <span className="target-type">{review.targetType}</span>
                      <span className="target-name">{review.targetName}</span>
                    </div>
                  </div>
                  <div className="review-meta">
                    <div className="rating">
                      {getRatingStars(review.rating)}
                    </div>
                    <div className="review-date">
                      {formatDate(review.reviewDate)}
                    </div>
                    {getStatusBadge(review.status)}
                  </div>
                </div>

                <div className="review-comment">
                  <p>{review.comment}</p>
                </div>

                {review.isReported && (
                  <div className="report-info">
                    <div className="report-details">
                      <strong>Reported by:</strong> {review.reportedBy} on{" "}
                      {formatDate(review.reportDate)}
                    </div>
                    <div className="report-reason">
                      <strong>Reason:</strong> {review.reportReason}
                    </div>
                  </div>
                )}

                <div className="review-actions">
                  <button className="btn-trip" title="View Trip Details">
                    Trip: {review.tripId}
                  </button>

                  {review.status === "reported" && (
                    <>
                      <button
                        className="btn-approve"
                        onClick={() => handleApproveReview(review.id)}
                        title="Approve Review"
                      >
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleRejectReview(review.id)}
                        title="Reject Review"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    className="btn-remove"
                    onClick={() => handleRemoveReview(review.id)}
                    title="Remove Review"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="no-reviews">
              <h3>No reviews found</h3>
              <p>No reviews match your current filter criteria.</p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Confirm Review Removal</h3>
              </div>
              <div className="modal-content">
                <p>Are you sure you want to remove this review?</p>
                <div className="review-preview">
                  <strong>Reviewer:</strong> {reviewToDelete?.reviewerName}
                  <br />
                  <strong>Target:</strong> {reviewToDelete?.targetName} (
                  {reviewToDelete?.targetType})<br />
                  <strong>Comment:</strong> "{reviewToDelete?.comment}"
                </div>
                <p className="warning">This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={cancelRemoveReview}>
                  Cancel
                </button>
                <button className="btn-confirm" onClick={confirmRemoveReview}>
                  Remove Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
