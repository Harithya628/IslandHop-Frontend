import React, { useState } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  CogIcon,
  ServerIcon,
  RocketLaunchIcon,
  BoltIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  BellIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
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

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    overview: false,
    configuration: false,
    userManagement: false,
  });

  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes("/admin/dashboard")) return "AdminDashboard";
    if (path.includes("/admin/analytics")) return "Analytics";
    if (path.includes("/admin/system-settings")) return "SystemSettings";
    if (path.includes("/admin/hosting")) return "Hosting";
    if (path.includes("/admin/ai-settings")) return "AISettings";
    if (path.includes("/admin/apis")) return "APIs";
    if (path.includes("/admin/system-history")) return "SystemHistory";
    if (path.includes("/admin/user-accounts")) return "UserAccounts";
    if (path.includes("/admin/accounts")) return "Accounts";
    if (path.includes("/admin/reviews")) return "Reviews";
    if (path.includes("/admin/notifications")) return "Notifications";
    if (path.includes("/admin/profile")) return "ProfileDetails";
    return "";
  };
  const currentPage = getActivePage();

  // Sidebar navigation handler
  const handleNav = (page) => {
    switch (page) {
      case "AdminDashboard":
        navigate("/admin/dashboard");
        break;
      case "Analytics":
        navigate("/admin/analytics");
        break;
      case "SystemSettings":
        navigate("/admin/system-settings");
        break;
      case "Hosting":
        navigate("/admin/hosting");
        break;
      case "AISettings":
        navigate("/admin/ai-settings");
        break;
      case "APIs":
        navigate("/admin/apis");
        break;
      case "SystemHistory":
        navigate("/admin/system-history");
        break;
      case "UserAccounts":
        navigate("/admin/user-accounts");
        break;
      case "Accounts":
        navigate("/admin/accounts");
        break;
      case "Reviews":
        navigate("/admin/reviews");
        break;
      case "Notifications":
        navigate("/admin/notifications");
        break;
      case "ProfileDetails":
        navigate("/admin/profile");
        break;
      case "SignOut":
        handleSignOut();
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // Navigate to login page
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (section) => {
    if (isCollapsed) return; // Don't allow section toggling when sidebar is collapsed
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
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            OVERVIEW
            <span
              className={`chevron-icon ${
                collapsedSections.overview ? "rotated" : ""
              }`}
            >
              ›
            </span>
          </div>
          <div
            className={`section-content ${
              collapsedSections.overview ? "collapsed" : "expanded"
            }`}
          >
            <div style={{ animationDelay: "0ms" }}>
              <SidebarItem
                icon={<HomeIcon className="w-4.5 h-4.5" />}
                label="Home"
                isActive={currentPage === "AdminDashboard"}
                onClick={() => handleNav("AdminDashboard")}
                iconColor="#3B82F6"
              />
            </div>
          </div>

          <div
            className="sidebar-section-title"
            onClick={() => toggleSection("configuration")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            CONFIGURATION & STATUS
            <span
              className={`chevron-icon ${
                collapsedSections.configuration ? "rotated" : ""
              }`}
            >
              ›
            </span>
          </div>
          <div
            className={`section-content ${
              collapsedSections.configuration ? "collapsed" : "expanded"
            }`}
          >
            <div style={{ animationDelay: "0ms" }}>
              <SidebarItem
                icon={<ChartBarIcon className="w-4.5 h-4.5" />}
                label="Analytics"
                isActive={currentPage === "Analytics"}
                onClick={() => handleNav("Analytics")}
                iconColor="#7C3AED"
              />
            </div>
            <div style={{ animationDelay: "50ms" }}>
              <SidebarItem
                icon={<CogIcon className="w-4.5 h-4.5" />}
                label="System Settings"
                isActive={currentPage === "SystemSettings"}
                onClick={() => handleNav("SystemSettings")}
                iconColor="#6B7280"
              />
            </div>
            <div style={{ animationDelay: "100ms" }}>
              <SidebarItem
                icon={<ServerIcon className="w-4.5 h-4.5" />}
                label="Hosting"
                isActive={currentPage === "Hosting"}
                onClick={() => handleNav("Hosting")}
                iconColor="#059669"
              />
            </div>
            <div style={{ animationDelay: "150ms" }}>
              <SidebarItem
                icon={<RocketLaunchIcon className="w-4.5 h-4.5" />}
                label="AI Settings"
                isActive={currentPage === "AISettings"}
                onClick={() => handleNav("AISettings")}
                iconColor="#8B5CF6"
              />
            </div>
            <div style={{ animationDelay: "200ms" }}>
              <SidebarItem
                icon={<BoltIcon className="w-4.5 h-4.5" />}
                label="APIs"
                isActive={currentPage === "APIs"}
                onClick={() => handleNav("APIs")}
                iconColor="#F59E0B"
              />
            </div>
            <div style={{ animationDelay: "250ms" }}>
              <SidebarItem
                icon={<ClockIcon className="w-4.5 h-4.5" />}
                label="System History"
                isActive={currentPage === "SystemHistory"}
                onClick={() => handleNav("SystemHistory")}
                iconColor="#06B6D4"
              />
            </div>
          </div>

          <div
            className="sidebar-section-title"
            onClick={() => toggleSection("userManagement")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            USER MANAGEMENT
            <span
              className={`chevron-icon ${
                collapsedSections.userManagement ? "rotated" : ""
              }`}
            >
              ›
            </span>
          </div>
          <div
            className={`section-content ${
              collapsedSections.userManagement ? "collapsed" : "expanded"
            }`}
          >
            {" "}
            <div style={{ animationDelay: "0ms" }}>
              <SidebarItem
                icon={<UsersIcon className="w-4.5 h-4.5" />}
                label="User Accounts"
                isActive={currentPage === "UserAccounts"}
                onClick={() => handleNav("UserAccounts")}
                iconColor="#6366F1"
              />
            </div>
            <div style={{ animationDelay: "50ms" }}>
              <SidebarItem
                icon={<StarIcon className="w-4.5 h-4.5" />}
                label="Reviews"
                isActive={currentPage === "Reviews"}
                onClick={() => handleNav("Reviews")}
                iconColor="#EF4444"
              />
            </div>
            <div style={{ animationDelay: "100ms" }}>
              <SidebarItem
                icon={<BellIcon className="w-4.5 h-4.5" />}
                label="Notifications"
                isActive={currentPage === "Notifications"}
                onClick={() => handleNav("Notifications")}
                iconColor="#14B8A6"
              />
            </div>
          </div>

          {/* Profile Section at Bottom */}
          <div className="sidebar-profile-section">
            <SidebarItem
              icon={<UserIcon className="w-4.5 h-4.5" />}
              label="Profile"
              isActive={currentPage === "ProfileDetails"}
              onClick={() => handleNav("ProfileDetails")}
              iconColor="#10B981"
            />
          </div>

          {/* Sign Out Section at Very Bottom */}
          <div className="sidebar-signout-section">
            <SidebarItem
              icon={<ArrowLeftOnRectangleIcon className="w-4.5 h-4.5" />}
              label="Sign Out"
              isActive={false}
              onClick={() => handleNav("SignOut")}
              iconColor="#EF4444"
            />
          </div>
        </>
      )}

      {isCollapsed && (
        <div className="collapsed-nav">
          <SidebarItem
            icon={<HomeIcon className="w-5 h-5" />}
            isActive={currentPage === "AdminDashboard"}
            onClick={() => handleNav("AdminDashboard")}
            iconColor="#3B82F6"
            collapsed={true}
            title="Admin Dashboard"
            className="collapsed-item-home"
          />

          {/* Divider between OVERVIEW and CONFIGURATION & STATUS sections */}
          <div className="collapsed-section-divider"></div>

          <SidebarItem
            icon={<ChartBarIcon className="w-5 h-5" />}
            isActive={currentPage === "Analytics"}
            onClick={() => handleNav("Analytics")}
            iconColor="#7C3AED"
            collapsed={true}
            title="Analytics"
            className="collapsed-item-analytics"
          />
          <SidebarItem
            icon={<CogIcon className="w-5 h-5" />}
            isActive={currentPage === "SystemSettings"}
            onClick={() => handleNav("SystemSettings")}
            iconColor="#6B7280"
            collapsed={true}
            title="System Settings"
            className="collapsed-item-settings"
          />
          <SidebarItem
            icon={<ServerIcon className="w-5 h-5" />}
            isActive={currentPage === "Hosting"}
            onClick={() => handleNav("Hosting")}
            iconColor="#059669"
            collapsed={true}
            title="Hosting"
            className="collapsed-item-hosting"
          />
          <SidebarItem
            icon={<RocketLaunchIcon className="w-5 h-5" />}
            isActive={currentPage === "AISettings"}
            onClick={() => handleNav("AISettings")}
            iconColor="#8B5CF6"
            collapsed={true}
            title="AI Settings"
            className="collapsed-item-ai"
          />
          <SidebarItem
            icon={<BoltIcon className="w-5 h-5" />}
            isActive={currentPage === "APIs"}
            onClick={() => handleNav("APIs")}
            iconColor="#F59E0B"
            collapsed={true}
            title="APIs"
            className="collapsed-item-apis"
          />
          <SidebarItem
            icon={<ClockIcon className="w-5 h-5" />}
            isActive={currentPage === "SystemHistory"}
            onClick={() => handleNav("SystemHistory")}
            iconColor="#06B6D4"
            collapsed={true}
            title="System History"
            className="collapsed-item-history"
          />

          {/* Divider between CONFIGURATION & STATUS and USER MANAGEMENT sections */}
          <div className="collapsed-section-divider"></div>

          <SidebarItem
            icon={<UsersIcon className="w-5 h-5" />}
            isActive={currentPage === "Accounts"}
            onClick={() => handleNav("Accounts")}
            iconColor="#6366F1"
            collapsed={true}
            title="Accounts"
            className="collapsed-item-accounts"
          />
          <SidebarItem
            icon={<StarIcon className="w-5 h-5" />}
            isActive={currentPage === "Reviews"}
            onClick={() => handleNav("Reviews")}
            iconColor="#EF4444"
            collapsed={true}
            title="Reviews"
            className="collapsed-item-reviews"
          />
          <SidebarItem
            icon={<BellIcon className="w-5 h-5" />}
            isActive={currentPage === "Notifications"}
            onClick={() => handleNav("Notifications")}
            iconColor="#14B8A6"
            collapsed={true}
            title="Notifications"
            className="collapsed-item-notifications"
          />

          {/* Profile Section at Bottom */}
          <div className="collapsed-section-divider"></div>
          <SidebarItem
            icon={<UserIcon className="w-5 h-5" />}
            isActive={currentPage === "ProfileDetails"}
            onClick={() => handleNav("ProfileDetails")}
            iconColor="#10B981"
            collapsed={true}
            title="Profile"
            className="collapsed-item-profile"
          />

          {/* Sign Out Section at Very Bottom */}
          <SidebarItem
            icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
            isActive={false}
            onClick={() => handleNav("SignOut")}
            iconColor="#EF4444"
            collapsed={true}
            title="Sign Out"
            className="collapsed-item-signout"
          />
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
