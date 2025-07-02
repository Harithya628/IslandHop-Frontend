import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, Grid, List, Heart, Share2, Clock, Camera } from 'lucide-react';
import './Explore.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tourist attractions data for Sri Lanka
  const touristAttractions = [
    {
      id: 1,
      name: 'Sigiriya Rock Fortress',
      district: 'Matale',
      province: 'Central Province',
      category: 'historical',
      rating: 4.8,
      description: 'Ancient rock fortress and palace ruins with stunning frescoes and landscaped gardens.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 7.9570, lng: 80.7603 },
      openTime: '7:00 AM - 5:30 PM',
      bestTime: 'Early morning or late afternoon',
      entryFee: 'LKR 4,770 (Foreigners)',
      tags: ['UNESCO World Heritage', 'Ancient Architecture', 'Climbing', 'Photography']
    },
    {
      id: 2,
      name: 'Temple of the Sacred Tooth Relic',
      district: 'Kandy',
      province: 'Central Province',
      category: 'religious',
      rating: 4.7,
      description: 'Sacred Buddhist temple housing the tooth relic of Buddha, located in the heart of Kandy.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 7.2906, lng: 80.6337 },
      openTime: '5:30 AM - 8:00 PM',
      bestTime: 'Evening during Puja ceremony',
      entryFee: 'LKR 2,000 (Foreigners)',
      tags: ['Buddhist Temple', 'Sacred Relic', 'Cultural Heritage', 'Religious']
    },
    {
      id: 3,
      name: 'Yala National Park',
      district: 'Hambantota',
      province: 'Southern Province',
      category: 'wildlife',
      rating: 4.6,
      description: 'Famous wildlife sanctuary known for leopards, elephants, and diverse bird species.',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.3724, lng: 81.5185 },
      openTime: '6:00 AM - 6:00 PM',
      bestTime: 'February to July',
      entryFee: 'LKR 3,710 + Jeep Safari',
      tags: ['Wildlife Safari', 'Leopards', 'Elephants', 'Bird Watching']
    },
    {
      id: 4,
      name: 'Galle Fort',
      district: 'Galle',
      province: 'Southern Province',
      category: 'historical',
      rating: 4.5,
      description: 'Historic fortified city built by Portuguese and Dutch, now a UNESCO World Heritage site.',
      image: 'https://images.unsplash.com/photo-1586123600840-e710dc6fa726?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.0328, lng: 80.2170 },
      openTime: '24 hours',
      bestTime: 'Sunset for best views',
      entryFee: 'Free',
      tags: ['Colonial Architecture', 'UNESCO Heritage', 'Ocean Views', 'Shopping']
    },
    {
      id: 5,
      name: 'Nuwara Eliya',
      district: 'Nuwara Eliya',
      province: 'Central Province',
      category: 'nature',
      rating: 4.4,
      description: 'Hill country town known as "Little England" with tea plantations and cool climate.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.9497, lng: 80.7891 },
      openTime: 'All day',
      bestTime: 'April to September',
      entryFee: 'Free (attractions vary)',
      tags: ['Tea Plantations', 'Cool Climate', 'British Colonial', 'Hill Country']
    },
    {
      id: 6,
      name: 'Ella Rock',
      district: 'Badulla',
      province: 'Uva Province',
      category: 'adventure',
      rating: 4.7,
      description: 'Popular hiking destination offering panoramic views of the hill country.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.8667, lng: 81.0466 },
      openTime: 'Sunrise to sunset',
      bestTime: 'Early morning for sunrise',
      entryFee: 'Free',
      tags: ['Hiking', 'Sunrise Views', 'Photography', 'Adventure']
    },
    {
      id: 7,
      name: 'Mirissa Beach',
      district: 'Matara',
      province: 'Southern Province',
      category: 'beach',
      rating: 4.3,
      description: 'Beautiful sandy beach known for whale watching, surfing, and stunning sunsets.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 5.9459, lng: 80.4564 },
      openTime: '24 hours',
      bestTime: 'November to April',
      entryFee: 'Free',
      tags: ['Beach', 'Whale Watching', 'Surfing', 'Sunset Views']
    },
    {
      id: 8,
      name: 'Anuradhapura Ancient City',
      district: 'Anuradhapura',
      province: 'North Central Province',
      category: 'historical',
      rating: 4.6,
      description: 'Ancient capital with sacred Buddhist sites, stupas, and archaeological treasures.',
      image: 'https://images.unsplash.com/photo-1590736969955-b593a1b59c44?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 8.3114, lng: 80.4037 },
      openTime: '6:00 AM - 6:00 PM',
      bestTime: 'Early morning or late afternoon',
      entryFee: 'LKR 3,570 (Foreigners)',
      tags: ['Ancient City', 'Buddhist Heritage', 'UNESCO Heritage', 'Archaeology']
    },
    {
      id: 9,
      name: 'Adams Peak (Sri Pada)',
      district: 'Ratnapura',
      province: 'Sabaragamuwa Province',
      category: 'religious',
      rating: 4.8,
      description: 'Sacred mountain with a footprint-shaped mark at the summit, pilgrimage site.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.8092, lng: 80.4989 },
      openTime: 'Pilgrimage season: Dec-May',
      bestTime: 'Night climb for sunrise',
      entryFee: 'Free',
      tags: ['Pilgrimage', 'Sacred Mountain', 'Hiking', 'Sunrise']
    },
    {
      id: 10,
      name: 'Polonnaruwa Ancient City',
      district: 'Polonnaruwa',
      province: 'North Central Province',
      category: 'historical',
      rating: 4.5,
      description: 'Medieval capital with well-preserved ruins, including the famous Gal Vihara.',
      image: 'https://images.unsplash.com/photo-1590736969955-b593a1b59c44?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 7.9403, lng: 81.0188 },
      openTime: '7:00 AM - 6:00 PM',
      bestTime: 'Early morning',
      entryFee: 'LKR 3,570 (Foreigners)',
      tags: ['Ancient Ruins', 'Gal Vihara', 'UNESCO Heritage', 'Cycling']
    },
    {
      id: 11,
      name: 'Dambulla Cave Temple',
      district: 'Matale',
      province: 'Central Province',
      category: 'religious',
      rating: 4.4,
      description: 'Ancient cave temple complex with beautiful Buddhist murals and statues.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 7.8567, lng: 80.6496 },
      openTime: '7:00 AM - 7:00 PM',
      bestTime: 'Morning hours',
      entryFee: 'LKR 2,000 (Foreigners)',
      tags: ['Cave Temple', 'Buddhist Art', 'UNESCO Heritage', 'Ancient Paintings']
    },
    {
      id: 12,
      name: 'Horton Plains National Park',
      district: 'Nuwara Eliya',
      province: 'Central Province',
      category: 'nature',
      rating: 4.6,
      description: 'High-altitude plateau with Worlds End cliff, Bakers Falls, and unique ecosystem.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.8055, lng: 80.8055 },
      openTime: '6:00 AM - 6:00 PM',
      bestTime: 'Early morning for clear views',
      entryFee: 'LKR 3,710 (Foreigners)',
      tags: ['National Park', 'Worlds End', 'Trekking', 'Endemic Species']
    },
    {
      id: 13,
      name: 'Arugam Bay',
      district: 'Ampara',
      province: 'Eastern Province',
      category: 'beach',
      rating: 4.4,
      description: 'World-renowned surfing destination with beautiful beaches and laid-back atmosphere.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.8402, lng: 81.8344 },
      openTime: '24 hours',
      bestTime: 'April to October (surfing season)',
      entryFee: 'Free',
      tags: ['Surfing', 'Beach', 'Backpacker Destination', 'Wildlife']
    },
    {
      id: 14,
      name: 'Nine Arch Bridge',
      district: 'Badulla',
      province: 'Uva Province',
      category: 'adventure',
      rating: 4.3,
      description: 'Iconic railway bridge built during British era, popular for train spotting.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.8729, lng: 81.0553 },
      openTime: 'All day',
      bestTime: 'Train schedule times',
      entryFee: 'Free',
      tags: ['Railway Bridge', 'Train Spotting', 'Photography', 'Colonial Architecture']
    },
    {
      id: 15,
      name: 'Sinharaja Forest Reserve',
      district: 'Ratnapura',
      province: 'Sabaragamuwa Province',
      category: 'nature',
      rating: 4.7,
      description: 'Primary tropical rainforest and biodiversity hotspot with endemic species.',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 6.4031, lng: 80.4956 },
      openTime: '6:00 AM - 5:00 PM',
      bestTime: 'January to April',
      entryFee: 'LKR 2,895 (Foreigners)',
      tags: ['Rainforest', 'Biodiversity', 'UNESCO Heritage', 'Bird Watching']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Attractions', icon: '🏛️' },
    { value: 'historical', label: 'Historical', icon: '🏛️' },
    { value: 'religious', label: 'Religious', icon: '🛕' },
    { value: 'nature', label: 'Nature', icon: '🌿' },
    { value: 'beach', label: 'Beaches', icon: '🏖️' },
    { value: 'wildlife', label: 'Wildlife', icon: '🐘' },
    { value: 'adventure', label: 'Adventure', icon: '⛰️' }
  ];

  const districts = [
    'all', 'Kandy', 'Matale', 'Hambantota', 'Galle', 'Nuwara Eliya', 
    'Badulla', 'Matara', 'Anuradhapura', 'Ratnapura', 'Polonnaruwa', 'Ampara'
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFilteredAttractions(touristAttractions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = touristAttractions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(attraction =>
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(attraction => attraction.category === selectedCategory);
    }

    // Filter by district
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(attraction => attraction.district === selectedDistrict);
    }

    setFilteredAttractions(filtered);
  }, [searchTerm, selectedCategory, selectedDistrict]);

  const handleFavorite = (attractionId) => {
    setFavorites(prev => 
      prev.includes(attractionId) 
        ? prev.filter(id => id !== attractionId)
        : [...prev, attractionId]
    );
  };

  const handleShare = (attraction) => {
    if (navigator.share) {
      navigator.share({
        title: attraction.name,
        text: attraction.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${attraction.name} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const openInMaps = (coordinates) => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="rating-stars">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="star-filled" size={16} />
        ))}
        {hasHalfStar && <Star className="star-half" size={16} />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i + fullStars} className="star-empty" size={16} />
        ))}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="explore-page">
        <Navbar />
        <div className="explore-loading">
          <div className="loading-spinner"></div>
          <p>Discovering Sri Lanka's beautiful attractions...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="explore-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="explore-hero">
        <div className="hero-content">
          <h1>Explore Sri Lanka</h1>
          <p>Discover the pearl of the Indian Ocean with its ancient heritage, pristine beaches, and breathtaking landscapes</p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search attractions, districts, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="explore-filters">
        <div className="filters-container">
          {/* Category Filter */}
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* District Filter & View Controls */}
          <div className="secondary-filters">
            <div className="filter-group">
              <label htmlFor="district-select">District</label>
              <select
                id="district-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="district-select"
              >
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district === 'all' ? 'All Districts' : district}
                  </option>
                ))}
              </select>
            </div>

            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="explore-content">
        <div className="content-header">
          <h2>
            {searchTerm ? `Search results for "${searchTerm}"` : 'Tourist Attractions'} 
            <span className="results-count">({filteredAttractions.length} found)</span>
          </h2>
        </div>

        {filteredAttractions.length === 0 ? (
          <div className="no-results">
            <div className="no-results-content">
              <Camera size={64} className="no-results-icon" />
              <h3>No attractions found</h3>
              <p>Try adjusting your search terms or filters to discover more places.</p>
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDistrict('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className={`attractions-container ${viewMode}`}>
            {filteredAttractions.map(attraction => (
              <div key={attraction.id} className="attraction-card">
                <div className="card-image">
                  <img src={attraction.image} alt={attraction.name} />
                  <div className="card-overlay">
                    <button 
                      className={`favorite-btn ${favorites.includes(attraction.id) ? 'favorited' : ''}`}
                      onClick={() => handleFavorite(attraction.id)}
                      title="Add to favorites"
                    >
                      <Heart size={20} />
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(attraction)}
                      title="Share attraction"
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                  <div className="category-badge">
                    {categories.find(cat => cat.value === attraction.category)?.icon}
                    {categories.find(cat => cat.value === attraction.category)?.label}
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <h3>{attraction.name}</h3>
                    {getRatingStars(attraction.rating)}
                  </div>

                  <div className="location-info">
                    <MapPin size={16} />
                    <span>{attraction.district}, {attraction.province}</span>
                  </div>

                  <p className="description">{attraction.description}</p>

                  <div className="attraction-details">
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>Open: {attraction.openTime}</span>
                    </div>
                    <div className="detail-item">
                      <span className="fee-label">Entry:</span>
                      <span className="fee-value">{attraction.entryFee}</span>
                    </div>
                  </div>

                  <div className="best-time">
                    <strong>Best Time:</strong> {attraction.bestTime}
                  </div>

                  <div className="tags">
                    {attraction.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                    {attraction.tags.length > 3 && (
                      <span className="tag-more">+{attraction.tags.length - 3} more</span>
                    )}
                  </div>

                  <div className="card-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => openInMaps(attraction.coordinates)}
                    >
                      <MapPin size={16} />
                      View on Map
                    </button>
                    <button className="btn-primary">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ExplorePage;