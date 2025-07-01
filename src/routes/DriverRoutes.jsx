import { Routes, Route, Navigate } from 'react-router-dom';
import DriverDashboardLayout from '../components/DriverDashboardLayout';
import ProtectedRoute from './ProtectedRoute';

const DriverRoutes = () => (
  <Routes>
    <Route path="/" element={
      <ProtectedRoute allowedRoles={["driver"]}>
        <DriverDashboardLayout />
      </ProtectedRoute>
    } />
    <Route path="dashboard" element={
      <ProtectedRoute allowedRoles={["driver"]}>
        <DriverDashboardLayout />
      </ProtectedRoute>
    } />
    <Route path="ride-requests" element={
      <ProtectedRoute allowedRoles={["driver"]}>
        <DriverDashboardLayout />
      </ProtectedRoute>
    } />
    <Route path="rides" element={
      <ProtectedRoute allowedRoles={["driver"]}>
        <DriverDashboardLayout />
      </ProtectedRoute>
    } />
    <Route path="earnings" element={
      <ProtectedRoute allowedRoles={["driver"]}>
        <DriverDashboardLayout />
      </ProtectedRoute>
    } />
    <Route path="profile" element={
      <ProtectedRoute allowedRoles={["driver"]}>
        <DriverDashboardLayout />
      </ProtectedRoute>
    } />
    <Route path="*" element={<Navigate to="/driver/" replace />} />
  </Routes>
);

export default DriverRoutes;
