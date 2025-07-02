import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Car, 
  Navigation,
  CheckCircle,
  AlertCircle,
  Play,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './TripsOverview.css';

const TripsOverview = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API calls
  const [trips, setTrips] = useState({
    ongoing: [
      {
        id: 'T001',
        title: 'Cultural Heritage Tour',
        destination: 'Kandy, Sri Lanka',
        startDate: '2025-07-01',
        endDate: '2025-07-05',
        status: 'in-progress',
        progress: 60,
        currentLocation: 'Temple of the Sacred Tooth Relic',
        driver: 'Samantha Perera',
        guide: 'Raj Kumar',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        participants: 4,
        totalCost: 'USD 450',
        nextActivity: 'Royal Botanical Gardens',
        nextActivityTime: '2:00 PM'
      }
    ],
    upcoming: [
      {
        id: 'T002',
        title: 'Beach Paradise Getaway',
        destination: 'Mirissa, Sri Lanka',
        startDate: '2025-07-15',
        endDate: '2025-07-20',
        status: 'confirmed',
        driver: 'Nimal Fernando',
        guide: 'Priya Jayawardena',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        participants: 2,
        totalCost: 'USD 320',
        daysUntil: 13
      },
      {
        id: 'T003',
        title: 'Mountain Adventure',
        destination: 'Ella, Sri Lanka',
        startDate: '2025-08-01',
        endDate: '2025-08-07',
        status: 'pending-confirmation',
        driver: 'Pending Assignment',
        guide: 'Mahesh Silva',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        participants: 3,
        totalCost: 'USD 280',
        daysUntil: 30
      }
    ],
    history: [
      {
        id: 'T004',
        title: 'Colombo City Explorer',
        destination: 'Colombo, Sri Lanka',
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        status: 'completed',
        driver: 'Kamal Wickramasinghe',
        guide: 'Anura Bandara',
        image: 'https://images.unsplash.com/photo-1577640467787-a5de9dfbf9d8?w=400&h=300&fit=crop',
        participants: 2,
        totalCost: 'USD 200',
        rating: 4.8,
        completedDate: '2025-06-05'
      },
      {
        id: 'T005',
        title: 'Safari Adventure',
        destination: 'Yala National Park',
        startDate: '2025-05-15',
        endDate: '2025-05-18',
        status: 'completed',
        driver: 'Ruwan Perera',
        guide: 'Chaminda Rathnayake',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop',
        participants: 4,
        totalCost: 'USD 380',
        rating: 4.9,
        completedDate: '2025-05-18'
      },
      {
        id: 'T006',
        title: 'Ancient Cities Tour',
        destination: 'Anuradhapura & Polonnaruwa',
        startDate: '2025-04-10',
        endDate: '2025-04-14',
        status: 'cancelled',
        driver: 'N/A',
        guide: 'N/A',
        image: 'https://images.unsplash.com/photo-1578915629189-dee2b4c3bc7e?w=400&h=300&fit=crop',
        participants: 3,
        totalCost: 'USD 0',
        cancelledDate: '2025-04-08',
        cancellationReason: 'Weather conditions'
      }
    ]
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-progress':
        return <Play className="status-icon in-progress" />;
      case 'confirmed':
        return <CheckCircle className="status-icon confirmed" />;
      case 'pending-confirmation':
        return <Clock className="status-icon pending" />;
      case 'completed':
        return <CheckCircle className="status-icon completed" />;
      case 'cancelled':
        return <AlertCircle className="status-icon cancelled" />;
      default:
        return <Clock className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'confirmed':
        return 'Confirmed';
      case 'pending-confirmation':
        return 'Pending Confirmation';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFilteredTrips = (tripList) => {
    return tripList.filter(trip => {
      const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || trip.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  };

  const renderOngoingTrip = (trip) => (
    <div key={trip.id} className="trip-card ongoing-trip">
      <div className="trip-image-container">
        <img src={trip.image} alt={trip.title} className="trip-image" />
        <div className="progress-overlay">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${trip.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{trip.progress}% Complete</span>
        </div>
      </div>
      
      <div className="trip-content">
        <div className="trip-header">
          <h3 className="trip-title">{trip.title}</h3>
          <div className="trip-status">
            {getStatusIcon(trip.status)}
            <span>{getStatusText(trip.status)}</span>
          </div>
        </div>
        
        <div className="trip-details">
          <div className="detail-item">
            <MapPin className="detail-icon" />
            <span>{trip.destination}</span>
          </div>
          <div className="detail-item">
            <Calendar className="detail-icon" />
            <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
          </div>
          <div className="detail-item">
            <Navigation className="detail-icon" />
            <span>Currently at: {trip.currentLocation}</span>
          </div>
        </div>
        
        <div className="service-providers">
          <div className="provider-item">
            <Car className="provider-icon" />
            <span>Driver: {trip.driver}</span>
          </div>
          <div className="provider-item">
            <User className="provider-icon" />
            <span>Guide: {trip.guide}</span>
          </div>
        </div>
        
        <div className="next-activity">
          <h4>Next Activity</h4>
          <div className="activity-info">
            <span className="activity-name">{trip.nextActivity}</span>
            <span className="activity-time">{trip.nextActivityTime}</span>
          </div>
        </div>
        
        <div className="trip-actions">
          <button className="action-btn primary">View Details</button>
          <button className="action-btn secondary">Contact Guide</button>
        </div>
      </div>
    </div>
  );

  const renderUpcomingTrip = (trip) => (
    <div key={trip.id} className="trip-card upcoming-trip">
      <div className="trip-image-container">
        <img src={trip.image} alt={trip.title} className="trip-image" />
        <div className="days-until">
          <span>{trip.daysUntil} days</span>
        </div>
      </div>
      
      <div className="trip-content">
        <div className="trip-header">
          <h3 className="trip-title">{trip.title}</h3>
          <div className="trip-status">
            {getStatusIcon(trip.status)}
            <span>{getStatusText(trip.status)}</span>
          </div>
        </div>
        
        <div className="trip-details">
          <div className="detail-item">
            <MapPin className="detail-icon" />
            <span>{trip.destination}</span>
          </div>
          <div className="detail-item">
            <Calendar className="detail-icon" />
            <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
          </div>
          <div className="detail-item">
            <User className="detail-icon" />
            <span>{trip.participants} participants</span>
          </div>
        </div>
        
        <div className="service-providers">
          <div className="provider-item">
            <Car className="provider-icon" />
            <span>Driver: {trip.driver}</span>
          </div>
          <div className="provider-item">
            <User className="provider-icon" />
            <span>Guide: {trip.guide}</span>
          </div>
        </div>
        
        <div className="trip-cost">
          <span className="cost-label">Total Cost:</span>
          <span className="cost-amount">{trip.totalCost}</span>
        </div>
        
        <div className="trip-actions">
          <button className="action-btn primary">View Itinerary</button>
          <button className="action-btn secondary">Modify Trip</button>
        </div>
      </div>
    </div>
  );

  const renderHistoryTrip = (trip) => (
    <div key={trip.id} className="trip-card history-trip">
      <div className="trip-image-container">
        <img src={trip.image} alt={trip.title} className="trip-image" />
        {trip.status === 'completed' && trip.rating && (
          <div className="rating-badge">
            <span>★ {trip.rating}</span>
          </div>
        )}
        {trip.status === 'cancelled' && (
          <div className="cancelled-badge">
            <span>Cancelled</span>
          </div>
        )}
      </div>
      
      <div className="trip-content">
        <div className="trip-header">
          <h3 className="trip-title">{trip.title}</h3>
          <div className="trip-status">
            {getStatusIcon(trip.status)}
            <span>{getStatusText(trip.status)}</span>
          </div>
        </div>
        
        <div className="trip-details">
          <div className="detail-item">
            <MapPin className="detail-icon" />
            <span>{trip.destination}</span>
          </div>
          <div className="detail-item">
            <Calendar className="detail-icon" />
            <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
          </div>
          {trip.status === 'completed' && (
            <div className="detail-item">
              <CheckCircle className="detail-icon" />
              <span>Completed on {formatDate(trip.completedDate)}</span>
            </div>
          )}
          {trip.status === 'cancelled' && (
            <div className="detail-item">
              <AlertCircle className="detail-icon" />
              <span>Reason: {trip.cancellationReason}</span>
            </div>
          )}
        </div>
        
        {trip.status === 'completed' && (
          <div className="service-providers">
            <div className="provider-item">
              <Car className="provider-icon" />
              <span>Driver: {trip.driver}</span>
            </div>
            <div className="provider-item">
              <User className="provider-icon" />
              <span>Guide: {trip.guide}</span>
            </div>
          </div>
        )}
        
        <div className="trip-cost">
          <span className="cost-label">Total Cost:</span>
          <span className="cost-amount">{trip.totalCost}</span>
        </div>
        
        <div className="trip-actions">
          {trip.status === 'completed' ? (
            <>
              <button className="action-btn primary">View Photos</button>
              <button className="action-btn secondary">Write Review</button>
            </>
          ) : (
            <button className="action-btn primary">View Details</button>
          )}
        </div>
      </div>
    </div>
  );

  const renderSimplifiedUpcomingTrip = (trip) => (
    <div key={trip.id} className="trip-card upcoming-trip">
      <div className="trip-image-container">
        <img src={trip.image} alt={trip.title} className="trip-image" />
        <div className="days-until">
          <span>{trip.daysUntil} days</span>
        </div>
      </div>
      
      <div className="trip-content">
        <div className="trip-header">
          <h3 className="trip-title">{trip.title}</h3>
          <div className="trip-status">
            {getStatusIcon(trip.status)}
          </div>
        </div>
        
        <div className="trip-details">
          <div className="detail-item">
            <MapPin className="detail-icon" />
            <span>{trip.destination}</span>
          </div>
          <div className="detail-item">
            <Calendar className="detail-icon" />
            <span>{formatDate(trip.startDate)}</span>
          </div>
        </div>
        
        <div className="trip-cost">
          <span className="cost-amount">{trip.totalCost}</span>
        </div>
      </div>
    </div>
  );

  const renderSimplifiedHistoryTrip = (trip) => (
    <div key={trip.id} className="trip-card history-trip">
      <div className="trip-image-container">
        <img src={trip.image} alt={trip.title} className="trip-image" />
        {trip.status === 'completed' && trip.rating && (
          <div className="rating-badge">
            <span>★ {trip.rating}</span>
          </div>
        )}
        {trip.status === 'cancelled' && (
          <div className="cancelled-badge">
            <span>Cancelled</span>
          </div>
        )}
      </div>
      
      <div className="trip-content">
        <div className="trip-header">
          <h3 className="trip-title">{trip.title}</h3>
          <div className="trip-status">
            {getStatusIcon(trip.status)}
          </div>
        </div>
        
        <div className="trip-details">
          <div className="detail-item">
            <MapPin className="detail-icon" />
            <span>{trip.destination}</span>
          </div>
          <div className="detail-item">
            <Calendar className="detail-icon" />
            <span>{formatDate(trip.startDate)}</span>
          </div>
        </div>
        
        <div className="trip-cost">
          <span className="cost-amount">{trip.totalCost}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="trips-overview-page">
      <Navbar />
      
      <div className="trips-overview-container">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Your Adventure Journey</h1>
          </div>
        </div>
        
        <p className="page-description">
          Discover, plan, and relive your amazing travel experiences
        </p>
        
        <div className="page-action">
          <button 
            className="plan-new-trip-btn"
            onClick={() => navigate('/plan-trip')}
          >
            <Plus className="btn-icon" />
            Plan New Trip
          </button>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-filter">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search trips by destination or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="status-filter">
            <Filter className="filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending-confirmation">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Trips Content - All sections in vertical layout */}
        <div className="trips-content">
          {/* Ongoing Trips Section */}
          {trips.ongoing.length > 0 && (
            <div className="trips-section">
              <div className="section-header">
                <Play className="section-icon" />
                <div>
                  <h2 className="section-title">Current Trip</h2>
                  <p className="section-subtitle">Your active adventure</p>
                </div>
              </div>
              <div className="trips-grid ongoing-grid">
                {getFilteredTrips(trips.ongoing).map(trip => renderOngoingTrip(trip))}
              </div>
            </div>
          )}

          {/* Upcoming Trips Section */}
          <div className="trips-section">
            <div className="section-header">
              <Calendar className="section-icon" />
              <div>
                <h2 className="section-title">Upcoming Trips</h2>
                <p className="section-subtitle">Your planned adventures</p>
              </div>
              <span className="section-count">{trips.upcoming.length}</span>
            </div>
            {getFilteredTrips(trips.upcoming).length > 0 ? (
              <div className="trips-grid upcoming-grid">
                {getFilteredTrips(trips.upcoming).map(trip => renderSimplifiedUpcomingTrip(trip))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <Calendar size={48} />
                </div>
                <h3 className="empty-title">No upcoming trips</h3>
                <p className="empty-subtitle">Plan your next adventure!</p>
                <button 
                  className="empty-action-btn"
                  onClick={() => navigate('/plan-trip')}
                >
                  Plan Your Next Trip
                </button>
              </div>
            )}
          </div>

          {/* History Trips Section */}
          <div className="trips-section">
            <div className="section-header">
              <CheckCircle className="section-icon" />
              <div>
                <h2 className="section-title">Trip History</h2>
                <p className="section-subtitle">Your past adventures</p>
              </div>
              <span className="section-count">{trips.history.length}</span>
            </div>
            {getFilteredTrips(trips.history).length > 0 ? (
              <div className="trips-grid history-grid">
                {getFilteredTrips(trips.history).map(trip => renderSimplifiedHistoryTrip(trip))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <CheckCircle size={48} />
                </div>
                <h3 className="empty-title">No trip history</h3>
                <p className="empty-subtitle">Your completed trips will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TripsOverview;
