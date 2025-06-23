import React, { useState } from 'react';
import SupportSidebar from './sidebars/SupportSidebar';

import SupportDashboard from '../pages/support/SupportDashboard';
import ViewTickets from '../pages/support/ViewTickets';
import ResolveComplaint from '../pages/support/ResolveComplaint';
import EscalateIssue from '../pages/support/EscalateIssue';
import RefundCompensation from '../pages/support/RefundCompensation';
import LostItemTracker from '../pages/support/LostItemTracker';
import PanicAlerts from '../pages/support/PanicAlerts';
import ChatEmailSupport from '../pages/support/ChatEmailSupport';

import './DashboardLayout.css';

const SupportDashboardLayout = () => {
  const [currentPage, setCurrentPage] = useState('SupportDashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'SupportDashboard': 
        return <SupportDashboard />;
      
      case 'ViewTickets': 
        return <ViewTickets />;
      
      case 'ResolveComplaint': 
        return <ResolveComplaint />;
      
      case 'EscalateIssue': 
        return <EscalateIssue />;
      
      case 'RefundCompensation': 
        return <RefundCompensation />;
      
      case 'LostItemTracker': 
        return <LostItemTracker />;
      
      case 'PanicAlerts': 
        return <PanicAlerts />;
      
      case 'ChatEmailSupport': 
        return <ChatEmailSupport />;
      
      default: 
        return <SupportDashboard />;
    }
  };

  return (
    <div className="dashboard-layout">
      <SupportSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="main-content">
        <div className="page-container">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboardLayout;
