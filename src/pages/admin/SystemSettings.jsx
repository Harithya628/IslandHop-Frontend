import React, { useState } from 'react';
import '../Page.css';
import './SystemSettings.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'IslandHop Platform',
    darkMode: false,
    notifications: true,
    autoBackup: true,
    
    // Performance Settings
    cacheSize: 75,
    maxConcurrentUsers: 1000,
    apiTimeout: 30,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 120,
    passwordComplexity: true,
    loginAttempts: 5,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    
    // System Preferences
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    logLevel: 'info',
    
    // Feature Flags
    betaFeatures: false,
    analytics: true,
    errorReporting: true,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSliderChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>System Settings</h1>
          <p>Configure your platform preferences and system behavior</p>
        </div>

        {/* Settings Grid Layout - Similar to Analytics Bento Grid */}
        <div className="settings-grid">
          
          {/* General Settings Card */}
          <div className="settings-card general-settings">
            <h2 className="section-title">General</h2>
            
            <div className="setting-item">
              <div className="setting-content">
                <label className="setting-label">System Name</label>
                <input 
                  type="text" 
                  className="setting-input"
                  value={settings.systemName}
                  onChange={(e) => handleInputChange('systemName', e.target.value)}
                />
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Dark Mode</label>
                  <span className="setting-description">Switch to dark appearance</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.darkMode}
                    onChange={() => handleToggle('darkMode')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">System Notifications</label>
                  <span className="setting-description">Receive system alerts and updates</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications}
                    onChange={() => handleToggle('notifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Automatic Backup</label>
                  <span className="setting-description">Enable daily system backups</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.autoBackup}
                    onChange={() => handleToggle('autoBackup')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Performance Settings Card */}
          <div className="settings-card performance-settings">
            <h2 className="section-title">Performance</h2>
            
            <div className="setting-item">
              <div className="setting-content full-width">
                <div className="setting-text">
                  <label className="setting-label">Cache Size</label>
                  <span className="setting-description">{settings.cacheSize}% of available storage</span>
                </div>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="10" 
                    max="90" 
                    value={settings.cacheSize}
                    className="setting-slider"
                    onChange={(e) => handleSliderChange('cacheSize', e.target.value)}
                  />
                  <div className="slider-labels">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content full-width">
                <div className="setting-text">
                  <label className="setting-label">Max Concurrent Users</label>
                  <span className="setting-description">{settings.maxConcurrentUsers.toLocaleString()} users</span>
                </div>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="100" 
                    max="5000" 
                    step="100"
                    value={settings.maxConcurrentUsers}
                    className="setting-slider"
                    onChange={(e) => handleSliderChange('maxConcurrentUsers', e.target.value)}
                  />
                  <div className="slider-labels">
                    <span>100</span>
                    <span>5K</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">API Timeout</label>
                  <span className="setting-description">{settings.apiTimeout} seconds</span>
                </div>
                <select 
                  className="setting-select"
                  value={settings.apiTimeout}
                  onChange={(e) => handleSelectChange('apiTimeout', e.target.value)}
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Settings Card */}
          <div className="settings-card security-settings">
            <h2 className="section-title">Security</h2>
            
            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Two-Factor Authentication</label>
                  <span className="setting-description">Require 2FA for admin access</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.twoFactorAuth}
                    onChange={() => handleToggle('twoFactorAuth')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content full-width">
                <div className="setting-text">
                  <label className="setting-label">Session Timeout</label>
                  <span className="setting-description">{settings.sessionTimeout} minutes</span>
                </div>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="15" 
                    max="480" 
                    step="15"
                    value={settings.sessionTimeout}
                    className="setting-slider"
                    onChange={(e) => handleSliderChange('sessionTimeout', e.target.value)}
                  />
                  <div className="slider-labels">
                    <span>15min</span>
                    <span>8hr</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Password Complexity</label>
                  <span className="setting-description">Enforce strong passwords</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.passwordComplexity}
                    onChange={() => handleToggle('passwordComplexity')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Max Login Attempts</label>
                  <span className="setting-description">{settings.loginAttempts} attempts before lockout</span>
                </div>
                <select 
                  className="setting-select"
                  value={settings.loginAttempts}
                  onChange={(e) => handleSelectChange('loginAttempts', e.target.value)}
                >
                  <option value={3}>3 attempts</option>
                  <option value={5}>5 attempts</option>
                  <option value={10}>10 attempts</option>
                  <option value={999}>No limit</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications Settings Card */}
          <div className="settings-card notifications-settings">
            <h2 className="section-title">Notifications</h2>
            
            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Email Notifications</label>
                  <span className="setting-description">Receive alerts via email</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Push Notifications</label>
                  <span className="setting-description">Browser push notifications</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.pushNotifications}
                    onChange={() => handleToggle('pushNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">SMS Notifications</label>
                  <span className="setting-description">Receive critical alerts via SMS</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.smsNotifications}
                    onChange={() => handleToggle('smsNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* System Preferences Card */}
          <div className="settings-card preferences-settings">
            <h2 className="section-title">System Preferences</h2>
            
            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Language</label>
                  <span className="setting-description">System interface language</span>
                </div>
                <select 
                  className="setting-select"
                  value={settings.language}
                  onChange={(e) => handleSelectChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Timezone</label>
                  <span className="setting-description">System default timezone</span>
                </div>
                <select 
                  className="setting-select"
                  value={settings.timezone}
                  onChange={(e) => handleSelectChange('timezone', e.target.value)}
                >
                  <option value="UTC">UTC (GMT+0)</option>
                  <option value="EST">Eastern (GMT-5)</option>
                  <option value="PST">Pacific (GMT-8)</option>
                  <option value="CET">Central European (GMT+1)</option>
                  <option value="JST">Japan (GMT+9)</option>
                </select>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Date Format</label>
                  <span className="setting-description">Display format for dates</span>
                </div>
                <select 
                  className="setting-select"
                  value={settings.dateFormat}
                  onChange={(e) => handleSelectChange('dateFormat', e.target.value)}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD-MMM-YYYY">DD-MMM-YYYY</option>
                </select>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Log Level</label>
                  <span className="setting-description">System logging verbosity</span>
                </div>
                <select 
                  className="setting-select"
                  value={settings.logLevel}
                  onChange={(e) => handleSelectChange('logLevel', e.target.value)}
                >
                  <option value="error">Error only</option>
                  <option value="warn">Warning & Error</option>
                  <option value="info">Info, Warning & Error</option>
                  <option value="debug">All (Debug mode)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Settings Card */}
          <div className="settings-card advanced-settings">
            <h2 className="section-title">Advanced</h2>
            
            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Beta Features</label>
                  <span className="setting-description">Enable experimental features</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.betaFeatures}
                    onChange={() => handleToggle('betaFeatures')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Analytics</label>
                  <span className="setting-description">Collect usage analytics</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.analytics}
                    onChange={() => handleToggle('analytics')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-content">
                <div className="setting-text">
                  <label className="setting-label">Error Reporting</label>
                  <span className="setting-description">Send crash reports automatically</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.errorReporting}
                    onChange={() => handleToggle('errorReporting')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
