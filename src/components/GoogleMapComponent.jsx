import React, { useState, useEffect, useRef } from "react";
import "./GoogleMapComponent.css";

const GoogleMapComponent = ({ tourLocation, meetingPoint, tourTitle }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log("Google Maps API Key:", GOOGLE_MAPS_API_KEY);

  // Mock coordinates for different locations in Sri Lanka
  const getCoordinates = (location) => {
    const locationMap = {
      "Sigiriya, Central Province": { lat: 7.957, lng: 80.7603 },
      "Kandy, Central Province": { lat: 7.2906, lng: 80.6337 },
      "Galle, Southern Province": { lat: 6.0329, lng: 80.2168 },
      "Ella, Uva Province": { lat: 6.8667, lng: 81.05 },
      "Yala, Southern Province": { lat: 6.3725, lng: 81.5185 },
      "Colombo, Western Province": { lat: 6.9271, lng: 79.8612 },
      "Nuwara Eliya, Central Province": { lat: 6.9497, lng: 80.7891 },
    };

    return locationMap[location] || { lat: 7.8731, lng: 80.7718 }; // Default to Sri Lanka center
  };

  const coordinates = getCoordinates(tourLocation);

  // Load Google Maps API
  useEffect(() => {
    console.log("GoogleMapComponent: Starting Google Maps API load...");
    console.log("API Key available:", !!GOOGLE_MAPS_API_KEY);

    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API key not found");
      setMapError(true);
      return;
    }

    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      console.log("Google Maps API already loaded");
      setGoogleMapsLoaded(true);
      return;
    }

    console.log("Creating new Google Maps script...");
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps API loaded successfully");
      setGoogleMapsLoaded(true);
    };

    script.onerror = (error) => {
      console.error("Failed to load Google Maps API:", error);
      setMapError(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [GOOGLE_MAPS_API_KEY]);

  // Initialize Google Map
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current) {
      return;
    }

    // Prevent multiple map initializations
    if (mapInstanceRef.current) {
      setMapLoaded(true);
      return;
    }

    console.log("Initializing Google Map with coordinates:", coordinates);

    // Set a timeout fallback in case the map doesn't load properly
    const timeoutId = setTimeout(() => {
      if (!mapInstanceRef.current) {
        console.error(
          "Map initialization timeout - falling back to error state"
        );
        setMapError(true);
      }
    }, 10000); // 10 second timeout

    try {
      // Create map instance
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 15,
        mapTypeId: "roadmap",
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      console.log("Map instance created successfully");

      // Clear timeout since map was created
      clearTimeout(timeoutId);

      // Wait for map to be ready
      window.google.maps.event.addListenerOnce(
        mapInstanceRef.current,
        "idle",
        () => {
          console.log("Map is ready and idle");

          try {
            // Create marker after map is ready
            markerRef.current = new window.google.maps.Marker({
              position: coordinates,
              map: mapInstanceRef.current,
              title: `${tourTitle} - ${meetingPoint}`,
              animation: window.google.maps.Animation.BOUNCE,
              // Use a simple default marker first to avoid SVG issues
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#3B82F6",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 3,
              },
            });

            console.log("Marker created successfully");

            // Create info window
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
              <div style="padding: 10px; max-width: 250px;">
                <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">${tourTitle}</h4>
                <p style="margin: 4px 0; color: #6b7280; font-size: 14px;"><strong>Meeting Point:</strong> ${meetingPoint}</p>
                <p style="margin: 4px 0; color: #6b7280; font-size: 14px;"><strong>Location:</strong> ${tourLocation}</p>
                <p style="margin: 8px 0 0 0; color: #3b82f6; font-size: 12px;">🔴 Live Tour Location</p>
              </div>
            `,
            });

            // Add click listener to marker
            markerRef.current.addListener("click", () => {
              infoWindow.open(mapInstanceRef.current, markerRef.current);
            });

            // Stop bouncing animation after 3 seconds
            setTimeout(() => {
              if (markerRef.current) {
                markerRef.current.setAnimation(null);
              }
            }, 3000);

            // Set map as loaded
            setMapLoaded(true);
            console.log("Map initialization completed");
          } catch (markerError) {
            console.error("Error creating marker:", markerError);
            // Still set map as loaded even if marker fails
            setMapLoaded(true);
          }
        }
      );

      // Fallback: Set map as loaded after a short delay if idle event doesn't fire
      setTimeout(() => {
        if (mapInstanceRef.current && !mapLoaded) {
          console.log("Map idle event didn't fire, setting as loaded anyway");
          setMapLoaded(true);
        }
      }, 3000);
    } catch (error) {
      console.error("Error initializing Google Map:", error);
      clearTimeout(timeoutId);
      setMapError(true);
    }
  }, [googleMapsLoaded, coordinates, tourTitle, meetingPoint, tourLocation]);

  const handleGetDirections = () => {
    const { lat, lng } = coordinates;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  const handleShareLocation = () => {
    const { lat, lng } = coordinates;
    const locationUrl = `https://www.google.com/maps?q=${lat},${lng}`;

    if (navigator.share) {
      navigator.share({
        title: `${tourTitle} Location`,
        text: `Meeting point: ${meetingPoint}`,
        url: locationUrl,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard
        .writeText(locationUrl)
        .then(() => {
          alert("Location link copied to clipboard!");
        })
        .catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = locationUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          alert("Location link copied to clipboard!");
        });
    }
  };

  const handleCenterMap = () => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setCenter(coordinates);
      mapInstanceRef.current.setZoom(15);
      markerRef.current.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.setAnimation(null);
        }
      }, 2000);
    }
  };

  if (mapError) {
    return (
      <div className="map-container">
        <div className="map-error">
          <h4>Map Unavailable</h4>
          <p>
            Unable to load Google Maps. Please check your internet connection or
            API key.
          </p>
          <div className="location-fallback">
            <p>
              <strong>Location:</strong> {tourLocation}
            </p>
            <p>
              <strong>Meeting Point:</strong> {meetingPoint}
            </p>
            <p>
              <strong>Coordinates:</strong> {coordinates.lat.toFixed(4)}°N,{" "}
              {coordinates.lng.toFixed(4)}°E
            </p>
            <div className="error-actions">
              <button
                onClick={() => {
                  setMapError(false);
                  setMapLoaded(false);
                  setGoogleMapsLoaded(false);
                  // Force re-initialization
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current = null;
                  }
                }}
                className="btn-retry"
              >
                🔄 Retry
              </button>
              <button onClick={handleGetDirections} className="btn-directions">
                📍 Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div className="map-header">
        <h4>Current Location & Meeting Point</h4>
        <div className="map-actions">
          <button onClick={handleGetDirections} className="btn-directions">
            🧭 Get Directions
          </button>
          <button onClick={handleShareLocation} className="btn-share">
            📤 Share Location
          </button>
          {mapLoaded && (
            <button onClick={handleCenterMap} className="btn-center">
              🎯 Center Map
            </button>
          )}
        </div>
      </div>

      <div className="map-wrapper">
        {!googleMapsLoaded || !mapLoaded ? (
          <div className="map-loading">
            <div className="loading-spinner"></div>
            <p>
              {!googleMapsLoaded
                ? "Loading Google Maps..."
                : "Initializing map..."}
            </p>
          </div>
        ) : (
          <div className="map-display">
            {/* Real Google Map Container */}
            <div
              ref={mapRef}
              className="google-map"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>

      <div className="location-info">
        <div className="info-item">
          <span className="info-label">Tour Location:</span>
          <span className="info-value">{tourLocation}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Meeting Point:</span>
          <span className="info-value">{meetingPoint}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Coordinates:</span>
          <span className="info-value">
            {coordinates.lat.toFixed(4)}°N, {coordinates.lng.toFixed(4)}°E
          </span>
        </div>
      </div>

      <div className="map-features">
        <div className="feature-item">
          <span className="feature-icon">🚗</span>
          <span>Parking available nearby</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🚌</span>
          <span>Public transport accessible</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">📱</span>
          <span>Real-time GPS tracking</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🗺️</span>
          <span>Interactive Google Maps</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
