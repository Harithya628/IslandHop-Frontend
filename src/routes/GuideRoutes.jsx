import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GuideDashboard from '../pages/guide/GuideDashboard';
import ProtectedRoute from './ProtectedRoute';

const GuideRoutes = () => (
  <Routes>
    <Route path="/" element={
      <ProtectedRoute allowedRoles={["guide"]}>
        <GuideDashboard />
      </ProtectedRoute>
    } />
    {/* Add more guide-specific routes here */}
    <Route path="*" element={<Navigate to="/guide" replace />} />
  </Routes>
);

export default GuideRoutes;
