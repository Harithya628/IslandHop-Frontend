import React, { useState } from 'react';
import { Search, X, MapPin, Hotel, Utensils, Camera, Star, Clock } from 'lucide-react';
import './LocationSearchModal.css';

const LocationSearchModal = ({ type, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const mockLocations = {
    all: [
      {
        id: 1,
        name: 'Sigiriya Rock Fortress',
        type: 'attraction',
        category: 'Historical Site',
        description: 'Ancient rock fortress and palace ruins with breathtaking views',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
        rating: 4.8,
        reviews: '12,453 reviews',
        duration: '3-4 hours',
        location: 'Dambulla, Central Province'
      },
      {
        id: 2,
        name: 'Temple of the Tooth',
        type: 'attraction',
        category: 'Religious Site',
        description: 'Sacred Buddhist temple housing a tooth relic of Buddha',
        image: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=300&h=200&fit=crop',
        rating: 4.6,
        reviews: '8,291 reviews',
        duration: '2-3 hours',
        location: 'Kandy, Central Province'
      },
      {
        id: 3,
        name: 'Galle Fort',
        type: 'attraction',
        category: 'Historical Site',
        description: 'Dutch colonial fortification and UNESCO World Heritage site',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=200&fit=crop',
        rating: 4.7,
        reviews: '15,672 reviews',
        duration: '2-3 hours',
        location: 'Galle, Southern Province'
      },
      {
        id: 4,
        name: 'Heritance Kandalama',
        type: 'hotel',
        category: 'Luxury Hotel',
        description: 'Eco-luxury hotel with stunning lake and mountain views',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop',
        rating: 4.6,
        reviews: '2,834 reviews',
        priceRange: '$200-400/night',
        location: 'Dambulla, Central Province'
      },
      {
        id: 5,
        name: 'Cinnamon Lodge Habarana',
        type: 'hotel',
        category: 'Resort Hotel',
        description: 'Charming resort in the heart of the Cultural Triangle',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop',
        rating: 4.4,
        reviews: '1,892 reviews',
        priceRange: '$150-300/night',
        location: 'Habarana, North Central Province'
      },
      {
        id: 6,
        name: 'Ministry of Crab',
        type: 'restaurant',
        category: 'Seafood Restaurant',
        description: 'World-famous seafood restaurant in a historic hospital building',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop',
        rating: 4.5,
        reviews: '4,567 reviews',
        priceRange: '$30-80 per person',
        location: 'Colombo, Western Province'
      },
      {
        id: 7,
        name: 'The Lagoon Restaurant',
        type: 'restaurant',
        category: 'Sri Lankan Cuisine',
        description: 'Authentic Sri Lankan cuisine with traditional ambiance',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
        rating: 4.3,
        reviews: '1,234 reviews',
        priceRange: '$15-35 per person',
        location: 'Kandy, Central Province'
      }
    ]
  };

  const tabs = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'attraction', label: 'Attractions', icon: Camera },
    { id: 'hotel', label: 'Hotels', icon: Hotel },
    { id: 'restaurant', label: 'Restaurants', icon: Utensils }
  ];

  const filteredLocations = mockLocations.all.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || location.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getLocationIcon = (locationType) => {
    switch (locationType) {
      case 'hotel': return <Hotel size={20} />;
      case 'restaurant': return <Utensils size={20} />;
      case 'attraction': return <Camera size={20} />;
      default: return <MapPin size={20} />;
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="location-modal-backdrop" onClick={handleBackdropClick}>
      <div className="location-search-modal">
        <div className="modal-header">
          <h2>Add a location</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="search-section">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search places, restaurants, hotels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>
        </div>

        <div className="tabs-section">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                <IconComponent size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="results-section">
          {filteredLocations.length > 0 ? (
            <div className="locations-grid">
              {filteredLocations.map(location => (
                <div 
                  key={location.id} 
                  className="location-result-card"
                  onClick={() => onSelect(location)}
                >
                  <div className="location-image">
                    <img src={location.image} alt={location.name} />
                    <div className="location-type-badge">
                      {getLocationIcon(location.type)}
                    </div>
                  </div>
                  
                  <div className="location-content">
                    <div className="location-header">
                      <h3>{location.name}</h3>
                      <div className="location-rating">
                        <Star size={14} fill="currentColor" />
                        <span>{location.rating}</span>
                      </div>
                    </div>
                    
                    <p className="location-category">{location.category}</p>
                    <p className="location-description">{location.description}</p>
                    
                    <div className="location-details">
                      <div className="detail-item">
                        <MapPin size={14} />
                        <span>{location.location}</span>
                      </div>
                      
                      {location.duration && (
                        <div className="detail-item">
                          <Clock size={14} />
                          <span>{location.duration}</span>
                        </div>
                      )}
                      
                      {location.priceRange && (
                        <div className="detail-item price">
                          <span>{location.priceRange}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="location-reviews">
                      {location.reviews}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <Search size={48} />
              </div>
              <h3>No places found</h3>
              <p>Try adjusting your search or browse different categories</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <p>Can't find what you're looking for? <button className="link-btn">Add a custom place</button></p>
        </div>
      </div>
    </div>
  );
};

export default LocationSearchModal;
