import React, { useState } from "react";
import {
  HomeIcon,
  MapIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
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
    profile: false,
  });

  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes("/driver/dashboard")) return "DriverDashboard";
    if (path.includes("/driver/rides")) return "Rides";
    if (path.includes("/driver/schedule")) return "Schedule";
    if (path.includes("/driver/history")) return "History";
    if (path.includes("/driver/passengers")) return "Passengers";
    if (path.includes("/driver/messages")) return "Messages";
    if (path.includes("/driver/earnings")) return "Earnings";
    if (path.includes("/driver/profile")) return "Profile";
    if (path.includes("/driver/settings")) return "Settings";
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
    <div
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 100,
        width: isCollapsed ? 60 : 240,
      }}
    >
      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title="Toggle sidebar"
      >
        ☰
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
                icon={HomeIcon}
                text="Dashboard"
                active={currentPage === "DriverDashboard"}
                onClick={() => handleNavigation("DriverDashboard", "/driver/dashboard")}
              />
              <SidebarItem
                icon={ChartBarIcon}
                text="Earnings"
                active={currentPage === "Earnings"}
                onClick={() => handleNavigation("Earnings", "/driver/earnings")}
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
                icon={MapIcon}
                text="Active Rides"
                active={currentPage === "Rides"}
                onClick={() => handleNavigation("Rides", "/driver/rides")}
              />
              <SidebarItem
                icon={CalendarIcon}
                text="Schedule"
                active={currentPage === "Schedule"}
                onClick={() => handleNavigation("Schedule", "/driver/schedule")}
              />
              <SidebarItem
                icon={ClockIcon}
                text="Ride History"
                active={currentPage === "History"}
                onClick={() => handleNavigation("History", "/driver/history")}
              />
              <SidebarItem
                icon={UsersIcon}
                text="Passengers"
                active={currentPage === "Passengers"}
                onClick={() => handleNavigation("Passengers", "/driver/passengers")}
              />
              <SidebarItem
                icon={ChatBubbleLeftRightIcon}
                text="Messages"
                active={currentPage === "Messages"}
                onClick={() => handleNavigation("Messages", "/driver/messages")}
              />
            </div>
          )}

          <div
            className="sidebar-section-title"
            onClick={() => toggleSection("profile")}
          >
            <span>Profile & Settings</span>
            {collapsedSections.profile ? (
              <ChevronRightIcon className="chevron-icon" />
            ) : (
              <ChevronLeftIcon className="chevron-icon" />
            )}
          </div>
          {!collapsedSections.profile && (
            <div className="sidebar-section">
              <SidebarItem
                icon={UsersIcon}
                text="Profile"
                active={currentPage === "Profile"}
                onClick={() => handleNavigation("Profile", "/driver/profile")}
              />
              <SidebarItem
                icon={CogIcon}
                text="Settings"
                active={currentPage === "Settings"}
                onClick={() => handleNavigation("Settings", "/driver/settings")}
              />
            </div>
          )}
        </>
      )}

      {isCollapsed && (
        <div className="sidebar-collapsed-items">
          <SidebarItem
            icon={HomeIcon}
            active={currentPage === "DriverDashboard"}
            onClick={() => handleNavigation("DriverDashboard", "/driver/dashboard")}
            collapsed
          />
          <SidebarItem
            icon={MapIcon}
            active={currentPage === "Rides"}
            onClick={() => handleNavigation("Rides", "/driver/rides")}
            collapsed
          />
          <SidebarItem
            icon={CalendarIcon}
            active={currentPage === "Schedule"}
            onClick={() => handleNavigation("Schedule", "/driver/schedule")}
            collapsed
          />
          <SidebarItem
            icon={ClockIcon}
            active={currentPage === "History"}
            onClick={() => handleNavigation("History", "/driver/history")}
            collapsed
          />
          <SidebarItem
            icon={ChartBarIcon}
            active={currentPage === "Earnings"}
            onClick={() => handleNavigation("Earnings", "/driver/earnings")}
            collapsed
          />
          <SidebarItem
            icon={UsersIcon}
            active={currentPage === "Profile"}
            onClick={() => handleNavigation("Profile", "/driver/profile")}
            collapsed
          />
        </div>
      )}
    </div>
  );
};

export default DriverSidebar;
