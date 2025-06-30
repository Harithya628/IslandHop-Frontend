import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Phone, 
  DollarSign, 
  Navigation,
  Check,
  X,
  Users,
  MessageCircle,
  Package
} from 'lucide-react';
import styles from './RideRequests.module.css';

const RideRequests = () => {
  const [rideRequests, setRideRequests] = useState([
    {
      id: 1,
      passengerName: 'John Smith',
      passengerPhone: '+94 77 123 4567',
      pickupLocation: 'Colombo Fort Railway Station',
      dropoffLocation: 'Bandaranaike International Airport',
      requestTime: '2025-06-29T10:30:00',
      tripDate: '2025-06-29',
      tripTime: '14:00',
      estimatedFare: 3500.00,
      distance: '35 km',
      duration: '45 mins',
      passengerCount: 2,
      luggage: 'Medium (2 bags)',
      specialRequests: 'Air conditioning preferred',
      status: 'pending'
    },
    {
      id: 2,
      passengerName: 'Sarah Wilson',
      passengerPhone: '+94 71 987 6543',
      pickupLocation: 'Galle Face Green',
      dropoffLocation: 'Mount Lavinia Beach',
      requestTime: '2025-06-29T11:15:00',
      tripDate: '2025-06-29',
      tripTime: '16:30',
      estimatedFare: 1200.00,
      distance: '12 km',
      duration: '25 mins',
      passengerCount: 1,
      luggage: 'Light (1 bag)',
      specialRequests: 'None',
      status: 'pending'
    },
    {
      id: 3,
      passengerName: 'Michael Brown',
      passengerPhone: '+94 76 555 7890',
      pickupLocation: 'Kandy City Center',
      dropoffLocation: 'Temple of the Tooth',
      requestTime: '2025-06-29T09:45:00',
      tripDate: '2025-06-30',
      tripTime: '09:00',
      estimatedFare: 800.00,
      distance: '8 km',
      duration: '15 mins',
      passengerCount: 3,
      luggage: 'Light',
      specialRequests: 'Child seat required',
      status: 'pending'
    },
    {
      id: 4,
      passengerName: 'Emma Davis',
      passengerPhone: '+94 77 234 5678',
      pickupLocation: 'Negombo Beach Resort',
      dropoffLocation: 'Colombo Shopping Mall',
      requestTime: '2025-06-29T12:00:00',
      tripDate: '2025-06-29',
      tripTime: '18:00',
      estimatedFare: 2200.00,
      distance: '28 km',
      duration: '40 mins',
      passengerCount: 2,
      luggage: 'Heavy (4 bags)',
      specialRequests: 'Help with luggage',
      status: 'pending'
    }
  ]);

  const handleAcceptRequest = (requestId) => {
    setRideRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'accepted' }
          : request
      )
    );
    // Here you would typically make an API call to accept the ride
    console.log(`Accepted ride request ${requestId}`);
  };

  const handleDeclineRequest = (requestId) => {
    setRideRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'declined' }
          : request
      )
    );
    // Here you would typically make an API call to decline the ride
    console.log(`Declined ride request ${requestId}`);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toFixed(2)}`;
  };

  const pendingRequests = rideRequests.filter(request => request.status === 'pending');
  const processedRequests = rideRequests.filter(request => request.status !== 'pending');

  return (
    <div className={styles.rideRequestsPage}>
      <div className={styles.pageHeader}>
        <h1>Ride Requests</h1>
        <p>Manage incoming ride requests from passengers</p>
      </div>
      
      <div className={styles.pageContent}>
        {/* Pending Requests Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Pending Requests ({pendingRequests.length})</h2>
            <div className={styles.requestCounter}>
              {pendingRequests.length} new requests
            </div>
          </div>
          
          {pendingRequests.length === 0 ? (
            <div className={styles.noRequests}>
              <p>No pending ride requests at the moment.</p>
            </div>
          ) : (
            <div className={styles.requestsList}>
              {pendingRequests.map(request => (
                <div key={request.id} className={styles.requestCard}>
                  <div className={styles.requestHeader}>
                    <div className={styles.passengerInfo}>
                      <div className={styles.passengerName}>
                        <User className={styles.icon} />
                        <span>{request.passengerName}</span>
                      </div>
                      <div className={styles.passengerContact}>
                        <Phone className={styles.icon} />
                        <span>{request.passengerPhone}</span>
                      </div>
                    </div>
                    <div className={styles.requestTime}>
                      Requested: {formatDateTime(request.requestTime)}
                    </div>
                  </div>

                  <div className={styles.tripDetails}>
                    <div className={styles.locationInfo}>
                      <div className={styles.location}>
                        <div className={styles.locationPin}>
                          <MapPin className={styles.pickupIcon} />
                        </div>
                        <div className={styles.locationText}>
                          <span className={styles.locationLabel}>Pickup</span>
                          <span className={styles.locationAddress}>{request.pickupLocation}</span>
                        </div>
                      </div>
                      <div className={styles.routeLine}></div>
                      <div className={styles.location}>
                        <div className={styles.locationPin}>
                          <Navigation className={styles.dropoffIcon} />
                        </div>
                        <div className={styles.locationText}>
                          <span className={styles.locationLabel}>Drop-off</span>
                          <span className={styles.locationAddress}>{request.dropoffLocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.tripInfo}>
                      <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                          <Calendar className={styles.icon} />
                          <div className={styles.infoText}>
                            <span className={styles.infoLabel}>Date</span>
                            <span className={styles.infoValue}>{formatDate(request.tripDate)}</span>
                          </div>
                        </div>
                        <div className={styles.infoItem}>
                          <Clock className={styles.icon} />
                          <div className={styles.infoText}>
                            <span className={styles.infoLabel}>Time</span>
                            <span className={styles.infoValue}>{request.tripTime}</span>
                          </div>
                        </div>
                        <div className={styles.infoItem}>
                          <Navigation className={styles.icon} />
                          <div className={styles.infoText}>
                            <span className={styles.infoLabel}>Distance</span>
                            <span className={styles.infoValue}>{request.distance}</span>
                          </div>
                        </div>
                        <div className={styles.infoItem}>
                          <Clock className={styles.icon} />
                          <div className={styles.infoText}>
                            <span className={styles.infoLabel}>Duration</span>
                            <span className={styles.infoValue}>{request.duration}</span>
                          </div>
                        </div>
                        <div className={styles.infoItem}>
                          <Users className={styles.icon} />
                          <div className={styles.infoText}>
                            <span className={styles.infoLabel}>Passengers</span>
                            <span className={styles.infoValue}>{request.passengerCount} person{request.passengerCount > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        <div className={styles.infoItem}>
                          <Package className={styles.icon} />
                          <div className={styles.infoText}>
                            <span className={styles.infoLabel}>Luggage</span>
                            <span className={styles.infoValue}>{request.luggage}</span>
                          </div>
                        </div>
                        <div className={styles.infoItem}>
                          <DollarSign className={styles.icon} />
                          <div className={styles.infoText}>
                            <span className={styles.infoLabel}>Fare</span>
                            <span className={styles.infoValue}>{formatCurrency(request.estimatedFare)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {request.specialRequests && request.specialRequests !== 'None' && (
                      <div className={styles.specialRequests}>
                        <MessageCircle className={styles.icon} />
                        <span>Special Request: {request.specialRequests}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.requestActions}>
                    <button 
                      className={styles.declineButton}
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      <X className={styles.buttonIcon} />
                      Decline
                    </button>
                    <button 
                      className={styles.acceptButton}
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      <Check className={styles.buttonIcon} />
                      Accept Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Processed Requests Section */}
        {processedRequests.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Recent Activity</h2>
            </div>
            
            <div className={styles.processedList}>
              {processedRequests.map(request => (
                <div key={request.id} className={`${styles.processedCard} ${styles[request.status]}`}>
                  <div className={styles.processedInfo}>
                    <span className={styles.passengerName}>{request.passengerName}</span>
                    <span className={styles.tripRoute}>
                      {request.pickupLocation} → {request.dropoffLocation}
                    </span>
                  </div>
                  <div className={`${styles.processedStatus} ${styles[request.status]}`}>
                    {request.status === 'accepted' ? 'Accepted' : 'Declined'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideRequests;
