import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import DriverSidebar from "./sidebars/DriverSidebar";

// Import driver pages (we'll create these)
import DriverDashboard from "../pages/driver/DriverDashboard";
import Rides from "../pages/driver/Rides";
import Schedule from "../pages/driver/Schedule";
import History from "../pages/driver/History";
import Passengers from "../pages/driver/Passengers";
import Messages from "../pages/driver/Messages";
import Earnings from "../pages/driver/Earnings";
import Profile from "../pages/driver/Profile";
import Settings from "../pages/driver/Settings";

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
    else if (path.includes("/driver/rides")) setCurrentPage("Rides");
    else if (path.includes("/driver/schedule")) setCurrentPage("Schedule");
    else if (path.includes("/driver/history")) setCurrentPage("History");
    else if (path.includes("/driver/passengers")) setCurrentPage("Passengers");
    else if (path.includes("/driver/messages")) setCurrentPage("Messages");
    else if (path.includes("/driver/earnings")) setCurrentPage("Earnings");
    else if (path.includes("/driver/profile")) setCurrentPage("Profile");
    else if (path.includes("/driver/settings")) setCurrentPage("Settings");
  }, [location]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "DriverDashboard":
        return <DriverDashboard onPageChange={setCurrentPage} />;
      case "Rides":
        return <Rides />;
      case "Schedule":
        return <Schedule />;
      case "History":
        return <History />;
      case "Passengers":
        return <Passengers />;
      case "Messages":
        return <Messages />;
      case "Earnings":
        return <Earnings />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings />;
      default:
        return <DriverDashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="dashboard-layout">
      <DriverSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="main-content">
        <div className="page-container">{renderCurrentPage()}</div>
      </div>
    </div>
  );
};

export default DriverDashboardLayout;
