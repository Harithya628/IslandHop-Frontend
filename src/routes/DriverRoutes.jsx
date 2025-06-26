import { Routes, Route, Navigate } from 'react-router-dom';
//import DriverDashboard from '../pages/driver/DriverDashboard';
import ProtectedRoute from './ProtectedRoute';

const DriverRoutes = () => (
  <Routes>
    <Route path="/" element={
      <ProtectedRoute allowedRoles={["driver"]}>
        <DriverDashboard />
      </ProtectedRoute>
    } />
    {/* Add more driver-specific routes here */}
    <Route path="*" element={<Navigate to="/driver" replace />} />
  </Routes>
);

export default DriverRoutes;
