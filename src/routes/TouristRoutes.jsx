import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TouristDashboard from '../pages/tourist/TripDashboard';
import ProtectedRoute from './ProtectedRoute';

const TouristRoutes = () => (
  <Routes>
    <Route path="/" element={
      <ProtectedRoute allowedRoles={["tourist"]}>
        <TouristDashboard />
      </ProtectedRoute>
    } />
    {/* Add more admin-specific routes here */}
    <Route path="*" element={<Navigate to="/tourist" replace />} />
  </Routes>
);

export default TouristRoutes;
