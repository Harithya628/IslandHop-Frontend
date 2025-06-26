import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SupportDashboard from '../pages/support/SupportDashboard';
import ChatEmailSupport from '../pages/support/ChatEmailSupport';
import ComplaintReports from '../pages/support/ComplaintReports';
import EscalateIssue from '../pages/support/EscalateIssue';
import LostItemTracker from '../pages/support/LostItemTracker';
import PanicAlerts from '../pages/support/PanicAlerts';
import ProfileDetails from '../pages/support/ProfileDetails';
import RefundCompensation from '../pages/support/RefundCompensation';
import ResolveComplaint from '../pages/support/ResolveComplaint';
import ViewTickets from '../pages/support/ViewTickets';
import SupportSidebar from '../components/sidebars/SupportSidebar';
import ProtectedRoute from './ProtectedRoute';

const SupportRoutes = () => (
  <>
    <SupportSidebar />
    <div style={{
      marginLeft: 240, // width of expanded sidebar
      transition: 'margin-left 0.2s',
      minHeight: '100vh',
      background: '#f8fafc',
      position: 'relative',
      zIndex: 1
    }}>
      <Routes>
        <Route path="dashboard" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <SupportDashboard />
          </ProtectedRoute>
        } />
        <Route path="chat" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <ChatEmailSupport />
          </ProtectedRoute>
        } />
        <Route path="complaints" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <ComplaintReports />
          </ProtectedRoute>
        } />
        <Route path="escalate" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <EscalateIssue />
          </ProtectedRoute>
        } />
        <Route path="lost-items" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <LostItemTracker />
          </ProtectedRoute>
        } />
        <Route path="alerts" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <PanicAlerts />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <ProfileDetails />
          </ProtectedRoute>
        } />
        <Route path="refunds" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <RefundCompensation />
          </ProtectedRoute>
        } />
        <Route path="resolve-complaint" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <ResolveComplaint />
          </ProtectedRoute>
        } />
        <Route path="tickets" element={
          <ProtectedRoute allowedRoles={["support"]}>
            <ViewTickets />
          </ProtectedRoute>
        } />
        {/* Redirect /support to /support/dashboard */}
        <Route path="/" element={<Navigate to="/support/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/support/dashboard" replace />} />
      </Routes>
    </div>
  </>
);

export default SupportRoutes;