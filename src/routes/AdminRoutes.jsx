import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserAccounts from '../pages/admin/UserAccounts';
import Analytics from '../pages/admin/Analytics';
import APIs from '../pages/admin/APIs';
import Hosting from '../pages/admin/Hosting';
import Notifications from '../pages/admin/Notifications';
import Reviews from '../pages/admin/Reviews';
import SystemHistory from '../pages/admin/SystemHistory';
import SystemSettings from '../pages/admin/SystemSettings';
import UpdateUserProfile from '../pages/admin/UpdateUserProfile';
import AISettings from '../pages/admin/AISettings';
import Accounts from '../pages/admin/Accounts';
import ProtectedRoute from './ProtectedRoute';

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    } />
    <Route path="user-accounts" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <UserAccounts />
      </ProtectedRoute>
    } />
    <Route path="analytics" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Analytics />
      </ProtectedRoute>
    } />
    <Route path="apis" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <APIs />
      </ProtectedRoute>
    } />
    <Route path="hosting" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Hosting />
      </ProtectedRoute>
    } />
    <Route path="notifications" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Notifications />
      </ProtectedRoute>
    } />
    <Route path="reviews" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Reviews />
      </ProtectedRoute>
    } />
    <Route path="system-history" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <SystemHistory />
      </ProtectedRoute>
    } />
    <Route path="system-settings" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <SystemSettings />
      </ProtectedRoute>
    } />
    <Route path="update-user-profile" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <UpdateUserProfile />
      </ProtectedRoute>
    } />
    <Route path="ai-settings" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AISettings />
      </ProtectedRoute>
    } />
    <Route path="accounts" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Accounts />
      </ProtectedRoute>
    } />
    {/* Add more admin-specific routes here */}
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
);

export default AdminRoutes;
