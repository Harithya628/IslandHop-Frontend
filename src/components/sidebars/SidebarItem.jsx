import React from 'react';
import './SidebarItem.css';

const SidebarItem = ({ icon, label, isActive, onClick, iconColor, collapsed = false, title }) => {
  return (
    <div
      className={`sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
      onClick={onClick}
      title={collapsed ? title || label : ''}
    >
      <span 
        className="sidebar-item-icon" 
        style={{ color: isActive ? '#1E90FF' : iconColor }}
      >
        {icon}
      </span>
      {!collapsed && (
        <span className="sidebar-item-label">
          {label}
        </span>
      )}
    </div>
  );
};

export default SidebarItem;