import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Star, Filter, Grid, List, Heart, Share2, Clock, Camera, Navigation } from 'lucide-react';
import './Explore.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [mapsReady, setMapsReady] = useState(false);
  
  const searchTimeoutRef = useRef(null);
  const placesServiceRef = useRef(null);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  console.log('🔧 ExplorePage initialized');
  console.log('🔑 Google Maps API Key:', GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing');

  // Demo data as fallback
  const demoAttractions = [
    {
      id: 'demo_1',
      name: 'Sigiriya Rock Fortress',
      district: 'Matale',
      province: 'Central Province',
      category: 'historical',
      rating: 4.8,
      description: 'Ancient rock fortress and palace ruins with stunning frescoes and landscaped gardens. One of Sri Lanka\'s most iconic UNESCO World Heritage sites.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      coordinates: { lat: 7.9570, lng: 80.7603 },
      openTime: '7:00 AM - 5:30 PM',
      bestTime: 'Early morning or late afternoon',
      entryFee: 'LKR 4,770 (Foreigners)',
      tags: ['UNESCO World Heritage', 'Ancient Architecture', 'Climbing', 'Photography'],
      website: 'https://www.sigiriya.lk',
      address: 'Sigiriya, Matale District, Central Province, Sri Lanka'
    },
    {
      id: 'demo_2',
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
      tags: ['Buddhist Temple', 'Sacred Relic', 'Cultural Heritage', 'Religious'],
      address: 'Kandy, Central Province, Sri Lanka'
    },
    {
      id: 'demo_3',
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
      tags: ['Colonial Architecture', 'UNESCO Heritage', 'Ocean Views', 'Shopping'],
      address: 'Galle, Southern Province, Sri Lanka'
    },
    {
      id: 'demo_4',
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
      tags: ['Wildlife Safari', 'Leopards', 'Elephants', 'Bird Watching'],
      address: 'Hambantota District, Southern Province, Sri Lanka'
    },
    {
      id: 'demo_5',
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
      tags: ['Tea Plantations', 'Cool Climate', 'British Colonial', 'Hill Country'],
      address: 'Nuwara Eliya, Central Province, Sri Lanka'
    },
    {
      id: 'demo_6',
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
      tags: ['Beach', 'Whale Watching', 'Surfing', 'Sunset Views'],
      address: 'Mirissa, Matara District, Southern Province, Sri Lanka'
    }
  ];

  // Category mappings
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
    'Badulla', 'Matara', 'Anuradhapura', 'Ratnapura', 'Polonnaruwa', 'Ampara',
    'Colombo', 'Jaffna', 'Trincomalee', 'Kurunegala', 'Puttalam'
  ];

  // Load Google Maps script
  useEffect(() => {
    console.log('📍 useEffect: Loading Google Maps script...');
    
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('❌ Google Maps API key not configured - using demo data');
      loadDemoData();
      return;
    }

    const loadGoogleMaps = () => {
      console.log('🔄 Checking if Google Maps is already loaded...');
      
      if (window.google && window.google.maps) {
        console.log('✅ Google Maps already loaded, initializing Places service...');
        initializePlacesService();
        return;
      }

      console.log('📦 Loading Google Maps script...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('✅ Google Maps script loaded successfully');
        initializePlacesService();
      };
      script.onerror = (error) => {
        console.error('❌ Failed to load Google Maps script:', error);
        console.log('🔄 Falling back to demo data...');
        loadDemoData();
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [GOOGLE_MAPS_API_KEY]);

  const loadDemoData = () => {
    console.log('📦 Loading demo data...');
    setAttractions(demoAttractions);
    setFilteredAttractions(demoAttractions);
    setMapsReady(true);
    setLoading(false);
  };

  const initializePlacesService = () => {
    console.log('🏗️ Initializing Google Places service...');
    
    try {
      if (window.google && window.google.maps) {
        console.log('✅ Google Maps API available');
        console.log('🗺️ Creating map instance...');
        
        const map = new window.google.maps.Map(document.createElement('div'));
        console.log('✅ Map created successfully');
        
        console.log('🔍 Creating PlacesService...');
        placesServiceRef.current = new window.google.maps.places.PlacesService(map);
        console.log('✅ PlacesService initialized successfully');
        
        setMapsReady(true);
        
        // Now load initial attractions since Maps is ready
        loadInitialAttractions();
      } else {
        console.error('❌ Google Maps API not available');
        loadDemoData();
      }
    } catch (error) {
      console.error('❌ Error initializing Places service:', error);
      console.log('🔄 Falling back to demo data...');
      loadDemoData();
    }
  };

  const loadInitialAttractions = () => {
    console.log('🎯 Loading initial attractions...');
    
    if (!mapsReady || !placesServiceRef.current) {
      console.log('⏳ Maps not ready yet, skipping initial load...');
      return;
    }
    
    setLoading(true);
    searchPlaces('tourist attractions Sri Lanka', 'all');
  };

  // Debounced search effect
  useEffect(() => {
    console.log('🔍 Search term changed:', searchTerm);
    
    if (searchTimeoutRef.current) {
      console.log('⏰ Clearing previous search timeout');
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim()) {
      console.log('🔄 Setting up debounced search...');
      setSearchLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        console.log('🚀 Executing search after debounce');
        performSearch();
      }, 500);
    } else if (hasSearched && mapsReady) {
      console.log('🔙 Search cleared, loading initial attractions...');
      loadInitialAttractions();
    } else if (!searchTerm.trim() && !hasSearched) {
      // Filter demo data if no search and maps not ready
      filterDemoData();
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, mapsReady]);

  // Filter effect
  useEffect(() => {
    console.log('🎛️ Filters changed - Category:', selectedCategory, 'District:', selectedDistrict);
    
    if (mapsReady && placesServiceRef.current) {
      filterAttractions();
    } else {
      filterDemoData();
    }
  }, [attractions, selectedCategory, selectedDistrict, mapsReady]);

  const filterDemoData = () => {
    console.log('🔍 Filtering demo data...');
    let filtered = [...demoAttractions];

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(attraction =>
        attraction.name.toLowerCase().includes(searchLower) ||
        attraction.district.toLowerCase().includes(searchLower) ||
        attraction.description.toLowerCase().includes(searchLower) ||
        attraction.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        attraction.category.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(attraction => attraction.category === selectedCategory);
    }

    // Filter by district
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(attraction => 
        attraction.district.toLowerCase().includes(selectedDistrict.toLowerCase())
      );
    }

    console.log('📊 Demo data filtered:', filtered.length, 'results');
    setFilteredAttractions(filtered);
    setSearchLoading(false);
  };

  const performSearch = () => {
    console.log('🔍 performSearch called with term:', searchTerm);
    
    if (!searchTerm.trim()) {
      console.log('⚠️ Empty search term, aborting search');
      return;
    }

    if (!mapsReady || !placesServiceRef.current) {
      console.log('🔄 Maps not ready, using demo data filter...');
      filterDemoData();
      return;
    }
    
    const query = `${searchTerm} Sri Lanka`;
    console.log('📍 Searching for:', query);
    searchPlaces(query, selectedCategory);
    setHasSearched(true);
  };

  const searchPlaces = (query, category) => {
    console.log('🔍 searchPlaces called');
    console.log('  📝 Query:', query);
    console.log('  🏷️ Category:', category);
    console.log('  🔧 PlacesService available:', !!placesServiceRef.current);
    
    if (!placesServiceRef.current) {
      console.error('❌ Google Places service not initialized - using demo data');
      filterDemoData();
      return;
    }

    const request = {
      query: query,
      fields: [
        'place_id', 'name', 'geometry', 'formatted_address', 'rating', 
        'photos', 'types', 'opening_hours', 'price_level', 'website',
        'international_phone_number', 'vicinity'
      ],
      locationBias: {
        center: { lat: 7.8731, lng: 80.7718 }, // Center of Sri Lanka
        radius: 200000 // 200km radius
      }
    };

    console.log('📋 Search request:', request);
    console.log('🔄 Using legacy PlacesService textSearch...');
    
    placesServiceRef.current.textSearch(request, (results, status) => {
      console.log('📨 textSearch callback executed');
      console.log('  📊 Status:', status);
      console.log('  📋 Results count:', results ? results.length : 0);
      
      setLoading(false);
      setSearchLoading(false);

      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        console.log('✅ Search successful, processing results...');
        console.log('  📍 Raw results:', results);
        
        const processedAttractions = results
          .filter(place => {
            const hasGeometry = place.geometry && place.geometry.location;
            console.log(`  🔍 Place "${place.name}" has geometry:`, hasGeometry);
            return hasGeometry;
          })
          .map(place => {
            console.log(`  ⚙️ Processing place: ${place.name}`);
            return processPlaceData(place);
          })
          .filter(attraction => {
            const isValid = attraction !== null;
            console.log(`  ✅ Attraction valid:`, isValid);
            return isValid;
          });

        console.log('🎯 Final processed attractions:', processedAttractions.length);
        setAttractions(processedAttractions);
      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        console.log('📭 No results found');
        setAttractions([]);
      } else {
        console.error('❌ Search failed with status:', status);
        console.log('🔄 Falling back to demo data...');
        filterDemoData();
      }
    });
  };

  const processPlaceData = (place) => {
    console.log('⚙️ Processing place data for:', place.name);
    
    try {
      // Get the best photo
      let imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80';
      if (place.photos && place.photos.length > 0) {
        console.log('  📸 Getting photo URL...');
        try {
          imageUrl = place.photos[0].getUrl({ maxWidth: 800, maxHeight: 600 });
          console.log('  ✅ Photo URL obtained');
        } catch (photoError) {
          console.error('  ❌ Error getting photo URL:', photoError);
        }
      } else {
        console.log('  📷 No photos available, using default image');
      }

      // Determine category based on place types
      console.log('  🏷️ Place types:', place.types);
      const category = determineCategoryFromTypes(place.types || []);
      console.log('  📂 Determined category:', category);

      // Extract district from address
      const address = place.formatted_address || place.vicinity || '';
      console.log('  📍 Address:', address);
      const district = extractDistrictFromAddress(address);
      console.log('  🏘️ Extracted district:', district);

      // Generate description
      const description = generateDescription(place.name, place.types || []);
      console.log('  📝 Generated description:', description.substring(0, 50) + '...');

      // Format opening hours
      const openTime = place.opening_hours?.weekday_text?.[0] || 'Hours not available';
      console.log('  ⏰ Opening time:', openTime);

      // Determine entry fee
      const entryFee = determineEntryFee(place.price_level, place.types || []);
      console.log('  💰 Entry fee:', entryFee);

      const processedPlace = {
        id: place.place_id,
        name: place.name,
        district: district,
        province: getProvinceFromDistrict(district),
        category: category,
        rating: place.rating || 4.0,
        description: description,
        image: imageUrl,
        coordinates: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        openTime: openTime,
        bestTime: getBestVisitTime(place.types || []),
        entryFee: entryFee,
        tags: generateTags(place.types || []),
        website: place.website,
        phone: place.international_phone_number,
        address: place.formatted_address || place.vicinity,
        placeTypes: place.types || []
      };

      console.log('  ✅ Place processed successfully:', processedPlace.name);
      return processedPlace;
    } catch (error) {
      console.error('  ❌ Error processing place data:', error);
      return null;
    }
  };

  const determineCategoryFromTypes = (types) => {
    console.log('    🔍 Determining category from types:', types);
    const typeSet = new Set(types.map(type => type.toLowerCase()));
    
    if (typeSet.has('museum') || typeSet.has('establishment') && types.some(t => t.includes('historic'))) {
      console.log('    📚 Category: historical');
      return 'historical';
    }
    if (typeSet.has('place_of_worship') || typeSet.has('hindu_temple') || typeSet.has('church')) {
      console.log('    🛕 Category: religious');
      return 'religious';
    }
    if (typeSet.has('natural_feature') && types.some(t => t.includes('beach'))) {
      console.log('    🏖️ Category: beach');
      return 'beach';
    }
    if (typeSet.has('zoo') || types.some(t => t.includes('wildlife') || t.includes('safari'))) {
      console.log('    🐘 Category: wildlife');
      return 'wildlife';
    }
    if (typeSet.has('park') || typeSet.has('natural_feature')) {
      console.log('    🌿 Category: nature');
      return 'nature';
    }
    if (types.some(t => t.includes('adventure') || t.includes('hiking') || t.includes('climbing'))) {
      console.log('    ⛰️ Category: adventure');
      return 'adventure';
    }
    
    console.log('    🌿 Category: nature (default)');
    return 'nature'; // Default category
  };

  const extractDistrictFromAddress = (address) => {
    console.log('    🏘️ Extracting district from:', address);
    const commonDistricts = [
      'Colombo', 'Kandy', 'Galle', 'Matale', 'Nuwara Eliya', 'Badulla', 
      'Matara', 'Hambantota', 'Anuradhapura', 'Polonnaruwa', 'Ratnapura',
      'Ampara', 'Jaffna', 'Trincomalee', 'Kurunegala', 'Puttalam'
    ];

    for (const district of commonDistricts) {
      if (address.toLowerCase().includes(district.toLowerCase())) {
        console.log('    ✅ Found district:', district);
        return district;
      }
    }
    
    // Extract from address components
    const parts = address.split(',').map(part => part.trim());
    const extracted = parts.length > 1 ? parts[parts.length - 2] : 'Unknown';
    console.log('    🔍 Extracted from address parts:', extracted);
    return extracted;
  };

  const getProvinceFromDistrict = (district) => {
    const provinceMap = {
      'Colombo': 'Western Province',
      'Gampaha': 'Western Province',
      'Kalutara': 'Western Province',
      'Kandy': 'Central Province',
      'Matale': 'Central Province',
      'Nuwara Eliya': 'Central Province',
      'Galle': 'Southern Province',
      'Matara': 'Southern Province',
      'Hambantota': 'Southern Province',
      'Jaffna': 'Northern Province',
      'Trincomalee': 'Eastern Province',
      'Ampara': 'Eastern Province',
      'Anuradhapura': 'North Central Province',
      'Polonnaruwa': 'North Central Province',
      'Kurunegala': 'North Western Province',
      'Puttalam': 'North Western Province',
      'Ratnapura': 'Sabaragamuwa Province',
      'Badulla': 'Uva Province'
    };
    
    const province = provinceMap[district] || 'Sri Lanka';
    console.log('    🗺️ Province for', district, ':', province);
    return province;
  };

  const generateDescription = (name, types) => {
    const typeDescriptions = {
      'tourist_attraction': 'Popular tourist destination',
      'museum': 'Cultural and historical museum',
      'park': 'Beautiful natural park',
      'place_of_worship': 'Sacred religious site',
      'natural_feature': 'Stunning natural landmark',
      'beach': 'Pristine coastal destination',
      'zoo': 'Wildlife conservation area'
    };

    const relevantType = types.find(type => typeDescriptions[type]);
    const baseDescription = relevantType ? typeDescriptions[relevantType] : 'Interesting place to visit';
    
    return `${baseDescription} in Sri Lanka. ${name} offers visitors a unique experience with its distinctive charm and local significance.`;
  };

  const getBestVisitTime = (types) => {
    if (types.includes('beach')) return 'November to April (dry season)';
    if (types.includes('park') || types.includes('natural_feature')) return 'Early morning or late afternoon';
    if (types.includes('place_of_worship')) return 'Morning or evening ceremonies';
    return 'Year-round destination';
  };

  const determineEntryFee = (priceLevel, types) => {
    if (!priceLevel) return 'Contact for pricing';
    
    const fees = {
      0: 'Free',
      1: 'LKR 500 - 1,000',
      2: 'LKR 1,000 - 2,500',
      3: 'LKR 2,500 - 5,000',
      4: 'LKR 5,000+'
    };
    
    return fees[priceLevel] || 'Contact for pricing';
  };

  const generateTags = (types) => {
    const tagMap = {
      'tourist_attraction': 'Tourist Attraction',
      'museum': 'Museum',
      'park': 'Park',
      'natural_feature': 'Natural Beauty',
      'place_of_worship': 'Religious Site',
      'establishment': 'Heritage Site',
      'beach': 'Beach',
      'zoo': 'Wildlife'
    };

    return types
      .filter(type => tagMap[type])
      .map(type => tagMap[type])
      .slice(0, 4);
  };

  const filterAttractions = () => {
    console.log('🎛️ Filtering attractions...');
    console.log('  📊 Total attractions:', attractions.length);
    console.log('  🏷️ Selected category:', selectedCategory);
    console.log('  🏘️ Selected district:', selectedDistrict);
    
    let filtered = [...attractions];

    // Filter by category
    if (selectedCategory !== 'all') {
      const beforeCount = filtered.length;
      filtered = filtered.filter(attraction => attraction.category === selectedCategory);
      console.log(`  📂 Category filter: ${beforeCount} → ${filtered.length}`);
    }

    // Filter by district
    if (selectedDistrict !== 'all') {
      const beforeCount = filtered.length;
      filtered = filtered.filter(attraction => 
        attraction.district.toLowerCase().includes(selectedDistrict.toLowerCase())
      );
      console.log(`  🏘️ District filter: ${beforeCount} → ${filtered.length}`);
    }

    console.log('  ✅ Final filtered count:', filtered.length);
    setFilteredAttractions(filtered);
  };

  const handleFavorite = (attractionId) => {
    console.log('❤️ Toggling favorite for:', attractionId);
    setFavorites(prev => 
      prev.includes(attractionId) 
        ? prev.filter(id => id !== attractionId)
        : [...prev, attractionId]
    );
  };

  const handleShare = (attraction) => {
    console.log('📤 Sharing attraction:', attraction.name);
    if (navigator.share) {
      console.log('📱 Using native share API');
      navigator.share({
        title: attraction.name,
        text: attraction.description,
        url: window.location.href
      });
    } else {
      console.log('📋 Copying to clipboard');
      navigator.clipboard.writeText(`${attraction.name} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const openInMaps = (coordinates) => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    console.log('🗺️ Opening maps URL:', url);
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
        <span className="rating-number">({rating.toFixed(1)})</span>
      </div>
    );
  };

  console.log('🎨 Rendering component...');
  console.log('  📊 State - Loading:', loading, 'Error:', !!error, 'Attractions:', filteredAttractions.length);
  console.log('  🗺️ Maps Ready:', mapsReady);

  if (loading && !hasSearched) {
    console.log('⏳ Rendering loading page');
    return (
      <div className="explore-page">
        <Navbar />
        <div className="explore-loading">
          <div className="loading-spinner"></div>
          <p>Loading Sri Lanka's beautiful attractions...</p>
        </div>
        <Footer />
      </div>
    );
  }

  console.log('✅ Rendering main explore page');
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
                placeholder="Search for temples, beaches, parks, museums..."
                value={searchTerm}
                onChange={(e) => {
                  console.log('🔍 Search input changed:', e.target.value);
                  setSearchTerm(e.target.value);
                }}
                className="search-input"
              />
              {searchLoading && <div className="search-loading-spinner"></div>}
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
                  onClick={() => {
                    console.log('🏷️ Category selected:', category.value);
                    setSelectedCategory(category.value);
                  }}
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
                onChange={(e) => {
                  console.log('🏘️ District selected:', e.target.value);
                  setSelectedDistrict(e.target.value);
                }}
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
                onClick={() => {
                  console.log('👁️ View mode changed to: grid');
                  setViewMode('grid');
                }}
                title="Grid View"
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => {
                  console.log('👁️ View mode changed to: list');
                  setViewMode('list');
                }}
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
          {!mapsReady && (
            <div className="info-banner">
              <p>🔄 Showing curated attractions. Google Maps integration will load shortly...</p>
            </div>
          )}
        </div>

        {error && mapsReady && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}

        {filteredAttractions.length === 0 && !loading ? (
          <div className="no-results">
            <div className="no-results-content">
              <Camera size={64} className="no-results-icon" />
              <h3>No attractions found</h3>
              <p>Try searching for specific places like "Sigiriya", "Kandy Temple", or "Galle Fort".</p>
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  console.log('🔄 Resetting search and filters');
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDistrict('all');
                  if (mapsReady) {
                    loadInitialAttractions();
                  } else {
                    filterDemoData();
                  }
                }}
              >
                Reset Search
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
                    {attraction.website ? (
                      <a 
                        href={attraction.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Visit Website
                      </a>
                    ) : (
                      <button className="btn-primary">
                        Learn More
                      </button>
                    )}
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