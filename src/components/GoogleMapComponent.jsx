import React, { useEffect, useRef } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * GoogleMapComponent - A React component for displaying Google Maps with markers
 * @param {Object} props - Component props
 * @param {string} props.tourLocation - Main tour destination (default: "Colombo, Sri Lanka")
 * @param {string} props.meetingPoint - Meeting point location (default: "Central Park, Colombo")
 * @param {string} props.tourTitle - Title for the info window (default: "Tour Location")
 * @param {string} props.height - Map height (default: "400px")
 * @param {string} props.width - Map width (default: "100%")
 */

const loadGoogleMapsScript = (apiKey, callback) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  const existingScript = document.getElementById('google-maps-script');
  if (existingScript) {
    existingScript.addEventListener('load', callback);
    return;
  }

  const script = document.createElement('script');
  script.id = 'google-maps-script';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.addEventListener('load', callback);
  script.addEventListener('error', () => {
    console.error('Failed to load Google Maps API');
  });
  document.head.appendChild(script);
};

const geocodeLocation = (location, callback) => {
  if (!window.google || !window.google.maps) {
    callback({ lat: 6.9271, lng: 79.8612 }); // Default to Colombo
    return;
  }

  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: location }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const location = results[0].geometry.location;
      callback({ lat: location.lat(), lng: location.lng() });
    } else {
      console.error('Geocoding failed:', status);
      callback({ lat: 6.9271, lng: 79.8612 }); // Default to Colombo
    }
  });
};

const GoogleMapComponent = ({
  tourLocation = "Colombo, Sri Lanka",
  meetingPoint = "Central Park, Colombo",
  tourTitle = "Tour Location",
  height = "400px",
  width = "100%"
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.warn('Google Maps API key not found');
      return;
    }

    const initializeMap = () => {
      if (!mapRef.current) return;

      // Default center (Colombo, Sri Lanka)
      const defaultCenter = { lat: 6.9271, lng: 79.8612 };

      // Initialize map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: defaultCenter,
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Geocode and add tour location marker
      geocodeLocation(tourLocation, (tourCoords) => {
        const tourMarker = new window.google.maps.Marker({
          position: tourCoords,
          map: mapInstanceRef.current,
          title: tourTitle,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        });

        const tourInfoWindow = new window.google.maps.InfoWindow({
          content: `<div><h3>${tourTitle}</h3><p>${tourLocation}</p></div>`
        });

        tourMarker.addListener('click', () => {
          tourInfoWindow.open(mapInstanceRef.current, tourMarker);
        });

        // Geocode and add meeting point marker
        geocodeLocation(meetingPoint, (meetingCoords) => {
          const meetingMarker = new window.google.maps.Marker({
            position: meetingCoords,
            map: mapInstanceRef.current,
            title: 'Meeting Point',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }
          });

          const meetingInfoWindow = new window.google.maps.InfoWindow({
            content: `<div><h3>Meeting Point</h3><p>${meetingPoint}</p></div>`
          });

          meetingMarker.addListener('click', () => {
            meetingInfoWindow.open(mapInstanceRef.current, meetingMarker);
          });

          // Adjust map bounds to show both markers
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(tourCoords);
          bounds.extend(meetingCoords);
          mapInstanceRef.current.fitBounds(bounds);
        });
      });
    };

    loadGoogleMapsScript(GOOGLE_MAPS_API_KEY, initializeMap);
  }, [tourLocation, meetingPoint, tourTitle]);

  // Fallback display when API key is not available
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div 
        style={{ 
          height, 
          width, 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9f9f9',
          color: '#666',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>{tourTitle}</h3>
        <p style={{ margin: '5px 0' }}><strong>Tour Location:</strong> {tourLocation}</p>
        <p style={{ margin: '5px 0' }}><strong>Meeting Point:</strong> {meetingPoint}</p>
        <small style={{ marginTop: '10px', opacity: 0.7 }}>
          Google Maps API key not configured
        </small>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height, 
        width, 
        border: '1px solid #ddd', 
        borderRadius: '8px' 
      }} 
    />
  );
};

export default GoogleMapComponent;