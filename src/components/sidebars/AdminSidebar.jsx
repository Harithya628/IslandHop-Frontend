import React, { useState } from 'react';
import { 
  HiHome,
  HiChartBar,
  HiCog,
  HiServer,
  HiLightningBolt,
  HiZap,
  HiClipboardList,
  HiUserGroup,
  HiStar,
  HiBell,
  HiChevronDown
} from 'react-icons/hi';
import SidebarItem from './SidebarItem';
import './Sidebar.css';
import islandHopLogo from '../../assets/IslandHop.png';
import islandHopIcon from '../../assets/islandHopIcon.png';

const AdminSidebar = ({ currentPage, onPageChange }) => {
  const [collapsedSections, setCollapsedSections] = useState({
    overview: false,
    configuration: false,
    userManagement: false
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={islandHopIcon} alt="IslandHop Icon" className="logo-icon" />
        <img src={islandHopLogo} alt="IslandHop Logo" className="logo-image" />
      </div>

      <div 
        className="sidebar-section-title first"
        onClick={() => toggleSection('overview')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        OVERVIEW
        <span className={`chevron-icon ${collapsedSections.overview ? 'rotated' : ''}`}>
          <HiChevronDown size={14} />
        </span>
      </div>
      <div className={`section-content ${collapsedSections.overview ? 'collapsed' : 'expanded'}`}>
        <div style={{ animationDelay: '0ms' }}>
          <SidebarItem
            icon={<HiHome size={18} />}
            label="Home"
            isActive={currentPage === 'AdminDashboard'}
            onClick={() => onPageChange('AdminDashboard')}
            iconColor="#3B82F6"
          />
        </div>
      </div>

      <div 
        className="sidebar-section-title"
        onClick={() => toggleSection('configuration')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        CONFIGURATION & STATUS
        <span className={`chevron-icon ${collapsedSections.configuration ? 'rotated' : ''}`}>
          <HiChevronDown size={14} />
        </span>
      </div>
      <div className={`section-content ${collapsedSections.configuration ? 'collapsed' : 'expanded'}`}>
        <div style={{ animationDelay: '0ms' }}>
          <SidebarItem
            icon={<HiChartBar size={18} />}
            label="Analytics"
            isActive={currentPage === 'Analytics'}
            onClick={() => onPageChange('Analytics')}
            iconColor="#7C3AED"
          />
        </div>
        <div style={{ animationDelay: '50ms' }}>
          <SidebarItem
            icon={<HiCog size={18} />}
            label="System Settings"
            isActive={currentPage === 'SystemSettings'}
            onClick={() => onPageChange('SystemSettings')}
            iconColor="#6B7280"
          />
        </div>
        <div style={{ animationDelay: '100ms' }}>
          <SidebarItem
            icon={<HiServer size={18} />}
            label="Hosting"
            isActive={currentPage === 'Hosting'}
            onClick={() => onPageChange('Hosting')}
            iconColor="#059669"
          />
        </div>
        <div style={{ animationDelay: '150ms' }}>
          <SidebarItem
            icon={<HiLightningBolt size={18} />}
            label="AI Settings"
            isActive={currentPage === 'AISettings'}
            onClick={() => onPageChange('AISettings')}
            iconColor="#8B5CF6"
          />
        </div>
        <div style={{ animationDelay: '200ms' }}>
          <SidebarItem
            icon={<HiZap size={18} />}
            label="APIs"
            isActive={currentPage === 'APIs'}
            onClick={() => onPageChange('APIs')}
            iconColor="#F59E0B"
          />
        </div>
        <div style={{ animationDelay: '250ms' }}>
          <SidebarItem
            icon={<HiClipboardList size={18} />}
            label="System History"
            isActive={currentPage === 'SystemHistory'}
            onClick={() => onPageChange('SystemHistory')}
            iconColor="#06B6D4"
          />
        </div>
      </div>

      <div 
        className="sidebar-section-title"
        onClick={() => toggleSection('userManagement')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        USER MANAGEMENT
        <span className={`chevron-icon ${collapsedSections.userManagement ? 'rotated' : ''}`}>
          <HiChevronDown size={14} />
        </span>
      </div>
      <div className={`section-content ${collapsedSections.userManagement ? 'collapsed' : 'expanded'}`}>
        <div style={{ animationDelay: '0ms' }}>
          <SidebarItem
            icon={<HiUserGroup size={18} />}
            label="Accounts"
            isActive={currentPage === 'Accounts'}
            onClick={() => onPageChange('Accounts')}
            iconColor="#6366F1"
          />
        </div>
        <div style={{ animationDelay: '50ms' }}>
          <SidebarItem
            icon={<HiStar size={18} />}
            label="Reviews"
            isActive={currentPage === 'Reviews'}
            onClick={() => onPageChange('Reviews')}
            iconColor="#EF4444"
          />
        </div>
        <div style={{ animationDelay: '100ms' }}>
          <SidebarItem
            icon={<HiBell size={18} />}
            label="Notifications"
            isActive={currentPage === 'Notifications'}
            onClick={() => onPageChange('Notifications')}
            iconColor="#14B8A6"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
