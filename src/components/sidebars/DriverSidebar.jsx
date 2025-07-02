import React, { useState } from "react";
import {
  HomeIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { 
  MessageSquare, 
  Car,
  User
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";
import islandHopLogo from "../../assets/IslandHop.png";
import islandHopIcon from "../../assets/islandHopIcon.png";
import { useNavigate, useLocation } from "react-router-dom";

const DriverSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    overview: false,
    rides: false,
  });

  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes("/driver/dashboard")) return "DriverDashboard";
    if (path.includes("/driver/ride-requests")) return "RideRequests";
    if (path.includes("/driver/rides")) return "Rides";
    if (path.includes("/driver/earnings")) return "Earnings";
    if (path.includes("/driver/profile")) return "Profile";
    return "";
  };
  
  const currentPage = getActivePage();

  const handleNavigation = (page, path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title="Toggle sidebar"
      >
        <Bars3Icon className="toggle-icon" />
        <span className="fallback-icon">☰</span>
      </button>

      {!isCollapsed && (
        <div className="sidebar-logo">
          <img src={islandHopIcon} alt="IslandHop Icon" className="logo-icon" />
          <img
            src={islandHopLogo}
            alt="IslandHop Logo"
            className="logo-image"
          />
        </div>
      )}
      {isCollapsed && (
        <div className="sidebar-logo-collapsed">
          <img
            src={islandHopIcon}
            alt="IslandHop Icon"
            className="logo-icon-collapsed"
          />
        </div>
      )}

      {!isCollapsed && (
        <>
          <div
            className="sidebar-section-title first"
            onClick={() => toggleSection("overview")}
          >
            <span>Overview</span>
            {collapsedSections.overview ? (
              <ChevronRightIcon className="chevron-icon" />
            ) : (
              <ChevronLeftIcon className="chevron-icon" />
            )}
          </div>
          {!collapsedSections.overview && (
            <div className="sidebar-section">
              <SidebarItem
                icon={<HomeIcon className="w-4.5 h-4.5" />}
                label="Dashboard"
                isActive={currentPage === "DriverDashboard"}
                onClick={() => handleNavigation("DriverDashboard", "/driver/dashboard")}
                iconColor="#3B82F6"
              />
              <SidebarItem
                icon={<ChartBarIcon className="w-4.5 h-4.5" />}
                label="Earnings"
                isActive={currentPage === "Earnings"}
                onClick={() => handleNavigation("Earnings", "/driver/earnings")}
                iconColor="#3B82F6"
              />
            </div>
          )}

          <div
            className="sidebar-section-title"
            onClick={() => toggleSection("rides")}
          >
            <span>Ride Management</span>
            {collapsedSections.rides ? (
              <ChevronRightIcon className="chevron-icon" />
            ) : (
              <ChevronLeftIcon className="chevron-icon" />
            )}
          </div>
          {!collapsedSections.rides && (
            <div className="sidebar-section">
              <SidebarItem
                icon={<MessageSquare className="w-4.5 h-4.5" />}
                label="Ride Requests"
                isActive={currentPage === "RideRequests"}
                onClick={() => handleNavigation("RideRequests", "/driver/ride-requests")}
                iconColor="#3B82F6"
              />
              <SidebarItem
                icon={<Car className="w-4.5 h-4.5" />}
                label="Rides"
                isActive={currentPage === "Rides"}
                onClick={() => handleNavigation("Rides", "/driver/rides")}
                iconColor="#3B82F6"
              />
            </div>
          )}

          <div className="sidebar-section">
            <SidebarItem
              icon={<User className="w-4.5 h-4.5" />}
              label="Profile"
              isActive={currentPage === "Profile"}
              onClick={() => handleNavigation("Profile", "/driver/profile")}
              iconColor="#3B82F6"
            />
          </div>
        </>
      )}

      {isCollapsed && (
        <div className="sidebar-collapsed-items">
          <SidebarItem
            icon={<HomeIcon className="w-4.5 h-4.5" />}
            isActive={currentPage === "DriverDashboard"}
            onClick={() => handleNavigation("DriverDashboard", "/driver/dashboard")}
            iconColor="#3B82F6"
            collapsed
          />
          <SidebarItem
            icon={<MessageSquare className="w-4.5 h-4.5" />}
            isActive={currentPage === "RideRequests"}
            onClick={() => handleNavigation("RideRequests", "/driver/ride-requests")}
            iconColor="#3B82F6"
            collapsed
          />
          <SidebarItem
            icon={<Car className="w-4.5 h-4.5" />}
            isActive={currentPage === "Rides"}
            onClick={() => handleNavigation("Rides", "/driver/rides")}
            iconColor="#3B82F6"
            collapsed
          />
          <SidebarItem
            icon={<ChartBarIcon className="w-4.5 h-4.5" />}
            isActive={currentPage === "Earnings"}
            onClick={() => handleNavigation("Earnings", "/driver/earnings")}
            iconColor="#3B82F6"
            collapsed
          />
          <SidebarItem
            icon={<User className="w-4.5 h-4.5" />}
            isActive={currentPage === "Profile"}
            onClick={() => handleNavigation("Profile", "/driver/profile")}
            iconColor="#3B82F6"
            collapsed
          />
        </div>
      )}
    </div>
  );
};

export default DriverSidebar;
