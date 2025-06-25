import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfessionalSignupPage from './pages/ProfessionalSignupPage'
import DashboardLayout from './components/DashboardLayout'
import Questionnaire from './pages/traveler/Trip-plan-questionnaire'
import TripDashboard from './pages/traveler/TripDashboard';

// --- Support Agent Imports ---
import SupportRoutes from './routes/SupportRoutes';
// ----------------------------

import './App.css'

// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Public route wrapper component (accessible only when not authenticated)
const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (user) return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <PublicRoute>
          <LandingPage />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/signup" element={
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      } />
      <Route path="/signup/professional" element={
        <PublicRoute>
          <ProfessionalSignupPage />
        </PublicRoute>
      } />
      <Route path="/explore" element={
        <PublicRoute>
          <Questionnaire />
        </PublicRoute>
      } />
      <Route path="/trip-dashboard" element={
        <PublicRoute>
          <TripDashboard />
        </PublicRoute>
      } />

      {/* Traveler/General User Dashboard */}
      <Route path="/dashboard/*" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      } />

      {/* --- Support Agent Routes (all under /support/*) --- */}
      <Route path="/support/*" element={<SupportRoutes />} />
      {/* --------------------------------------------------- */}

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
