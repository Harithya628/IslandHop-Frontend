import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import './GuideDashboard.css';

// Mock data for tours - categorized by status
const mockTours = [
  // Upcoming Tours
  {
    id: 'TOUR-001',
    title: 'Sigiriya Rock Fortress & Cultural Tour',
    duration: '8 hours',
    price: 'USD 85',
    participants: 4,
    maxParticipants: 8,
    date: '2025-06-28',
    status: 'Upcoming',
    location: 'Sigiriya, Central Province',
    description: 'Explore the ancient rock fortress of Sigiriya and learn about Sri Lankan history and culture.',
  },
  {
    id: 'TOUR-002',
    title: 'Kandy Temple & Tea Plantation Experience',
    duration: '6 hours',
    price: 'USD 65',
    participants: 6,
    maxParticipants: 10,
    date: '2025-06-30',
    status: 'Upcoming',
    location: 'Kandy, Central Province',
    description: 'Visit the sacred Temple of the Tooth and experience authentic Sri Lankan tea plantation.',
  },
  {
    id: 'TOUR-003',
    title: 'Galle Fort Heritage Walk',
    duration: '4 hours',
    price: 'USD 45',
    participants: 8,
    maxParticipants: 12,
    date: '2025-07-02',
    status: 'Upcoming',
    location: 'Galle, Southern Province',
    description: 'Discover the colonial architecture and maritime history of UNESCO World Heritage Galle Fort.',
  },
  // Ongoing Tours
  {
    id: 'TOUR-004',
    title: 'Ella Nine Arches Bridge & Hiking Tour',
    duration: '5 hours',
    price: 'USD 55',
    participants: 3,
    maxParticipants: 6,
    date: '2025-06-25',
    status: 'Ongoing',
    location: 'Ella, Uva Province',
    description: 'Hike through tea plantations and visit the famous Nine Arches Bridge.',
  },
  // Past Tours
  {
    id: 'TOUR-005',
    title: 'Yala National Park Safari',
    duration: '8 hours',
    price: 'USD 95',
    participants: 4,
    maxParticipants: 6,
    date: '2025-06-20',
    status: 'Completed',
    location: 'Yala, Southern Province',
    description: 'Wildlife safari with leopard and elephant spotting opportunities.',
  },
  {
    id: 'TOUR-006',
    title: 'Colombo City & Shopping Tour',
    duration: '6 hours',
    price: 'USD 50',
    participants: 5,
    maxParticipants: 8,
    date: '2025-06-18',
    status: 'Completed',
    location: 'Colombo, Western Province',
    description: 'Explore the capital city, visit markets, and experience local culture.',
  },
  {
    id: 'TOUR-007',
    title: 'Nuwara Eliya Hill Country Tour',
    duration: '7 hours',
    price: 'USD 70',
    participants: 6,
    maxParticipants: 10,
    date: '2025-06-15',
    status: 'Completed',
    location: 'Nuwara Eliya, Central Province',
    description: 'Experience the cool climate and scenic beauty of Sri Lanka\'s hill country.',
  },
];

// Mock data for tour requests
const mockTourRequests = [
  {
    id: 'REQ-001',
    tourist: 'John Smith',
    tourTitle: 'Custom Wildlife Safari',
    requestedDate: '2025-07-05',
    participants: 2,
    budget: 'USD 120',
    message: 'We are interested in a personalized wildlife safari with elephant watching.',
    status: 'Pending',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'REQ-002',
    tourist: 'Emma Wilson',
    tourTitle: 'Photography Tour',
    requestedDate: '2025-07-08',
    participants: 1,
    budget: 'USD 80',
    message: 'Looking for a photography-focused tour of scenic locations around Ella.',
    status: 'Pending',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

// Mock data for chat messages
const mockChats = [
  {
    id: 'CHAT-001',
    tourist: 'Sarah Johnson',
    lastMessage: 'What time should we meet tomorrow?',
    lastMessageTime: '10:30 AM',
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    tour: 'Sigiriya Rock Fortress Tour',
  },
  {
    id: 'CHAT-002',
    tourist: 'Mike Chen',
    lastMessage: 'Thank you for the amazing tour!',
    lastMessageTime: 'Yesterday',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    tour: 'Kandy Temple Tour',
  },
];

// Mock data for reviews
const mockReviews = [
  {
    id: 'REV-001',
    tourist: 'Anna Rodriguez',
    rating: 5,
    review: 'Absolutely amazing experience! Our guide was knowledgeable and friendly. Highly recommend!',
    tour: 'Sigiriya Rock Fortress Tour',
    date: '2025-06-20',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: 'REV-002',
    tourist: 'David Kim',
    rating: 4,
    review: 'Great tour with beautiful scenery. The guide provided excellent insights into local culture.',
    tour: 'Kandy Temple Tour',
    date: '2025-06-18',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: 'REV-003',
    tourist: 'Lisa Thompson',
    rating: 5,
    review: 'Perfect day exploring Galle Fort. Professional guide and well-organized tour.',
    tour: 'Galle Fort Heritage Walk',
    date: '2025-06-15',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
];

const GuideDashboard = () => {
  const [activeTab, setActiveTab] = useState('tours');
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  // Handler functions
  const handleRequestAction = (requestId, action) => {
    alert(`${action} request ${requestId}`);
    setSelectedRequest(null);
  };

  const handleChatOpen = (chat) => {
    setSelectedChat(chat);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };
  return (    <>
      <Navbar />
      <div className="guide-dashboard">
      {/* Navigation Tabs */}
      <div className="guide-tabs"><button
          className={`tab ${activeTab === 'tours' ? 'active' : ''}`}
          onClick={() => setActiveTab('tours')}
        >
          <span className="icon-clipboard"></span> My Tours
        </button>
        <button
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <span className="icon-target"></span> Tour Requests
        </button>
        <button
          className={`tab ${activeTab === 'chats' ? 'active' : ''}`}
          onClick={() => setActiveTab('chats')}
        >
          <span className="icon-chat"></span> Chats
        </button>
        <button
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <span className="icon-star"></span> Reviews
        </button>
      </div>

      {/* Content Area */}
      <div className="guide-content">        {/* My Tours Tab */}
        {activeTab === 'tours' && (
          <div className="tours-section">
            <h2>My Tours</h2>
            
            {/* Upcoming Tours */}
            <div className="tour-category">
              <h3 className="category-title">
                <span className="icon-upcoming"></span> Upcoming Tours
              </h3>
              <div className="tours-grid">
                {mockTours.filter(tour => tour.status === 'Upcoming').map((tour) => (
                  <div key={tour.id} className="tour-card">
                    <div className="tour-header">
                      <h3>{tour.title}</h3>
                      <span className={`tour-status ${tour.status.toLowerCase().replace(' ', '-')}`}>
                        {tour.status}
                      </span>
                    </div>
                    <div className="tour-details">
                      <p className="tour-location"><span className="icon-location"></span> {tour.location}</p>
                      <p className="tour-date"><span className="icon-calendar"></span> {tour.date}</p>
                      <p className="tour-duration"><span className="icon-clock"></span> {tour.duration}</p>
                      <p className="tour-price"><span className="icon-money"></span> {tour.price}</p>
                      <p className="tour-participants">
                        <span className="icon-users"></span> {tour.participants}/{tour.maxParticipants} participants
                      </p>
                    </div>
                    <p className="tour-description">{tour.description}</p>
                    <div className="tour-actions">
                      <button className="btn-edit">Edit Tour</button>
                      <button className="btn-view">View Details</button>
                      <button className="btn-cancel">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Tours */}
            <div className="tour-category">
              <h3 className="category-title">
                <span className="icon-ongoing"></span> Ongoing Tours
              </h3>
              <div className="tours-grid">
                {mockTours.filter(tour => tour.status === 'Ongoing').map((tour) => (
                  <div key={tour.id} className="tour-card ongoing">
                    <div className="tour-header">
                      <h3>{tour.title}</h3>
                      <span className={`tour-status ${tour.status.toLowerCase().replace(' ', '-')}`}>
                        {tour.status}
                      </span>
                    </div>
                    <div className="tour-details">
                      <p className="tour-location"><span className="icon-location"></span> {tour.location}</p>
                      <p className="tour-date"><span className="icon-calendar"></span> {tour.date}</p>
                      <p className="tour-duration"><span className="icon-clock"></span> {tour.duration}</p>
                      <p className="tour-price"><span className="icon-money"></span> {tour.price}</p>
                      <p className="tour-participants">
                        <span className="icon-users"></span> {tour.participants}/{tour.maxParticipants} participants
                      </p>
                    </div>
                    <p className="tour-description">{tour.description}</p>
                    <div className="tour-actions">
                      <button className="btn-live">Live Updates</button>
                      <button className="btn-contact">Contact Tourists</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Tours */}
            <div className="tour-category">
              <h3 className="category-title">
                <span className="icon-past"></span> Past Tours
              </h3>
              <div className="tours-grid">
                {mockTours.filter(tour => tour.status === 'Completed').map((tour) => (
                  <div key={tour.id} className="tour-card completed">
                    <div className="tour-header">
                      <h3>{tour.title}</h3>
                      <span className={`tour-status ${tour.status.toLowerCase().replace(' ', '-')}`}>
                        {tour.status}
                      </span>
                    </div>
                    <div className="tour-details">
                      <p className="tour-location"><span className="icon-location"></span> {tour.location}</p>
                      <p className="tour-date"><span className="icon-calendar"></span> {tour.date}</p>
                      <p className="tour-duration"><span className="icon-clock"></span> {tour.duration}</p>
                      <p className="tour-price"><span className="icon-money"></span> {tour.price}</p>
                      <p className="tour-participants">
                        <span className="icon-users"></span> {tour.participants}/{tour.maxParticipants} participants
                      </p>
                    </div>
                    <p className="tour-description">{tour.description}</p>
                    <div className="tour-actions">
                      <button className="btn-review">View Reviews</button>
                      <button className="btn-report">Download Report</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tour Requests Tab */}
        {activeTab === 'requests' && (
          <div className="requests-section">
            <h2>Tour Requests</h2>
            <div className="requests-list">
              {mockTourRequests.map((request) => (
                <div key={request.id} className="request-card">
                  <div className="request-header">
                    <div className="tourist-info">
                      <img src={request.avatar} alt={request.tourist} className="tourist-avatar" />
                      <div>
                        <h3>{request.tourist}</h3>
                        <p className="request-tour-title">{request.tourTitle}</p>
                      </div>
                    </div>
                    <span className="request-status pending">Pending</span>
                  </div>
                  <div className="request-details">
                    <p><strong>Date:</strong> {request.requestedDate}</p>
                    <p><strong>Participants:</strong> {request.participants}</p>
                    <p><strong>Budget:</strong> {request.budget}</p>
                    <p><strong>Message:</strong> {request.message}</p>
                  </div>
                  <div className="request-actions">
                    <button
                      className="btn-accept"
                      onClick={() => handleRequestAction(request.id, 'Accept')}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-decline"
                      onClick={() => handleRequestAction(request.id, 'Decline')}
                    >
                      Decline
                    </button>
                    <button
                      className="btn-negotiate"
                      onClick={() => setSelectedRequest(request)}
                    >
                      Negotiate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chats Tab */}
        {activeTab === 'chats' && (
          <div className="chats-section">
            <h2>Chat with Tourists</h2>
            <div className="chats-list">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  className="chat-card"
                  onClick={() => handleChatOpen(chat)}
                >
                  <div className="chat-avatar">
                    <img src={chat.avatar} alt={chat.tourist} />
                    {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                  </div>
                  <div className="chat-info">
                    <h3>{chat.tourist}</h3>
                    <p className="chat-tour">{chat.tour}</p>
                    <p className="chat-last-message">{chat.lastMessage}</p>
                  </div>
                  <div className="chat-meta">
                    <span className="chat-time">{chat.lastMessageTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <div className="reviews-summary">
              <div className="rating-overview">
                <div className="average-rating">
                  <span className="rating-number">4.8</span>
                  <div className="rating-stars">
                    {renderStars(5)}
                  </div>
                  <span className="total-reviews">Based on 24 reviews</span>
                </div>
              </div>
            </div>
            <div className="reviews-list">
              {mockReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <img src={review.avatar} alt={review.tourist} className="reviewer-avatar" />
                      <div>
                        <h3>{review.tourist}</h3>
                        <p className="review-tour">{review.tour}</p>
                        <p className="review-date">{review.date}</p>
                      </div>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="review-text">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Negotiate Modal */}
      {selectedRequest && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Negotiate with {selectedRequest.tourist}</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedRequest(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <p><strong>Original Request:</strong></p>
              <p>Tour: {selectedRequest.tourTitle}</p>
              <p>Date: {selectedRequest.requestedDate}</p>
              <p>Budget: {selectedRequest.budget}</p>
              <p>Message: {selectedRequest.message}</p>
              
              <div className="negotiate-form">
                <label>Counter Offer:</label>
                <textarea
                  placeholder="Propose your terms, pricing, or suggest alternative dates..."
                  rows="4"
                ></textarea>
                <div className="modal-actions">
                  <button className="btn-send">Send Counter Offer</button>
                  <button
                    className="btn-cancel"
                    onClick={() => setSelectedRequest(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {selectedChat && (
        <div className="modal-overlay">
          <div className="modal chat-modal">
            <div className="modal-header">
              <h3>Chat with {selectedChat.tourist}</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedChat(null)}
              >
                ×
              </button>
            </div>
            <div className="chat-window">
              <div className="chat-messages">
                <div className="message tourist-message">
                  <p>Hi! I'm looking forward to the tour tomorrow.</p>
                  <span className="message-time">9:30 AM</span>
                </div>
                <div className="message guide-message">
                  <p>Hello! Yes, I'm excited too. We'll meet at the entrance at 8:00 AM.</p>
                  <span className="message-time">9:45 AM</span>
                </div>
                <div className="message tourist-message">
                  <p>{selectedChat.lastMessage}</p>
                  <span className="message-time">{selectedChat.lastMessageTime}</span>
                </div>
              </div>
              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="chat-input"
                />
                <button className="send-btn">Send</button>
              </div>
            </div>
          </div>
        </div>        )}
      </div>
    </>
  );
};

export default GuideDashboard;
