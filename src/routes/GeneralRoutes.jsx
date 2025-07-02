import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ProfessionalSignupPage from '../pages/ProfessionalSignupPage';
import Questionnaire from '../pages/tourist/Trip-plan-questionnaire';
import TripDashboard from '../pages/tourist/TripDashboard';
import TripsPublic from '../pages/tourist/TripsPublic';
import Pools from '../pages/tourist/Pools';
import DashboardLayout from '../components/DashboardLayout';
import ExplorePage from '../pages/tourist/Explore';
import TripSummary from '../pages/tourist/TripSummary';
import TripsOverview from '../pages/tourist/TripsOverview';

// --- Protected Route Imports ---
import ProtectedRoute from './ProtectedRoute';

// --- Public/Protected wrappers (should be imported from App.jsx or refactored to a shared location) ---
// You may want to move these to a shared file if used elsewhere
const ProtectedRouteWrapper = ({ children }) => {
  // ...existing code for auth check...
  return children;
};
const PublicRoute = ({ children }) => {
  // ...existing code for public route check...
  return children;
};
// -----------------------------------------------------------------------------------------------

const GeneralRoutes = () => (
  <Routes>
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
        <ExplorePage />
      </PublicRoute>
    } />
    <Route path="/plan-trip" element={
      <PublicRoute>
        <Questionnaire />
      </PublicRoute>
    } />
    <Route path="/trip-dashboard" element={
      <PublicRoute>
        <TripDashboard />
      </PublicRoute>
    } />
    <Route path="/trips-public" element={
      <PublicRoute>
        <TripsPublic />
      </PublicRoute>
    } />
    <Route path="/trips" element={
      <PublicRoute>
        <TripsPublic />
      </PublicRoute>
    } />
    <Route path="/trip-summary" element={
      <PublicRoute>
        <TripSummary />
      </PublicRoute>
    } />
    <Route path="/trips-overview" element={
      <PublicRoute>
        <TripsOverview />
      </PublicRoute>
    } />
    {/* Pools Management */}
    <Route path="/pools" element={
      <PublicRoute>
        <Pools />
      </PublicRoute>
    } />
    {/* Traveler/General User Dashboard */}
    <Route path="/dashboard/*" element={
      <ProtectedRouteWrapper>
        <DashboardLayout />
      </ProtectedRouteWrapper>
    } />
    <Route path="/profile" element={
      <ProtectedRouteWrapper>
        <DashboardLayout />
      </ProtectedRouteWrapper>
    } />
    {/* Catch-all for general routes */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default GeneralRoutes;
