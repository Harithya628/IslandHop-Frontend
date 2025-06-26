import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';


// --- Route Imports ---
import SupportRoutes from './routes/AdminRoutes';
import AdminRoutes from './routes/SupportRoutes';
import GuideRoutes from './routes/GuideRoutes';
import DriverRoutes from './routes/DriverRoutes';
import TouristRoutes from './routes/TouristRoutes'; 
import GeneralRoutes from './routes/GeneralRoutes'; 

// --- Protected Route Imports ---
import ProtectedRoute from './routes/ProtectedRoute'; 

// --- End Route Imports ---


import './App.css'

function App() {
  return (
    <Routes>
      {/* General/Public and Tourist Routes */}
      <Route path="/*" element={<GeneralRoutes />} />
      {/* Admin Dashboard */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      {/* Support Dashboard */}
      <Route path="/support/*" element={<SupportRoutes />} />
      {/* Tourist Dashboard */}
      <Route path="/tourist/*" element={<TouristRoutes />} /> 
      {/* Driver Dashboard */}
      <Route path="/driver/*" element={<DriverRoutes />} />
      {/* Guide Dashboard */}
      <Route path="/guide/*" element={<GuideRoutes />} />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
