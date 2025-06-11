import React, { useState } from 'react';
import { 
  HomeIcon, 
  MapIcon, 
  TruckIcon, 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid';
import { ChevronDownIcon, Bars3Icon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import SidebarItem from './SidebarItem';
import './Sidebar.css';
import islandHopLogo from '../../assets/IslandHop.png';
import islandHopIcon from '../../assets/islandHopIcon.png';

const Sidebar = ({ currentPage, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    general: false,
    trips: false,
    messaging: false
  });

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (section) => {
    if (isCollapsed) return; // Don't allow section toggling when sidebar is collapsed
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
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
          <img src={islandHopLogo} alt="IslandHop Logo" className="logo-image" />
        </div>
      )}
      {isCollapsed && (
        <div className="sidebar-logo-collapsed">
          <img src={islandHopIcon} alt="IslandHop Icon" className="logo-icon-collapsed" />
        </div>
      )}

      {!isCollapsed && (
        <>
          <div 
            className="sidebar-section-title first"
            onClick={() => toggleSection('general')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            GENERAL
            <span className={`chevron-icon ${collapsedSections.general ? 'rotated' : ''}`}>
              <ChevronDownIcon className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className={`section-content ${collapsedSections.general ? 'collapsed' : 'expanded'}`}>
            <div style={{ animationDelay: '0ms' }}>
              <SidebarItem
                icon={<HomeIcon className="w-4.5 h-4.5" />}
                label="Home"
                isActive={currentPage === 'Home'}
                onClick={() => onPageChange('Home')}
                iconColor="#3B82F6"
              />
            </div>
          </div>

          <div 
            className="sidebar-section-title"
            onClick={() => toggleSection('trips')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            TRIPS
            <span className={`chevron-icon ${collapsedSections.trips ? 'rotated' : ''}`}>
              <ChevronDownIcon className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className={`section-content ${collapsedSections.trips ? 'collapsed' : 'expanded'}`}>
            <div style={{ animationDelay: '0ms' }}>
              <SidebarItem
                icon={<MapIcon className="w-4.5 h-4.5" />}
                label="Trips"
                isActive={currentPage === 'Trips'}
                onClick={() => onPageChange('Trips')}
                iconColor="#10B981"
              />
            </div>
            <div style={{ animationDelay: '50ms' }}>
              <SidebarItem
                icon={<TruckIcon className="w-4.5 h-4.5" />}
                label="Ride Pools"
                isActive={currentPage === 'RidePools'}
                onClick={() => onPageChange('RidePools')}
                iconColor="#F59E0B"
              />
            </div>
          </div>

          <div 
            className="sidebar-section-title"
            onClick={() => toggleSection('messaging')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            MESSAGING & SUPPORT
            <span className={`chevron-icon ${collapsedSections.messaging ? 'rotated' : ''}`}>
              <ChevronDownIcon className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className={`section-content ${collapsedSections.messaging ? 'collapsed' : 'expanded'}`}>
            <div style={{ animationDelay: '0ms' }}>
              <SidebarItem
                icon={<ChatBubbleLeftRightIcon className="w-4.5 h-4.5" />}
                label="Messaging"
                isActive={currentPage === 'Messaging'}
                onClick={() => onPageChange('Messaging')}
                iconColor="#8B5CF6"
              />
            </div>
            <div style={{ animationDelay: '50ms' }}>
              <SidebarItem
                icon={<PhoneIcon className="w-4.5 h-4.5" />}
                label="Support"
                isActive={currentPage === 'Support'}
                onClick={() => onPageChange('Support')}
                iconColor="#06B6D4"
              />
            </div>
            <div style={{ animationDelay: '100ms' }}>
              <SidebarItem
                icon={<ExclamationTriangleIcon className="w-4.5 h-4.5" />}
                label="Emergency"
                isActive={currentPage === 'Emergency'}
                onClick={() => onPageChange('Emergency')}
                iconColor="#EF4444"
              />
            </div>
          </div>
        </>
      )}

      {isCollapsed && (
        <div className="collapsed-nav">
          <SidebarItem
            icon={<HomeIcon className="w-5 h-5" />}
            isActive={currentPage === 'Home'}
            onClick={() => onPageChange('Home')}
            iconColor="#3B82F6"
            collapsed={true}
            title="Home"
          />
          <SidebarItem
            icon={<MapIcon className="w-5 h-5" />}
            isActive={currentPage === 'Trips'}
            onClick={() => onPageChange('Trips')}
            iconColor="#10B981"
            collapsed={true}
            title="Trips"
          />
          <SidebarItem
            icon={<TruckIcon className="w-5 h-5" />}
            isActive={currentPage === 'RidePools'}
            onClick={() => onPageChange('RidePools')}
            iconColor="#F59E0B"
            collapsed={true}
            title="Ride Pools"
          />
          <SidebarItem
            icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
            isActive={currentPage === 'Messaging'}
            onClick={() => onPageChange('Messaging')}
            iconColor="#8B5CF6"
            collapsed={true}
            title="Messaging"
          />
          <SidebarItem
            icon={<PhoneIcon className="w-5 h-5" />}
            isActive={currentPage === 'Support'}
            onClick={() => onPageChange('Support')}
            iconColor="#06B6D4"
            collapsed={true}
            title="Support"
          />
          <SidebarItem
            icon={<ExclamationTriangleIcon className="w-5 h-5" />}
            isActive={currentPage === 'Emergency'}
            onClick={() => onPageChange('Emergency')}
            iconColor="#EF4444"
            collapsed={true}
            title="Emergency"
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;