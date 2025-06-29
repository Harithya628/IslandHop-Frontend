import React, { useState } from "react";
import "../Page.css";
import "./GuideDashboard.css";

// Mock data for reviews
const mockReviews = [
  {
    id: "REV-001",
    tourist: "Anna Rodriguez",
    rating: 5,
    review: "Absolutely amazing experience! Our guide was knowledgeable and friendly. Highly recommend!",
    tour: "Sigiriya Rock Fortress Tour",
    date: "2025-06-20",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    helpful: 12,
    verified: true,
  },
  {
    id: "REV-002",
    tourist: "David Kim",
    rating: 4,
    review: "Great tour with beautiful scenery. The guide provided excellent insights into local culture.",
    tour: "Kandy Temple Tour",
    date: "2025-06-18",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    helpful: 8,
    verified: true,
  },
  {
    id: "REV-003",
    tourist: "Lisa Thompson",
    rating: 5,
    review: "Perfect day exploring Galle Fort. Professional guide and well-organized tour.",
    tour: "Galle Fort Heritage Walk",
    date: "2025-06-15",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    helpful: 15,
    verified: true,
  },
  {
    id: "REV-004",
    tourist: "James Wilson",
    rating: 3,
    review: "Good tour but could have been more interactive. The location was beautiful though.",
    tour: "Nuwara Eliya Hill Country Tour",
    date: "2025-06-12",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    helpful: 3,
    verified: false,
  },
  {
    id: "REV-005",
    tourist: "Maria Garcia",
    rating: 5,
    review: "Outstanding wildlife experience! Saw elephants, leopards, and many birds. Guide was extremely knowledgeable about wildlife behavior.",
    tour: "Yala National Park Safari",
    date: "2025-06-10",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    helpful: 20,
    verified: true,
  },
  {
    id: "REV-006",
    tourist: "Robert Chen",
    rating: 4,
    review: "Very informative city tour. Learned a lot about Colombo's history and culture.",
    tour: "Colombo City & Shopping Tour",
    date: "2025-06-08",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    helpful: 6,
    verified: true,
  },
];

const Reviews = () => {
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  // Calculate review statistics
  const getReviewStats = () => {
    const total = mockReviews.length;
    const average = mockReviews.reduce((sum, review) => sum + review.rating, 0) / total;
    const distribution = {
      5: mockReviews.filter(r => r.rating === 5).length,
      4: mockReviews.filter(r => r.rating === 4).length,
      3: mockReviews.filter(r => r.rating === 3).length,
      2: mockReviews.filter(r => r.rating === 2).length,
      1: mockReviews.filter(r => r.rating === 1).length,
    };

    return { total, average, distribution };
  };

  const stats = getReviewStats();

  // Filter and sort reviews
  const getFilteredAndSortedReviews = () => {
    let filtered = mockReviews;

    // Filter by rating
    if (filterRating !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(filterRating));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "helpful":
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredReviews = getFilteredAndSortedReviews();

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : ""}`}
      >
        ⭐
      </span>
    ));
  };

  const renderRatingBar = (rating, count) => {
    const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
    return (
      <div className="rating-bar">
        <span className="rating-label">{rating} ⭐</span>
        <div className="bar-container">
          <div 
            className="bar-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="rating-count">({count})</span>
      </div>
    );
  };

  const handleReply = (reviewId) => {
    // In a real app, this would open a reply interface
    alert(`Reply functionality for review ${reviewId} would be implemented here.`);
  };

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1>Reviews & Ratings</h1>
              <p>View and manage reviews from your tour participants</p>
            </div>
          </div>
        </div>

        {/* Review Statistics */}
        <div className="review-statistics">
          <div className="stats-overview">
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <h3>{stats.average.toFixed(1)}</h3>
                <p>Average Rating</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-info">
                <h3>{stats.total}</h3>
                <p>Total Reviews</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👍</div>
              <div className="stat-info">
                <h3>{Math.round((stats.distribution[5] + stats.distribution[4]) / stats.total * 100)}%</h3>
                <p>Positive Reviews</p>
              </div>
            </div>
          </div>

          <div className="rating-distribution">
            <h3>Rating Distribution</h3>
            {[5, 4, 3, 2, 1].map(rating => 
              renderRatingBar(rating, stats.distribution[rating])
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="review-controls">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <select
              value={filterRating}
              onChange={(e) => {
                setFilterRating(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-content">
          {filteredReviews.length > 0 ? (
            <>
              <div className="reviews-list">
                {currentReviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <img 
                          src={review.avatar} 
                          alt={review.tourist}
                          className="reviewer-avatar"
                        />
                        <div>
                          <h4>
                            {review.tourist}
                            {review.verified && (
                              <span className="verified-badge">✓ Verified</span>
                            )}
                          </h4>
                          <p className="review-tour">{review.tour}</p>
                          <p className="review-date">{review.date}</p>
                        </div>
                      </div>
                      <div className="review-rating">
                        <div className="stars">
                          {renderStars(review.rating)}
                        </div>
                        <span className="rating-number">({review.rating}/5)</span>
                      </div>
                    </div>

                    <div className="review-content">
                      <p>{review.review}</p>
                    </div>

                    <div className="review-footer">
                      <div className="review-stats">
                        <span className="helpful-count">
                          👍 {review.helpful} people found this helpful
                        </span>
                      </div>
                      <div className="review-actions">
                        <button 
                          className="action-btn secondary"
                          onClick={() => handleReply(review.id)}
                        >
                          Reply
                        </button>
                        <button className="action-btn secondary">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-reviews">
              <p>No reviews found.</p>
              {searchTerm || filterRating !== "all" ? (
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterRating("all");
                    setCurrentPage(1);
                  }}
                  className="clear-filters-btn"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
