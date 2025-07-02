import React, { useState } from "react";
import {
  HomeIcon,
  MapIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  UserIcon,
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

const GuideSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    general: false,
    tours: false,
    communication: false,
    profile: false,
  });

  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes("/guide/dashboard")) return "GuideDashboard";
    if (path.includes("/guide/overview")) return "GuideOverview";
    if (path.includes("/guide/my-tours")) return "MyTours";
    if (path.includes("/guide/tour-requests")) return "TourRequests";
    if (path.includes("/guide/tours/")) return "TourDetails";
    if (path.includes("/guide/chat")) return "Chat";
    if (path.includes("/guide/reviews")) return "Reviews";
    if (path.includes("/guide/profile")) return "GuideProfile";
    return "";
  };
  const currentPage = getActivePage();

  // Sidebar navigation handler
  const handleNav = (page) => {
    switch (page) {
      case "GuideDashboard":
        navigate("/guide/dashboard");
        break;
      case "GuideOverview":
        navigate("/guide/overview");
        break;
      case "MyTours":
        navigate("/guide/my-tours");
        break;
      case "TourRequests":
        navigate("/guide/tour-requests");
        break;
      case "Chat":
        navigate("/guide/chat");
        break;
      case "Reviews":
        navigate("/guide/reviews");
        break;
      case "GuideProfile":
        navigate("/guide/profile");
        break;
      default:
        break;
    }
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
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
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
          {/* GENERAL Section */}
          <div
            className="sidebar-section-title first"
            onClick={() => toggleSection("general")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>GENERAL</span>
            <span
              className={`chevron-icon ${
                collapsedSections.general ? "rotated" : ""
              }`}
            >
              ›
            </span>
          </div>
          <div
            className={`section-content ${
              collapsedSections.general ? "collapsed" : "expanded"
            }`}
          >
            <div style={{ animationDelay: "0ms" }}>
              <SidebarItem
                icon={<HomeIcon className="w-4.5 h-4.5" />}
                label="Dashboard"
                isActive={currentPage === "GuideDashboard"}
                onClick={() => handleNav("GuideDashboard")}
                iconColor="#3B82F6"
              />
            </div>
            <div style={{ animationDelay: "50ms" }}>
              <SidebarItem
                icon={<ChartBarIcon className="w-4.5 h-4.5" />}
                label="Overview"
                isActive={currentPage === "GuideOverview"}
                onClick={() => handleNav("GuideOverview")}
                iconColor="#06B6D4"
              />
            </div>
          </div>

          {/* TOUR MANAGEMENT Section */}
          <div
            className="sidebar-section-title"
            onClick={() => toggleSection("tours")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            TOUR MANAGEMENT
            <span
              className={`chevron-icon ${
                collapsedSections.tours ? "rotated" : ""
              }`}
            >
              ›
            </span>
          </div>
          <div
            className={`section-content ${
              collapsedSections.tours ? "collapsed" : "expanded"
            }`}
          >
            <div style={{ animationDelay: "0ms" }}>
              <SidebarItem
                icon={<MapIcon className="w-4.5 h-4.5" />}
                label="My Tours"
                isActive={currentPage === "MyTours"}
                onClick={() => handleNav("MyTours")}
                iconColor="#10B981"
              />
            </div>
            <div style={{ animationDelay: "50ms" }}>
              <SidebarItem
                icon={<ClipboardDocumentListIcon className="w-4.5 h-4.5" />}
                label="Tour Requests"
                isActive={currentPage === "TourRequests"}
                onClick={() => handleNav("TourRequests")}
                iconColor="#F59E0B"
              />
            </div>
          </div>

          {/* COMMUNICATION Section */}
          <div
            className="sidebar-section-title"
            onClick={() => toggleSection("communication")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            COMMUNICATION
            <span
              className={`chevron-icon ${
                collapsedSections.communication ? "rotated" : ""
              }`}
            >
              ›
            </span>
          </div>
          <div
            className={`section-content ${
              collapsedSections.communication ? "collapsed" : "expanded"
            }`}
          >
            <div style={{ animationDelay: "0ms" }}>
              <SidebarItem
                icon={<ChatBubbleLeftRightIcon className="w-4.5 h-4.5" />}
                label="Chat"
                isActive={currentPage === "Chat"}
                onClick={() => handleNav("Chat")}
                iconColor="#8B5CF6"
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
          </div>

          {/* PROFILE Section */}
          <div
            className="sidebar-section-title"
            onClick={() => toggleSection("profile")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            PROFILE
            <span
              className={`chevron-icon ${
                collapsedSections.profile ? "rotated" : ""
              }`}
            >
              ›
            </span>
          </div>
          <div
            className={`section-content ${
              collapsedSections.profile ? "collapsed" : "expanded"
            }`}
          >
            <div style={{ animationDelay: "0ms" }}>
              <SidebarItem
                icon={<UserIcon className="w-4.5 h-4.5" />}
                label="My Profile"
                isActive={currentPage === "GuideProfile"}
                onClick={() => handleNav("GuideProfile")}
                iconColor="#EC4899"
              />
            </div>
          </div>
        </>
      )}

      {/* Collapsed Navigation */}
      {isCollapsed && (
        <div className="collapsed-nav">
          {/* GENERAL Section */}
          <SidebarItem
            icon={<HomeIcon className="w-5 h-5" />}
            isActive={currentPage === "GuideDashboard"}
            onClick={() => handleNav("GuideDashboard")}
            iconColor="#3B82F6"
            collapsed={true}
            title="Dashboard"
            className="collapsed-item-dashboard"
          />
          <SidebarItem
            icon={<ChartBarIcon className="w-5 h-5" />}
            isActive={currentPage === "GuideOverview"}
            onClick={() => handleNav("GuideOverview")}
            iconColor="#06B6D4"
            collapsed={true}
            title="Overview"
            className="collapsed-item-overview"
          />

          {/* Divider between GENERAL and TOUR MANAGEMENT sections */}
          <div className="collapsed-section-divider"></div>

          {/* TOUR MANAGEMENT Section */}
          <SidebarItem
            icon={<MapIcon className="w-5 h-5" />}
            isActive={currentPage === "MyTours"}
            onClick={() => handleNav("MyTours")}
            iconColor="#10B981"
            collapsed={true}
            title="My Tours"
            className="collapsed-item-tours"
          />
          <SidebarItem
            icon={<ClipboardDocumentListIcon className="w-5 h-5" />}
            isActive={currentPage === "TourRequests"}
            onClick={() => handleNav("TourRequests")}
            iconColor="#F59E0B"
            collapsed={true}
            title="Tour Requests"
            className="collapsed-item-requests"
          />

          {/* Divider between TOUR MANAGEMENT and COMMUNICATION sections */}
          <div className="collapsed-section-divider"></div>

          {/* COMMUNICATION Section */}
          <SidebarItem
            icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
            isActive={currentPage === "Chat"}
            onClick={() => handleNav("Chat")}
            iconColor="#8B5CF6"
            collapsed={true}
            title="Chat"
            className="collapsed-item-chat"
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

          {/* Divider between COMMUNICATION and PROFILE sections */}
          <div className="collapsed-section-divider"></div>

          {/* PROFILE Section */}
          <SidebarItem
            icon={<UserIcon className="w-5 h-5" />}
            isActive={currentPage === "GuideProfile"}
            onClick={() => handleNav("GuideProfile")}
            iconColor="#EC4899"
            collapsed={true}
            title="My Profile"
            className="collapsed-item-profile"
          />
        </div>
      )}
    </div>
  );
};

export default GuideSidebar;
