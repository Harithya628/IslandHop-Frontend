import React from 'react';
import { Navigate } from 'react-router-dom';

// Dummy support agent check (replace with real logic)
const isSupportAgent = () => true;

const ProtectedRoute = ({ children }) => {
  return isSupportAgent() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;