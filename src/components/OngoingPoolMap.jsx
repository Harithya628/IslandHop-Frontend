import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates for Kandy, Nuwara Eliya, Ella
const itineraryCoords = [
  { name: 'Kandy', lat: 7.2906, lng: 80.6337 },
  { name: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891 },
  { name: 'Ella', lat: 6.8667, lng: 81.0467 },
];

const polyline = itineraryCoords.map(d => [d.lat, d.lng]);

const OngoingPoolMap = () => (
  <MapContainer
    center={[7.1, 80.8]}
    zoom={8}
    scrollWheelZoom={false}
    style={{ height: 220, width: '100%', borderRadius: 14, marginTop: 16 }}
    dragging={false}
    doubleClickZoom={false}
    zoomControl={false}
    attributionControl={false}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    {itineraryCoords.map((dest, idx) => (
      <Marker key={dest.name} position={[dest.lat, dest.lng]} />
    ))}
    <Polyline positions={polyline} color="#27ae60" weight={4} />
  </MapContainer>
);

export default OngoingPoolMap;
