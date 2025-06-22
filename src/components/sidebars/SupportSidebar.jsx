import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  TicketIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import SidebarItem from './SidebarItem';
import './Sidebar.css';
import islandHopLogo from '../../assets/IslandHop.png';
import islandHopIcon from '../../assets/islandHopIcon.png';

// Map page keys to their routes
const pageToRoute = {
  SupportDashboard: '/support',
  ViewTickets: '/support/view-tickets',
  ResolveComplaint: '/support/resolve-complaint',
  EscalateIssue: '/support/escalate-issue',
  RefundCompensation: '/support/refund-compensation',
  ComplaintReports: '/support/complaint-reports',
  LostItemTracker: '/support/lost-item-tracker',
  PanicAlerts: '/support/panic-alerts',
  ChatEmailSupport: '/support/chat-email-support',
};

const navLinks = [
  {
    label: 'Dashboard',
    icon: <HomeIcon className="w-4.5 h-4.5" />,
    page: 'SupportDashboard',
    iconColor: '#1E90FF',
  },
  {
    label: 'View Tickets',
    icon: <TicketIcon className="w-4.5 h-4.5" />,
    page: 'ViewTickets',
    iconColor: '#3B82F6',
  },
  {
    label: 'Resolve Complaint',
    icon: <CheckCircleIcon className="w-4.5 h-4.5" />,
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
    label: 'Complaint Reports',
    icon: <DocumentChartBarIcon className="w-4.5 h-4.5" />,
    page: 'ComplaintReports',
    iconColor: '#8B5CF6',
  },
  {
    label: 'Lost Item Tracker',
    icon: <MagnifyingGlassIcon className="w-4.5 h-4.5" />,
    page: 'LostItemTracker',
    iconColor: '#6366F1',
  },
  {
    label: 'Panic Alerts',
    icon: <ExclamationTriangleIcon className="w-4.5 h-4.5" />,
    page: 'PanicAlerts',
    iconColor: '#EF4444',
  },
  {
    label: 'Chat/Email Support',
    icon: (
      <span style={{ display: 'flex', gap: 2 }}>
        <ChatBubbleLeftRightIcon className="w-4 h-4" />
        <EnvelopeIcon className="w-4 h-4" />
      </span>
    ),
    page: 'ChatEmailSupport',
    iconColor: '#1976D2',
  },
];

const SupportSidebar = ({ currentPage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleNav = (page) => {
    const route = pageToRoute[page] || '/support';
    navigate(route);
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
        </div>
      )}
    </div>
  );
};

export default SupportSidebar;