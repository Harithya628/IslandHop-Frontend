import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Page.css";
import "./GuideDashboard.css";

// Mock data for tours - categorized by status
const mockTours = [
  // Upcoming Tours
  {
    id: "TOUR-001",
    title: "Sigiriya Rock Fortress & Cultural Tour",
    duration: "8 hours",
    price: "USD 85",
    participants: 4,
    maxParticipants: 8,
    date: "2025-06-28",
    status: "Upcoming",
    location: "Sigiriya, Central Province",
    description:
      "Explore the ancient rock fortress of Sigiriya and learn about Sri Lankan history and culture.",
  },
  {
    id: "TOUR-002",
    title: "Kandy Temple & Tea Plantation Experience",
    duration: "6 hours",
    price: "USD 65",
    participants: 6,
    maxParticipants: 10,
    date: "2025-06-30",
    status: "Upcoming",
    location: "Kandy, Central Province",
    description:
      "Visit the sacred Temple of the Tooth and experience authentic Sri Lankan tea plantation.",
  },
  {
    id: "TOUR-003",
    title: "Galle Fort Heritage Walk",
    duration: "4 hours",
    price: "USD 45",
    participants: 8,
    maxParticipants: 12,
    date: "2025-07-02",
    status: "Upcoming",
    location: "Galle, Southern Province",
    description:
      "Discover the colonial architecture and maritime history of UNESCO World Heritage Galle Fort.",
  },
  // Ongoing Tours
  {
    id: "TOUR-004",
    title: "Ella Nine Arches Bridge & Hiking Tour",
    duration: "5 hours",
    price: "USD 55",
    participants: 3,
    maxParticipants: 6,
    date: "2025-06-25",
    status: "Ongoing",
    location: "Ella, Uva Province",
    description:
      "Hike through tea plantations and visit the famous Nine Arches Bridge.",
  },
  // Past Tours
  {
    id: "TOUR-005",
    title: "Yala National Park Safari",
    duration: "8 hours",
    price: "USD 95",
    participants: 4,
    maxParticipants: 6,
    date: "2025-06-20",
    status: "Completed",
    location: "Yala, Southern Province",
    description:
      "Wildlife safari with leopard and elephant spotting opportunities.",
  },
  {
    id: "TOUR-006",
    title: "Colombo City & Shopping Tour",
    duration: "6 hours",
    price: "USD 50",
    participants: 5,
    maxParticipants: 8,
    date: "2025-06-18",
    status: "Completed",
    location: "Colombo, Western Province",
    description:
      "Explore the capital city, visit markets, and experience local culture.",
  },
  {
    id: "TOUR-007",
    title: "Nuwara Eliya Hill Country Tour",
    duration: "7 hours",
    price: "USD 70",
    participants: 6,
    maxParticipants: 10,
    date: "2025-06-15",
    status: "Completed",
    location: "Nuwara Eliya, Central Province",
    description:
      "Experience the cool climate and scenic beauty of Sri Lanka's hill country.",
  },
];

const MyTours = () => {
  const navigate = useNavigate();
  const [activeTourTab, setActiveTourTab] = useState("ongoing");
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage] = useState(6);
  const [tourFilters, setTourFilters] = useState({
    search: "",
    location: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleViewTourDetails = (tourId) => {
    navigate(`/guide/tour/${tourId}`);
  };

  // Filter tours based on current tab and filters
  const getFilteredTours = () => {
    let filteredTours = mockTours.filter((tour) => {
      if (activeTourTab === "ongoing") return tour.status === "Ongoing";
      if (activeTourTab === "upcoming") return tour.status === "Upcoming";
      if (activeTourTab === "past") return tour.status === "Completed";
      return true;
    });

    // Apply search and location filters
    if (tourFilters.search) {
      filteredTours = filteredTours.filter(
        (tour) =>
          tour.title.toLowerCase().includes(tourFilters.search.toLowerCase()) ||
          tour.location.toLowerCase().includes(tourFilters.search.toLowerCase())
      );
    }

    if (tourFilters.location) {
      filteredTours = filteredTours.filter((tour) =>
        tour.location.toLowerCase().includes(tourFilters.location.toLowerCase())
      );
    }

    return filteredTours;
  };

  const filteredTours = getFilteredTours();

  // Pagination
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (filterName, value) => {
    setTourFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1>My Tours</h1>
              <p>Manage and view all your tour activities</p>
            </div>
          </div>
        </div>

        {/* Tour Tabs */}
        <div className="tour-tabs">
          <button
            className={`tab-button ${
              activeTourTab === "ongoing" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTourTab("ongoing");
              setCurrentPage(1);
            }}
          >
            Ongoing Tours
          </button>
          <button
            className={`tab-button ${
              activeTourTab === "upcoming" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTourTab("upcoming");
              setCurrentPage(1);
            }}
          >
            Upcoming Tours
          </button>
          <button
            className={`tab-button ${activeTourTab === "past" ? "active" : ""}`}
            onClick={() => {
              setActiveTourTab("past");
              setCurrentPage(1);
            }}
          >
            Past Tours
          </button>
        </div>

        {/* Filters */}
        <div className="tour-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search tours..."
              value={tourFilters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <input
              type="text"
              placeholder="Filter by location..."
              value={tourFilters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <input
              type="date"
              placeholder="From date"
              value={tourFilters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <input
              type="date"
              placeholder="To date"
              value={tourFilters.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        {/* Tour Content */}
        <div className="tour-content">
          {filteredTours.length > 0 ? (
            <>
              <div className="tours-grid">
                {currentTours.map((tour) => (
                  <div
                    key={tour.id}
                    className={`tour-card ${tour.status.toLowerCase()}`}
                  >
                    <div className="tour-status">
                      <span
                        className={`status-badge ${tour.status.toLowerCase()}`}
                      >
                        {tour.status}
                      </span>
                    </div>
                    <h3>{tour.title}</h3>
                    <div className="tour-details">
                      <p>
                        <strong>Date:</strong> {tour.date}
                      </p>
                      <p>
                        <strong>Duration:</strong> {tour.duration}
                      </p>
                      <p>
                        <strong>Participants:</strong> {tour.participants}/
                        {tour.maxParticipants}
                      </p>
                      <p>
                        <strong>Location:</strong> {tour.location}
                      </p>
                      <p>
                        <strong>Price:</strong> {tour.price}
                      </p>
                    </div>
                    <p className="tour-description">{tour.description}</p>
                    <button
                      className="view-details-btn"
                      onClick={() => handleViewTourDetails(tour.id)}
                    >
                      View Details
                    </button>
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
                      className={`pagination-btn ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
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
            <div className="no-tours">
              <p>No {activeTourTab} tours found.</p>
              {tourFilters.search || tourFilters.location ? (
                <button
                  onClick={() => {
                    setTourFilters({
                      search: "",
                      location: "",
                      dateFrom: "",
                      dateTo: "",
                    });
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

export default MyTours;
