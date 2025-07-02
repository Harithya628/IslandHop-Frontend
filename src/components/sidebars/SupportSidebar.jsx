import React, { useState } from 'react';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  ExclamationCircleIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import './Sidebar.css';
import islandHopLogo from '../../assets/IslandHop.png';
import islandHopIcon from '../../assets/islandHopIcon.png';

const navLinks = [
  {
    label: 'Home',
    icon: <HomeIcon className="w-4.5 h-4.5" />,
    page: 'SupportDashboard',
    iconColor: '#1E90FF',
  },
  {
    label: 'Tasks',
    icon: <ClipboardDocumentListIcon className="w-4.5 h-4.5" />,
    page: 'ViewTickets',
    iconColor: '#3B82F6',
  },
  {
    label: 'Complains',
    icon: <ExclamationCircleIcon className="w-4.5 h-4.5" />,
    page: 'ResolveComplaint',
    iconColor: '#10B981',
  },
  {
    label: 'Escalate Issue',
    icon: <ArrowTrendingUpIcon className="w-4.5 h-4.5" />,
    page: 'EscalateIssue',
    iconColor: '#F59E0B',
  },
  {
    label: 'Refund/Compensation',
    icon: <CurrencyDollarIcon className="w-4.5 h-4.5" />,
    page: 'RefundCompensation',
    iconColor: '#06B6D4',
  },
  {
    label: 'Lost Items',
    icon: <MagnifyingGlassIcon className="w-4.5 h-4.5" />,
    page: 'LostItemTracker',
    iconColor: '#6366F1',
  },
  {
    label: 'Alerts',
    icon: <ExclamationTriangleIcon className="w-4.5 h-4.5" />,
    page: 'PanicAlerts',
    iconColor: '#EF4444',
  },
  {
    label: 'Chats',
    icon: <ChatBubbleLeftRightIcon className="w-4.5 h-4.5" />,
    page: 'ChatEmailSupport',
    iconColor: '#1976D2',
  },
  {
    label: 'Profile',
    icon: <UserCircleIcon className="w-4.5 h-4.5" />,
    page: 'ProfileDetails',
    iconColor: '#8B5CF6',
  },
];

const bottomNavLinks = [
  {
    label: 'Sign Out',
    icon: <ArrowLeftOnRectangleIcon className="w-4.5 h-4.5" />,
    page: 'SignOut',
    iconColor: '#EF4444',
  },
];

const SupportSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes('/support/dashboard')) return 'SupportDashboard';
    if (path.includes('/support/tickets')) return 'ViewTickets';
    if (path.includes('/support/complaints')) return 'ResolveComplaint';
    if (path.includes('/support/escalate')) return 'EscalateIssue';
    if (path.includes('/support/refunds')) return 'RefundCompensation';
    if (path.includes('/support/lost-items')) return 'LostItemTracker';
    if (path.includes('/support/alerts')) return 'PanicAlerts';
    if (path.includes('/support/chat')) return 'ChatEmailSupport';
    if (path.includes('/support/profile')) return 'ProfileDetails';
    return '';
  };
  const currentPage = getActivePage();

  const handleNav = (page) => {
    switch (page) {
      case 'SupportDashboard':
        navigate('/support/dashboard');
        break;
      case 'ViewTickets':
        navigate('/support/tickets');
        break;
      case 'ResolveComplaint':
        navigate('/support/complaints');
        break;
      case 'EscalateIssue':
        navigate('/support/escalate');
        break;
      case 'RefundCompensation':
        navigate('/support/refunds');
        break;
      case 'LostItemTracker':
        navigate('/support/lost-items');
        break;
      case 'PanicAlerts':
        navigate('/support/alerts');
        break;
      case 'ChatEmailSupport':
        navigate('/support/chat');
        break;
      case 'ProfileDetails':
        navigate('/support/profile');
        break;
      case 'SignOut':
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

  const toggleSidebar = () => setIsCollapsed((c) => !c);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title="Toggle sidebar"
      >
        ☰
      </button>

      {!isCollapsed ? (
        <div className="sidebar-logo">
          <img src={islandHopIcon} alt="IslandHop Icon" className="logo-icon" />
          <img src={islandHopLogo} alt="IslandHop Logo" className="logo-image" />
        </div>
      ) : (
        <div className="sidebar-logo-collapsed">
          <img src={islandHopIcon} alt="IslandHop Icon" className="logo-icon-collapsed" />
        </div>
      )}

      {!isCollapsed ? (
        <>
          <div className="sidebar-section-title first" style={{ marginBottom: 24 }}>
            CUSTOMER SUPPORT
          </div>
          <div className="section-content expanded">
            {navLinks.map((item, idx) => (
              <div key={item.page} style={{ animationDelay: `${idx * 40}ms` }}>
                <SidebarItem
                  icon={item.icon}
                  label={item.label}
                  isActive={currentPage === item.page}
                  onClick={() => handleNav(item.page)}
                  iconColor={item.iconColor}
                />
              </div>
            ))}
          </div>

          {/* Sign Out Section at Very Bottom */}
          <div className="sidebar-signout-section">
            {bottomNavLinks.map((item) => (
              <SidebarItem
                key={item.page}
                icon={item.icon}
                label={item.label}
                isActive={false}
                onClick={() => handleNav(item.page)}
                iconColor={item.iconColor}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="collapsed-nav">
          {navLinks.map((item, idx) => (
            <SidebarItem
              key={item.page}
              icon={item.icon}
              isActive={currentPage === item.page}
              onClick={() => handleNav(item.page)}
              iconColor={item.iconColor}
              collapsed={true}
              title={item.label}
              className={`collapsed-item-${item.page.toLowerCase()}`}
            />
          ))}

          {/* Sign Out Section at Very Bottom */}
          <div className="collapsed-section-divider"></div>
          {bottomNavLinks.map((item) => (
            <SidebarItem
              key={item.page}
              icon={item.icon}
              isActive={false}
              onClick={() => handleNav(item.page)}
              iconColor={item.iconColor}
              collapsed={true}
              title={item.label}
              className={`collapsed-item-${item.page.toLowerCase()}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportSidebar;