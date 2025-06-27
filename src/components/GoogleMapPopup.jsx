import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Google Maps JS API loader (optional: you can use a loader library if you want)
const loadGoogleMapsScript = (apiKey, callback) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
};

const mapPopupStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.45)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "'Roboto', 'Outfit', sans-serif"
};

const popupCardStyles = {
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  padding: '0',
  minWidth: 340,
  maxWidth: '90vw',
  minHeight: 340,
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  border: '1px solid #000',
};

const headerStyles = {
  background: '#1FA9FF',
  color: 'white',
  fontWeight: 700,
  fontSize: 20,
  padding: '18px 24px',
  fontFamily: "'Outfit', 'Roboto', sans-serif",
  borderBottom: '1px solid #e5e7eb',
  letterSpacing: 0.5,
};

const closeBtnStyles = {
  position: 'absolute',
  top: 18,
  right: 24,
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: 24,
  cursor: 'pointer',
  zIndex: 2,
};

const mapContainerStyles = {
  width: '100%',
  height: 400,
  minHeight: 300,
  borderRadius: '0 0 16px 16px',
};

const GoogleMapPopup = ({ open, onClose, location, apiKey }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!open) return;
    if (!location || !location.lat || !location.lng) return;
    loadGoogleMapsScript(apiKey, () => {
      if (mapRef.current) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: location.lat, lng: location.lng },
          zoom: 15,
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#333' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#1FA9FF' }],
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f9fafb' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#d1fae5' }],
            },
          ],
        });
        new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance.current,
          title: location.name || 'Location',
        });
      }
    });
  }, [open, location, apiKey]);

  if (!open) return null;

  return (
    <div style={mapPopupStyles}>
      <div style={{ ...popupCardStyles, position: 'relative' }}>
        <div style={headerStyles}>
          {location.name || 'Location'}
          <button style={closeBtnStyles} onClick={onClose} aria-label="Close">×</button>
        </div>
        <div style={mapContainerStyles} ref={mapRef} />
      </div>
    </div>
  );
};

GoogleMapPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    name: PropTypes.string,
  }).isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default GoogleMapPopup;
