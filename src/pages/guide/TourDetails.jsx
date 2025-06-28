import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './TourDetails.css';

// Mock data - in real app this would come from API/database
const mockTours = [
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
    detailedDescription: 'This comprehensive tour takes you through one of Sri Lanka\'s most iconic historical sites. Starting early morning, we\'ll climb the ancient rock fortress of Sigiriya, also known as Lion Rock. You\'ll discover the remarkable frescoes, mirror wall, and the ruins of the ancient palace complex at the summit. The tour includes visits to the surrounding gardens, water features, and archaeological sites that showcase the ingenuity of ancient Sri Lankan civilization.',
    meetingPoint: 'Sigiriya Museum Entrance',
    meetingTime: '07:00 AM',
    endTime: '03:00 PM',
    inclusions: [
      'Professional English-speaking guide',
      'Entrance tickets to Sigiriya Rock',
      'Bottled water',
      'Traditional Sri Lankan lunch',
      'Transportation from meeting point',
      'First aid kit and safety equipment'
    ],
    exclusions: [
      'Hotel pickup and drop-off',
      'Personal expenses',
      'Gratuities',
      'Travel insurance'
    ],
    itinerary: [
      {
        time: '07:00 AM',
        activity: 'Meet at Sigiriya Museum',
        description: 'Brief introduction and safety guidelines'
      },
      {
        time: '07:30 AM',
        activity: 'Start climbing Sigiriya Rock',
        description: 'Begin the ascent through the gardens and terraces'
      },
      {
        time: '08:30 AM',
        activity: 'Frescoes Gallery',
        description: 'View the ancient paintings of celestial maidens'
      },
      {
        time: '09:30 AM',
        activity: 'Summit exploration',
        description: 'Explore the palace ruins and enjoy panoramic views'
      },
      {
        time: '11:00 AM',
        activity: 'Descent and garden tour',
        description: 'Explore the water gardens and boulder gardens'
      },
      {
        time: '12:30 PM',
        activity: 'Traditional lunch',
        description: 'Authentic Sri Lankan meal at local restaurant'
      },
      {
        time: '02:00 PM',
        activity: 'Cultural center visit',
        description: 'Learn about local history and archaeology'
      },
      {
        time: '03:00 PM',
        activity: 'Tour conclusion',
        description: 'End of tour at museum entrance'
      }
    ],
    requirements: [
      'Moderate fitness level required',
      'Comfortable walking shoes',
      'Sun hat and sunscreen',
      'Camera (optional)',
      'Light backpack for personal items'
    ],
    weatherPolicy: 'Tours operate in all weather conditions. In case of severe weather, alternative indoor activities will be provided.',
    cancellationPolicy: 'Free cancellation up to 24 hours before the tour. 50% refund for cancellations within 24 hours.',
    emergencyContact: '+94 77 123 4567',
    touristDetails: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 555 0123',
        nationality: 'American',
        age: 32,
        specialRequests: 'Vegetarian meal'
      },
      {
        id: 2,
        name: 'Sarah Smith',
        email: 'sarah.smith@email.com',
        phone: '+1 555 0124',
        nationality: 'American',
        age: 29,
        specialRequests: 'None'
      }
    ]
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
    detailedDescription: 'Immerse yourself in Sri Lankan culture and heritage with this comprehensive tour of Kandy. Visit the sacred Temple of the Tooth Relic (Sri Dalada Maligawa), one of Buddhism\'s most important sites. Then journey to the beautiful tea plantations in the surrounding hills, where you\'ll learn about tea processing and enjoy fresh Ceylon tea with stunning mountain views.',
    meetingPoint: 'Kandy Railway Station',
    meetingTime: '08:00 AM',
    endTime: '02:00 PM',
    inclusions: [
      'Professional guide',
      'Temple entrance fees',
      'Tea plantation tour',
      'Tea tasting session',
      'Traditional lunch',
      'Transportation'
    ],
    exclusions: [
      'Hotel transfers',
      'Personal shopping',
      'Tips',
      'Insurance'
    ],
    itinerary: [
      {
        time: '08:00 AM',
        activity: 'Meet at Railway Station',
        description: 'Introduction and overview of the day'
      },
      {
        time: '08:30 AM',
        activity: 'Temple of the Tooth visit',
        description: 'Explore the sacred temple and learn about its history'
      },
      {
        time: '10:30 AM',
        activity: 'Kandy city tour',
        description: 'Walk around Kandy Lake and local markets'
      },
      {
        time: '11:30 AM',
        activity: 'Travel to tea plantation',
        description: 'Scenic drive through hill country'
      },
      {
        time: '12:30 PM',
        activity: 'Tea plantation tour',
        description: 'Learn about tea processing and production'
      },
      {
        time: '01:30 PM',
        activity: 'Tea tasting and lunch',
        description: 'Sample different teas with traditional meal'
      },
      {
        time: '02:00 PM',
        activity: 'Return to Kandy',
        description: 'End of tour at railway station'
      }
    ],
    requirements: [
      'Modest dress for temple visit',
      'Comfortable walking shoes',
      'Respectful behavior at religious sites'
    ],
    weatherPolicy: 'Tours operate rain or shine. Temple visits available in all weather.',
    cancellationPolicy: 'Free cancellation 48 hours in advance.',
    emergencyContact: '+94 77 987 6543',
    touristDetails: [
      {
        id: 3,
        name: 'Emma Wilson',
        email: 'emma.w@email.com',
        phone: '+44 7700 900123',
        nationality: 'British',
        age: 28,
        specialRequests: 'Photography enthusiast'
      },
      {
        id: 4,
        name: 'James Wilson',
        email: 'james.w@email.com',
        phone: '+44 7700 900124',
        nationality: 'British',
        age: 31,
        specialRequests: 'None'
      }
    ]
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
    detailedDescription: 'Step back in time as you explore the UNESCO World Heritage Site of Galle Fort. This walking tour takes you through cobblestone streets lined with Dutch colonial architecture, historic churches, museums, and charming boutiques. Learn about the fort\'s Portuguese and Dutch colonial history, its role in maritime trade, and how it survived the 2004 tsunami.',
    meetingPoint: 'Galle Fort Main Gate',
    meetingTime: '09:00 AM',
    endTime: '01:00 PM',
    inclusions: [
      'Expert local guide',
      'Museum entrance fees',
      'Light refreshments',
      'Historical maps and materials',
      'Photography opportunities'
    ],
    exclusions: [
      'Lunch',
      'Shopping expenses',
      'Transportation to/from Galle',
      'Personal items'
    ],
    itinerary: [
      {
        time: '09:00 AM',
        activity: 'Fort entrance',
        description: 'Meet at main gate and historical overview'
      },
      {
        time: '09:30 AM',
        activity: 'Rampart walk',
        description: 'Walk along the fort walls with ocean views'
      },
      {
        time: '10:30 AM',
        activity: 'Dutch Reformed Church',
        description: 'Visit historic church and cemetery'
      },
      {
        time: '11:00 AM',
        activity: 'Maritime Museum',
        description: 'Learn about naval history and artifacts'
      },
      {
        time: '12:00 PM',
        activity: 'Local streets exploration',
        description: 'Discover boutiques, cafes, and colonial buildings'
      },
      {
        time: '01:00 PM',
        activity: 'Tour conclusion',
        description: 'End at lighthouse with final Q&A'
      }
    ],
    requirements: [
      'Comfortable walking shoes',
      'Sun protection',
      'Camera for photos',
      'Water bottle'
    ],
    weatherPolicy: 'Tours run in most weather. Covered areas available during rain.',
    cancellationPolicy: 'Free cancellation up to 12 hours before tour.',
    emergencyContact: '+94 77 456 7890',
    touristDetails: [
      {
        id: 5,
        name: 'Michael Chen',
        email: 'mchen@email.com',
        phone: '+1 408 555 0198',
        nationality: 'American',
        age: 35,
        specialRequests: 'History enthusiast'
      },
      {
        id: 6,
        name: 'Lisa Chen',
        email: 'lchen@email.com',
        phone: '+1 408 555 0199',
        nationality: 'American',
        age: 33,
        specialRequests: 'Architecture lover'
      }
    ]
  }
];

const TourDetails = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // Simulate API call to fetch tour details
    setTimeout(() => {
      const foundTour = mockTours.find(t => t.id === tourId);
      setTour(foundTour);
      setLoading(false);
    }, 1000);
  }, [tourId]);

  const handleBackToTours = () => {
    navigate('/guide');
  };

  const handleEditTour = () => {
    // Navigate to edit tour page (to be implemented)
    alert('Edit tour functionality to be implemented');
  };

  const handleCancelTour = () => {
    if (window.confirm('Are you sure you want to cancel this tour?')) {
      alert('Tour cancellation functionality to be implemented');
    }
  };

  const handleContactTourist = (tourist) => {
    alert(`Contact ${tourist.name} functionality to be implemented`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="tour-details-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading tour details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!tour) {
    return (
      <>
        <Navbar />
        <div className="tour-details-container">
          <div className="error-container">
            <h2>Tour Not Found</h2>
            <p>The requested tour could not be found.</p>
            <button onClick={handleBackToTours} className="btn-back">
              Back to Tours
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="tour-details-container">
        {/* Header */}
        <div className="tour-details-header">
          <button onClick={handleBackToTours} className="btn-back">
            ← Back to Tours
          </button>
          <div className="tour-header-info">
            <h1>{tour.title}</h1>
            <div className="tour-meta">
              <span className={`status-badge ${tour.status.toLowerCase()}`}>
                {tour.status}
              </span>
              <span className="tour-id">Tour ID: {tour.id}</span>
            </div>
          </div>
          <div className="tour-actions">
            <button onClick={handleEditTour} className="btn-edit">
              Edit Tour
            </button>
            <button onClick={handleCancelTour} className="btn-cancel">
              Cancel Tour
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="details-tabs">
          <button
            className={`details-tab ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            Overview
          </button>
          <button
            className={`details-tab ${activeSection === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveSection('itinerary')}
          >
            Itinerary
          </button>
          <button
            className={`details-tab ${activeSection === 'tourists' ? 'active' : ''}`}
            onClick={() => setActiveSection('tourists')}
          >
            Tourists ({tour.participants})
          </button>
          <button
            className={`details-tab ${activeSection === 'logistics' ? 'active' : ''}`}
            onClick={() => setActiveSection('logistics')}
          >
            Logistics
          </button>
        </div>

        {/* Content Sections */}
        <div className="details-content">
          {activeSection === 'overview' && (
            <div className="overview-section">
              <div className="overview-grid">
                <div className="tour-summary">
                  <h3>Tour Summary</h3>
                  <div className="summary-item">
                    <span className="label">Date:</span>
                    <span className="value">{tour.date}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Duration:</span>
                    <span className="value">{tour.duration}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Price:</span>
                    <span className="value">{tour.price}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Location:</span>
                    <span className="value">{tour.location}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Participants:</span>
                    <span className="value">{tour.participants}/{tour.maxParticipants}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Meeting Point:</span>
                    <span className="value">{tour.meetingPoint}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Meeting Time:</span>
                    <span className="value">{tour.meetingTime}</span>
                  </div>
                </div>

                <div className="tour-description">
                  <h3>Description</h3>
                  <p>{tour.detailedDescription}</p>
                </div>
              </div>

              <div className="inclusions-exclusions">
                <div className="inclusions">
                  <h3>What's Included</h3>
                  <ul>
                    {tour.inclusions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="exclusions">
                  <h3>What's Not Included</h3>
                  <ul>
                    {tour.exclusions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="requirements">
                <h3>Requirements & Recommendations</h3>
                <ul>
                  {tour.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'itinerary' && (
            <div className="itinerary-section">
              <h3>Detailed Itinerary</h3>
              <div className="itinerary-timeline">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="itinerary-item">
                    <div className="time">{item.time}</div>
                    <div className="content">
                      <h4>{item.activity}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'tourists' && (
            <div className="tourists-section">
              <h3>Registered Tourists</h3>
              <div className="tourists-list">
                {tour.touristDetails.map((tourist) => (
                  <div key={tourist.id} className="tourist-card">
                    <div className="tourist-info">
                      <h4>{tourist.name}</h4>
                      <p className="tourist-details">
                        <span><strong>Email:</strong> {tourist.email}</span>
                        <span><strong>Phone:</strong> {tourist.phone}</span>
                        <span><strong>Nationality:</strong> {tourist.nationality}</span>
                        <span><strong>Age:</strong> {tourist.age}</span>
                        {tourist.specialRequests && tourist.specialRequests !== 'None' && (
                          <span><strong>Special Requests:</strong> {tourist.specialRequests}</span>
                        )}
                      </p>
                    </div>
                    <div className="tourist-actions">
                      <button 
                        onClick={() => handleContactTourist(tourist)}
                        className="btn-contact"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'logistics' && (
            <div className="logistics-section">
              <div className="logistics-grid">
                <div className="policies">
                  <h3>Policies</h3>
                  <div className="policy-item">
                    <h4>Weather Policy</h4>
                    <p>{tour.weatherPolicy}</p>
                  </div>
                  <div className="policy-item">
                    <h4>Cancellation Policy</h4>
                    <p>{tour.cancellationPolicy}</p>
                  </div>
                </div>

                <div className="emergency-info">
                  <h3>Emergency Information</h3>
                  <div className="emergency-contact">
                    <span className="label">Emergency Contact:</span>
                    <span className="value">{tour.emergencyContact}</span>
                  </div>
                  <div className="guide-info">
                    <span className="label">Guide:</span>
                    <span className="value">You (Current Guide)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TourDetails;
