import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import DriverSidebar from "./sidebars/DriverSidebar";

// Import driver pages (we'll create these)
import DriverDashboard from "../pages/driver/DriverDashboard";
import RideRequests from "../pages/driver/RideRequests";
import Rides from "../pages/driver/Rides";
import Earnings from "../pages/driver/Earnings";
import Profile from "../pages/driver/Profile";

import "./DashboardLayout.css";

const DriverDashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("DriverDashboard");
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Handle direct navigation to different pages
    const path = location.pathname;
    if (path.includes("/driver/dashboard")) setCurrentPage("DriverDashboard");
    else if (path.includes("/driver/ride-requests")) setCurrentPage("RideRequests");
    else if (path.includes("/driver/rides")) setCurrentPage("Rides");
    else if (path.includes("/driver/earnings")) setCurrentPage("Earnings");
    else if (path.includes("/driver/profile")) setCurrentPage("Profile");
  }, [location]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "DriverDashboard":
        return <DriverDashboard onPageChange={setCurrentPage} />;
      case "RideRequests":
        return <RideRequests />;
      case "Rides":
        return <Rides />;
      case "Earnings":
        return <Earnings />;
      case "Profile":
        return <Profile />;
      default:
        return <DriverDashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="dashboard-layout">
      <DriverSidebar />
      <div className="main-content">
        <div className="page-container">{renderCurrentPage()}</div>
      </div>
    </div>
  );
};

export default DriverDashboardLayout;
