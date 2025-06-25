import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SupportDashboardLayout from '../components/SupportDashboardLayout';

// Dummy auth for support agent (replace with real logic)
const isSupportAgent = () => true;

const ProtectedRoute = ({ children }) => {
  return isSupportAgent() ? children : <Navigate to="/login" replace />;
};

const SupportRoutes = () => (
  <ProtectedRoute>
    <SupportDashboardLayout />
  </ProtectedRoute>
);

export default SupportRoutes;