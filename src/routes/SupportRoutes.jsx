import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SupportDashboard from '../pages/support/SupportDashboard';
import ResolveComplaint from '../pages/support/ResolveComplaint';
import EscalateIssue from '../pages/support/EscalateIssue';
import RefundCompensation from '../pages/support/RefundCompensation';
import ComplaintReports from '../pages/support/ComplaintReports';
import LostItemTracker from '../pages/support/LostItemTracker';
import PanicAlerts from '../pages/support/PanicAlerts';
import ChatEmailSupport from '../pages/support/ChatEmailSupport';
import ViewTickets from '../pages/support/ViewTickets';

import SupportSidebar from '../components/sidebars/SupportSidebar';

// Dummy auth for support agent (replace with real logic)
const isSupportAgent = () => true;

const ProtectedRoute = ({ children }) => {
  return isSupportAgent() ? children : <Navigate to="/login" replace />;
};

const SupportLayout = ({ children }) => {
  const path = window.location.pathname;
  let currentPage = 'SupportDashboard';
  if (path.includes('resolve-complaint')) currentPage = 'ResolveComplaint';
  else if (path.includes('escalate-issue')) currentPage = 'EscalateIssue';
  else if (path.includes('refund-compensation')) currentPage = 'RefundCompensation';
  else if (path.includes('complaint-reports')) currentPage = 'ComplaintReports';
  else if (path.includes('lost-item-tracker')) currentPage = 'LostItemTracker';
  else if (path.includes('panic-alerts')) currentPage = 'PanicAlerts';
  else if (path.includes('chat-email-support')) currentPage = 'ChatEmailSupport';
  else if (path.includes('dashboard')) currentPage = 'SupportDashboard';
  else if (path.includes('view-tickets')) currentPage = 'ViewTickets';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SupportSidebar currentPage={currentPage} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {children}
      </div>
    </div>
  );
};

const SupportRoutes = () => (
  <SupportLayout>
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <SupportDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <SupportDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="view-tickets"
        element={
          <ProtectedRoute>
            <ViewTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="resolve-complaint"
        element={
          <ProtectedRoute>
            <ResolveComplaint />
          </ProtectedRoute>
        }
      />
      <Route
        path="escalate-issue"
        element={
          <ProtectedRoute>
            <EscalateIssue />
          </ProtectedRoute>
        }
      />
      <Route
        path="refund-compensation"
        element={
          <ProtectedRoute>
            <RefundCompensation />
          </ProtectedRoute>
        }
      />
      <Route
        path="complaint-reports"
        element={
          <ProtectedRoute>
            <ComplaintReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="lost-item-tracker"
        element={
          <ProtectedRoute>
            <LostItemTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="panic-alerts"
        element={
          <ProtectedRoute>
            <PanicAlerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="chat-email-support"
        element={
          <ProtectedRoute>
            <ChatEmailSupport />
          </ProtectedRoute>
        }
      />
      {/* Catch-all: redirect to dashboard */}
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  </SupportLayout>
);

export default SupportRoutes;