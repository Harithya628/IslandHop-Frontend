import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Phone, 
  DollarSign, 
  Navigation,
  MessageCircle,
  Users,
  Car,
  CheckCircle,
  PlayCircle,
  Flag,
  MapIcon
} from 'lucide-react';
import styles from './Rides.module.css';

const Rides = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [rides, setRides] = useState([
    {
      id: 1,
      passengerName: 'John Smith',
      passengerPhone: '+94 77 123 4567',
      pickupLocation: 'Colombo Fort Railway Station',
      dropoffLocation: 'Bandaranaike International Airport',
      tripDate: '2025-06-29',
      tripTime: '14:00',
      acceptedAt: '2025-06-29T10:45:00',
      estimatedFare: 3500.00,
      distance: '35 km',
      duration: '45 mins',
      passengerCount: 2,
      luggage: 'Medium (2 bags)',
      specialRequests: 'Air conditioning preferred',
      status: 'active', // active, en-route, completed, scheduled
      progress: 'pickup', // pickup, en-route, arrived
      startTime: '2025-06-29T13:45:00',
      estimatedArrival: '2025-06-29T14:30:00'
    },
    {
      id: 2,
      passengerName: 'Sarah Wilson',
      passengerPhone: '+94 71 987 6543',
      pickupLocation: 'Galle Face Green',
      dropoffLocation: 'Mount Lavinia Beach',
      tripDate: '2025-06-29',
      tripTime: '16:30',
      acceptedAt: '2025-06-29T11:20:00',
      estimatedFare: 1200.00,
      distance: '12 km',
      duration: '25 mins',
      passengerCount: 1,
      luggage: 'Light (1 bag)',
      specialRequests: 'None',
      status: 'scheduled',
      progress: 'scheduled',
      startTime: null,
      estimatedArrival: '2025-06-29T17:00:00'
    },
    {
      id: 3,
      passengerName: 'Michael Brown',
      passengerPhone: '+94 76 555 7890',
      pickupLocation: 'Kandy City Center',
      dropoffLocation: 'Temple of the Tooth',
      tripDate: '2025-06-30',
      tripTime: '09:00',
      acceptedAt: '2025-06-29T09:50:00',
      estimatedFare: 800.00,
      distance: '8 km',
      duration: '15 mins',
      passengerCount: 3,
      luggage: 'Light',
      specialRequests: 'Child seat required',
      status: 'scheduled',
      progress: 'scheduled',
      startTime: null,
      estimatedArrival: '2025-06-30T09:15:00'
    },
    {
      id: 4,
      passengerName: 'Emma Davis',
      passengerPhone: '+94 77 234 5678',
      pickupLocation: 'Negombo Beach Resort',
      dropoffLocation: 'Colombo Shopping Mall',
      tripDate: '2025-06-28',
      tripTime: '18:00',
      acceptedAt: '2025-06-28T17:30:00',
      estimatedFare: 2200.00,
      distance: '28 km',
      duration: '40 mins',
      passengerCount: 2,
      luggage: 'Heavy (4 bags)',
      specialRequests: 'Help with luggage',
      status: 'completed',
      progress: 'completed',
      startTime: '2025-06-28T17:45:00',
      completedAt: '2025-06-28T18:25:00'
    }
  ]);

  const handleStartRide = (rideId) => {
    setRides(prev => 
      prev.map(ride => 
        ride.id === rideId 
          ? { 
              ...ride, 
              status: 'active', 
              progress: 'pickup',
              startTime: new Date().toISOString()
            }
          : ride
      )
    );
    console.log(`Started ride ${rideId}`);
  };

  const handleCompleteRide = (rideId) => {
    setRides(prev => 
      prev.map(ride => 
        ride.id === rideId 
          ? { 
              ...ride, 
              status: 'completed', 
              progress: 'completed',
              completedAt: new Date().toISOString()
            }
          : ride
      )
    );
    console.log(`Completed ride ${rideId}`);
  };

  const handleOpenChat = (ride) => {
    // Here you would navigate to chat interface or open a chat modal
    console.log(`Opening chat with ${ride.passengerName}`);
    // For now, we'll simulate opening a chat
    alert(`Opening chat with ${ride.passengerName} (${ride.passengerPhone})`);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Not set';
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#3b82f6';
      case 'completed': return '#666666';
      case 'scheduled': return '#000000';
      default: return '#cccccc';
    }
  };

  const activeRides = rides.filter(ride => ride.status === 'active');
  const scheduledRides = rides.filter(ride => ride.status === 'scheduled');
  const completedRides = rides.filter(ride => ride.status === 'completed');

  const renderRideCard = (ride) => (
    <div key={ride.id} className={styles.rideCard}>
      <div className={styles.rideHeader}>
        <div className={styles.passengerInfo}>
          <div className={styles.passengerName}>
            <User className={styles.icon} />
            <span>{ride.passengerName}</span>
          </div>
          <div className={styles.passengerContact}>
            <Phone className={styles.icon} />
            <span>{ride.passengerPhone}</span>
          </div>
        </div>
        <div className={styles.rideStatus}>
          <div 
            className={styles.statusBadge} 
            style={{ backgroundColor: getStatusColor(ride.status) }}
          >
            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
          </div>
          <div className={styles.acceptedTime}>
            Accepted: {formatDateTime(ride.acceptedAt)}
          </div>
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
              <span className={styles.locationAddress}>{ride.pickupLocation}</span>
            </div>
          </div>
          <div className={styles.routeLine}></div>
          <div className={styles.location}>
            <div className={styles.locationPin}>
              <Navigation className={styles.dropoffIcon} />
            </div>
            <div className={styles.locationText}>
              <span className={styles.locationLabel}>Drop-off</span>
              <span className={styles.locationAddress}>{ride.dropoffLocation}</span>
            </div>
          </div>
        </div>

        <div className={styles.tripInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Calendar className={styles.icon} />
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Date</span>
                <span className={styles.infoValue}>{formatDate(ride.tripDate)}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Clock className={styles.icon} />
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Time</span>
                <span className={styles.infoValue}>{ride.tripTime}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Users className={styles.icon} />
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Passengers</span>
                <span className={styles.infoValue}>{ride.passengerCount} person{ride.passengerCount > 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <DollarSign className={styles.icon} />
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Fare</span>
                <span className={styles.infoValue}>{formatCurrency(ride.estimatedFare)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.additionalInfo}>
          <div className={styles.tripStats}>
            <span className={styles.stat}>{ride.distance}</span>
            <span className={styles.statSeparator}>•</span>
            <span className={styles.stat}>{ride.duration}</span>
            <span className={styles.statSeparator}>•</span>
            <span className={styles.stat}>{ride.luggage}</span>
          </div>
          {ride.specialRequests && ride.specialRequests !== 'None' && (
            <div className={styles.specialRequests}>
              <MessageCircle className={styles.icon} />
              <span>Special Request: {ride.specialRequests}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.rideActions}>
        <button 
          className={styles.chatButton}
          onClick={() => handleOpenChat(ride)}
        >
          <MessageCircle className={styles.buttonIcon} />
          Chat with Passenger
        </button>
        
        {ride.status === 'scheduled' && (
          <button 
            className={styles.startButton}
            onClick={() => handleStartRide(ride.id)}
          >
            <PlayCircle className={styles.buttonIcon} />
            Start Ride
          </button>
        )}
        
        {ride.status === 'active' && (
          <button 
            className={styles.completeButton}
            onClick={() => handleCompleteRide(ride.id)}
          >
            <CheckCircle className={styles.buttonIcon} />
            Complete Ride
          </button>
        )}
        
        {ride.status !== 'completed' && (
          <button className={styles.viewMapButton}>
            <MapIcon className={styles.buttonIcon} />
            View on Map
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.ridesPage}>
      <div className={styles.pageHeader}>
        <h1>My Rides</h1>
        <p>Manage your accepted rides and ongoing trips</p>
      </div>
      
      <div className={styles.pageContent}>
        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'active' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Rides ({activeRides.length})
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'scheduled' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('scheduled')}
          >
            Scheduled ({scheduledRides.length})
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'completed' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completedRides.length})
          </button>
        </div>

        {/* Active Rides Tab */}
        {activeTab === 'active' && (
          <div className={styles.ridesSection}>
            <div className={styles.sectionHeader}>
              <h2>Active Rides</h2>
              <div className={styles.rideCounter}>
                {activeRides.length} active ride{activeRides.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            {activeRides.length === 0 ? (
              <div className={styles.noRides}>
                <Car className={styles.noRidesIcon} />
                <p>No active rides at the moment.</p>
                <span>Accepted rides will appear here when started.</span>
              </div>
            ) : (
              <div className={styles.ridesList}>
                {activeRides.map(renderRideCard)}
              </div>
            )}
          </div>
        )}

        {/* Scheduled Rides Tab */}
        {activeTab === 'scheduled' && (
          <div className={styles.ridesSection}>
            <div className={styles.sectionHeader}>
              <h2>Scheduled Rides</h2>
              <div className={styles.rideCounter}>
                {scheduledRides.length} scheduled ride{scheduledRides.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            {scheduledRides.length === 0 ? (
              <div className={styles.noRides}>
                <Calendar className={styles.noRidesIcon} />
                <p>No scheduled rides.</p>
                <span>Accepted rides will appear here until started.</span>
              </div>
            ) : (
              <div className={styles.ridesList}>
                {scheduledRides.map(renderRideCard)}
              </div>
            )}
          </div>
        )}

        {/* Completed Rides Tab */}
        {activeTab === 'completed' && (
          <div className={styles.ridesSection}>
            <div className={styles.sectionHeader}>
              <h2>Completed Rides</h2>
              <div className={styles.rideCounter}>
                {completedRides.length} completed ride{completedRides.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            {completedRides.length === 0 ? (
              <div className={styles.noRides}>
                <CheckCircle className={styles.noRidesIcon} />
                <p>No completed rides yet.</p>
                <span>Finished rides will appear here.</span>
              </div>
            ) : (
              <div className={styles.ridesList}>
                {completedRides.map(renderRideCard)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rides;
