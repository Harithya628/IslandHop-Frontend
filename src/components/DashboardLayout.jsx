import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import AdminSidebar from './sidebars/AdminSidebar';

import AdminDashboard from '../pages/admin/AdminDashboard';
import Analytics from '../pages/admin/Analytics';
import SystemSettings from '../pages/admin/SystemSettings';
import Hosting from '../pages/admin/Hosting';
import AISettings from '../pages/admin/AISettings';
import APIs from '../pages/admin/APIs';
import SystemHistory from '../pages/admin/SystemHistory';
import Accounts from '../pages/admin/Accounts';
import Reviews from '../pages/admin/Reviews';
import Notifications from '../pages/admin/Notifications';

import './DashboardLayout.css';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('AdminDashboard');
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Handle direct navigation to /profile
    if (location.pathname === '/profile') {
      setCurrentPage('Profile');
    }
  }, [location]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'AdminDashboard': return <AdminDashboard onPageChange={setCurrentPage} />;
      case 'Profile': return <Accounts />;
      case 'Analytics': return <Analytics />;
      case 'SystemSettings': return <SystemSettings />;
      case 'Hosting': return <Hosting />;
      case 'AISettings': return <AISettings />;
      case 'APIs': return <APIs />;
      case 'SystemHistory': return <SystemHistory />;
      case 'Accounts': return <Accounts />;
      case 'Reviews': return <Reviews />;
      case 'Notifications': return <Notifications />;
      default: return <AdminDashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="main-content">
        <div className="page-container">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
