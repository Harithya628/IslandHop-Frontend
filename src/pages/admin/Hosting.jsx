import React, { useState, useEffect } from 'react';
import '../Page.css';
import './Hosting.css';

const Hosting = () => {
  const [servers, setServers] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [infrastructureMetrics, setInfrastructureMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('servers');
  const [deploymentSettings, setDeploymentSettings] = useState({
    autoDeployment: true,
    rollbackEnabled: true,
    healthCheckUrl: 'https://api.islandhop.com/health',
    deploymentBranch: 'main',
    buildCommand: 'npm run build',
    environment: 'production'
  });

  // Mock data for servers
  const mockServers = [
    {
      id: 1,
      name: 'Web Server 1',
      type: 'web',
      status: 'running',
      ip: '192.168.1.10',
      location: 'US East',
      cpu: 45,
      memory: 68,
      disk: 32,
      uptime: '15 days, 4 hours',
      lastRestart: '2024-06-10T08:30:00Z',
      version: 'v2.1.3'
    },
    {
      id: 2,
      name: 'Database Server',
      type: 'database',
      status: 'running',
      ip: '192.168.1.20',
      location: 'US East',
      cpu: 78,
      memory: 85,
      disk: 56,
      uptime: '23 days, 12 hours',
      lastRestart: '2024-06-02T14:15:00Z',
      version: 'PostgreSQL 14.2'
    },
    {
      id: 3,
      name: 'API Server 1',
      type: 'api',
      status: 'warning',
      ip: '192.168.1.30',
      location: 'US West',
      cpu: 92,
      memory: 76,
      disk: 41,
      uptime: '8 days, 2 hours',
      lastRestart: '2024-06-17T10:20:00Z',
      version: 'v2.1.3'
    },
    {
      id: 4,
      name: 'Load Balancer',
      type: 'loadbalancer',
      status: 'running',
      ip: '192.168.1.5',
      location: 'US Central',
      cpu: 23,
      memory: 34,
      disk: 15,
      uptime: '45 days, 8 hours',
      lastRestart: '2024-05-11T16:45:00Z',
      version: 'Nginx 1.20'
    },
    {
      id: 5,
      name: 'Cache Server',
      type: 'cache',
      status: 'stopped',
      ip: '192.168.1.40',
      location: 'US East',
      cpu: 0,
      memory: 12,
      disk: 28,
      uptime: '0 minutes',
      lastRestart: '2024-06-25T09:00:00Z',
      version: 'Redis 6.2'
    }
  ];

  // Mock deployment data
  const mockDeployments = [
    {
      id: 1,
      version: 'v2.1.4',
      status: 'completed',
      branch: 'main',
      commit: 'a1b2c3d',
      deployedBy: 'john.doe@admin.com',
      deployedAt: '2024-06-25T14:30:00Z',
      duration: '4m 32s',
      environment: 'production'
    },
    {
      id: 2,
      version: 'v2.1.3',
      status: 'completed',
      branch: 'main',
      commit: 'x9y8z7w',
      deployedBy: 'jane.smith@admin.com',
      deployedAt: '2024-06-24T16:15:00Z',
      duration: '3m 45s',
      environment: 'production'
    },
    {
      id: 3,
      version: 'v2.1.4-beta',
      status: 'in-progress',
      branch: 'develop',
      commit: 'p4q5r6s',
      deployedBy: 'admin@islandhop.com',
      deployedAt: '2024-06-25T15:45:00Z',
      duration: '2m 18s',
      environment: 'staging'
    },
    {
      id: 4,
      version: 'v2.1.2',
      status: 'failed',
      branch: 'hotfix',
      commit: 'm7n8o9p',
      deployedBy: 'support@islandhop.com',
      deployedAt: '2024-06-24T09:20:00Z',
      duration: '1m 12s',
      environment: 'production'
    }
  ];

  // Mock infrastructure metrics
  const mockInfrastructureMetrics = {
    totalRequests: 1247890,
    responseTime: 145,
    errorRate: 0.03,
    bandwidth: 2.4,
    activeConnections: 1823,
    cacheHitRate: 94.2,
    databaseConnections: 45,
    queueLength: 12
  };

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setServers(mockServers);
      setDeployments(mockDeployments);
      setInfrastructureMetrics(mockInfrastructureMetrics);
      setLoading(false);
    }, 1500);
  }, []);

  const getServerStatusBadge = (status) => {
    const statusClasses = {
      running: 'hosting-status-running',
      warning: 'hosting-status-warning',
      stopped: 'hosting-status-stopped',
      error: 'hosting-status-error'
    };
    
    return (
      <span className={`hosting-status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getDeploymentStatusBadge = (status) => {
    const statusClasses = {
      completed: 'hosting-deploy-completed',
      'in-progress': 'hosting-deploy-progress',
      failed: 'hosting-deploy-failed',
      pending: 'hosting-deploy-pending'
    };
    
    return (
      <span className={`hosting-deploy-badge ${statusClasses[status]}`}>
        {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
      </span>
    );
  };

  const getServerTypeIcon = (type) => {
    const icons = {
      web: '🌐',
      database: '🗄️',
      api: '⚡',
      loadbalancer: '⚖️',
      cache: '💾'
    };
    return icons[type] || '🖥️';
  };

  const getResourceStatus = (usage) => {
    if (usage >= 90) return 'hosting-resource-critical';
    if (usage >= 70) return 'hosting-resource-warning';
    return 'hosting-resource-normal';
  };

  const handleServerAction = (serverId, action) => {
    setServers(prev => 
      prev.map(server => 
        server.id === serverId 
          ? { 
              ...server, 
              status: action === 'start' ? 'running' : action === 'stop' ? 'stopped' : 'warning'
            }
          : server
      )
    );
  };

  const handleDeployment = () => {
    const newDeployment = {
      id: deployments.length + 1,
      version: 'v2.1.5',
      status: 'in-progress',
      branch: deploymentSettings.deploymentBranch,
      commit: 'new123',
      deployedBy: 'admin@islandhop.com',
      deployedAt: new Date().toISOString(),
      duration: '0m 0s',
      environment: deploymentSettings.environment
    };
    
    setDeployments(prev => [newDeployment, ...prev]);
    
    // Simulate deployment completion
    setTimeout(() => {
      setDeployments(prev => 
        prev.map(dep => 
          dep.id === newDeployment.id 
            ? { ...dep, status: 'completed', duration: '3m 42s' }
            : dep
        )
      );
    }, 5000);
  };

  const handleSettingChange = (key, value) => {
    setDeploymentSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-content-card">
          <div className="hosting-loading-container">
            <div className="hosting-loading-spinner"></div>
            <p>Loading hosting infrastructure...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="hosting-header">
          <div>
            <h1>Hosting Management</h1>
            <p>Monitor server status, manage deployments, and oversee infrastructure performance.</p>
          </div>
          <div className="hosting-header-actions">
            <button className="hosting-btn hosting-btn-secondary">
              Download Logs
            </button>
            <button 
              className="hosting-btn hosting-btn-primary"
              onClick={handleDeployment}
            >
              Deploy Now
            </button>
          </div>
        </div>

        {/* Infrastructure Overview */}
        <div className="hosting-overview">
          <div className="hosting-overview-grid">
            <div className="hosting-metric-card">
              <h4>Total Requests</h4>
              <span className="hosting-metric-value">
                {infrastructureMetrics.totalRequests?.toLocaleString()}
              </span>
            </div>
            <div className="hosting-metric-card">
              <h4>Response Time</h4>
              <span className="hosting-metric-value">{infrastructureMetrics.responseTime}ms</span>
            </div>
            <div className="hosting-metric-card">
              <h4>Error Rate</h4>
              <span className="hosting-metric-value">{infrastructureMetrics.errorRate}%</span>
            </div>
            <div className="hosting-metric-card">
              <h4>Bandwidth</h4>
              <span className="hosting-metric-value">{infrastructureMetrics.bandwidth} GB/s</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="hosting-tabs">
          <button 
            className={`hosting-tab ${activeTab === 'servers' ? 'hosting-tab-active' : ''}`}
            onClick={() => setActiveTab('servers')}
          >
            Server Status
          </button>
          <button 
            className={`hosting-tab ${activeTab === 'deployments' ? 'hosting-tab-active' : ''}`}
            onClick={() => setActiveTab('deployments')}
          >
            Deployments
          </button>
          <button 
            className={`hosting-tab ${activeTab === 'monitoring' ? 'hosting-tab-active' : ''}`}
            onClick={() => setActiveTab('monitoring')}
          >
            Infrastructure Monitoring
          </button>
          <button 
            className={`hosting-tab ${activeTab === 'settings' ? 'hosting-tab-active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Deployment Settings
          </button>
        </div>

        <div className="hosting-tab-content">
          {/* Server Status Tab */}
          {activeTab === 'servers' && (
            <div className="hosting-servers-section">
              <div className="hosting-servers-grid">
                {servers.map(server => (
                  <div key={server.id} className="hosting-server-card">
                    <div className="hosting-server-header">
                      <div className="hosting-server-info">
                        <span className="hosting-server-icon">{getServerTypeIcon(server.type)}</span>
                        <div>
                          <h3>{server.name}</h3>
                          <p>{server.ip} • {server.location}</p>
                        </div>
                      </div>
                      {getServerStatusBadge(server.status)}
                    </div>
                    
                    <div className="hosting-server-metrics">
                      <div className="hosting-resource-item">
                        <span className="hosting-resource-label">CPU</span>
                        <div className="hosting-resource-bar">
                          <div 
                            className={`hosting-resource-fill ${getResourceStatus(server.cpu)}`}
                            style={{ width: `${server.cpu}%` }}
                          ></div>
                        </div>
                        <span className="hosting-resource-value">{server.cpu}%</span>
                      </div>
                      
                      <div className="hosting-resource-item">
                        <span className="hosting-resource-label">Memory</span>
                        <div className="hosting-resource-bar">
                          <div 
                            className={`hosting-resource-fill ${getResourceStatus(server.memory)}`}
                            style={{ width: `${server.memory}%` }}
                          ></div>
                        </div>
                        <span className="hosting-resource-value">{server.memory}%</span>
                      </div>
                      
                      <div className="hosting-resource-item">
                        <span className="hosting-resource-label">Disk</span>
                        <div className="hosting-resource-bar">
                          <div 
                            className={`hosting-resource-fill ${getResourceStatus(server.disk)}`}
                            style={{ width: `${server.disk}%` }}
                          ></div>
                        </div>
                        <span className="hosting-resource-value">{server.disk}%</span>
                      </div>
                    </div>
                    
                    <div className="hosting-server-details">
                      <p><strong>Uptime:</strong> {server.uptime}</p>
                      <p><strong>Version:</strong> {server.version}</p>
                      <p><strong>Last Restart:</strong> {formatTimestamp(server.lastRestart)}</p>
                    </div>
                    
                    <div className="hosting-server-actions">
                      {server.status === 'stopped' ? (
                        <button 
                          className="hosting-action-btn hosting-action-start"
                          onClick={() => handleServerAction(server.id, 'start')}
                        >
                          Start
                        </button>
                      ) : (
                        <button 
                          className="hosting-action-btn hosting-action-stop"
                          onClick={() => handleServerAction(server.id, 'stop')}
                        >
                          Stop
                        </button>
                      )}
                      <button 
                        className="hosting-action-btn hosting-action-restart"
                        onClick={() => handleServerAction(server.id, 'restart')}
                      >
                        Restart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployments Tab */}
          {activeTab === 'deployments' && (
            <div className="hosting-deployments-section">
              <div className="hosting-deployments-list">
                {deployments.map(deployment => (
                  <div key={deployment.id} className="hosting-deployment-card">
                    <div className="hosting-deployment-header">
                      <div>
                        <h4>{deployment.version}</h4>
                        <p>{deployment.branch} • {deployment.commit}</p>
                      </div>
                      {getDeploymentStatusBadge(deployment.status)}
                    </div>
                    
                    <div className="hosting-deployment-details">
                      <div className="hosting-deployment-info">
                        <span><strong>Environment:</strong> {deployment.environment}</span>
                        <span><strong>Deployed by:</strong> {deployment.deployedBy}</span>
                        <span><strong>Duration:</strong> {deployment.duration}</span>
                        <span><strong>Deployed:</strong> {formatTimestamp(deployment.deployedAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Infrastructure Monitoring Tab */}
          {activeTab === 'monitoring' && (
            <div className="hosting-monitoring-section">
              <div className="hosting-monitoring-grid">
                <div className="hosting-monitoring-card">
                  <h4>Active Connections</h4>
                  <span className="hosting-monitoring-value">
                    {infrastructureMetrics.activeConnections?.toLocaleString()}
                  </span>
                  <p className="hosting-monitoring-trend">↗ +5.2% from yesterday</p>
                </div>
                
                <div className="hosting-monitoring-card">
                  <h4>Cache Hit Rate</h4>
                  <span className="hosting-monitoring-value">{infrastructureMetrics.cacheHitRate}%</span>
                  <p className="hosting-monitoring-trend">↗ +2.1% from yesterday</p>
                </div>
                
                <div className="hosting-monitoring-card">
                  <h4>Database Connections</h4>
                  <span className="hosting-monitoring-value">{infrastructureMetrics.databaseConnections}</span>
                  <p className="hosting-monitoring-trend">→ No change</p>
                </div>
                
                <div className="hosting-monitoring-card">
                  <h4>Queue Length</h4>
                  <span className="hosting-monitoring-value">{infrastructureMetrics.queueLength}</span>
                  <p className="hosting-monitoring-trend">↘ -8.3% from yesterday</p>
                </div>
              </div>
              
              <div className="hosting-alerts-section">
                <h3>Infrastructure Alerts</h3>
                <div className="hosting-alerts-list">
                  <div className="hosting-alert hosting-alert-warning">
                    <span className="hosting-alert-icon">⚠️</span>
                    <div>
                      <h5>High CPU Usage</h5>
                      <p>API Server 1 CPU usage is at 92%. Consider scaling or optimization.</p>
                    </div>
                  </div>
                  <div className="hosting-alert hosting-alert-error">
                    <span className="hosting-alert-icon">🔴</span>
                    <div>
                      <h5>Cache Server Down</h5>
                      <p>Cache Server is currently stopped. This may affect application performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deployment Settings Tab */}
          {activeTab === 'settings' && (
            <div className="hosting-settings-section">
              <div className="hosting-settings-grid">
                <div className="hosting-setting-group">
                  <label htmlFor="autoDeployment">Auto Deployment</label>
                  <label className="hosting-toggle-switch">
                    <input
                      type="checkbox"
                      id="autoDeployment"
                      checked={deploymentSettings.autoDeployment}
                      onChange={(e) => handleSettingChange('autoDeployment', e.target.checked)}
                    />
                    <span className="hosting-toggle-slider"></span>
                  </label>
                  <p className="hosting-setting-description">
                    Automatically deploy when changes are pushed to the main branch
                  </p>
                </div>

                <div className="hosting-setting-group">
                  <label htmlFor="rollbackEnabled">Rollback Enabled</label>
                  <label className="hosting-toggle-switch">
                    <input
                      type="checkbox"
                      id="rollbackEnabled"
                      checked={deploymentSettings.rollbackEnabled}
                      onChange={(e) => handleSettingChange('rollbackEnabled', e.target.checked)}
                    />
                    <span className="hosting-toggle-slider"></span>
                  </label>
                  <p className="hosting-setting-description">
                    Enable automatic rollback on deployment failure
                  </p>
                </div>

                <div className="hosting-setting-group">
                  <label htmlFor="deploymentBranch">Deployment Branch</label>
                  <select
                    id="deploymentBranch"
                    value={deploymentSettings.deploymentBranch}
                    onChange={(e) => handleSettingChange('deploymentBranch', e.target.value)}
                    className="hosting-select"
                  >
                    <option value="main">main</option>
                    <option value="develop">develop</option>
                    <option value="staging">staging</option>
                  </select>
                </div>

                <div className="hosting-setting-group">
                  <label htmlFor="environment">Environment</label>
                  <select
                    id="environment"
                    value={deploymentSettings.environment}
                    onChange={(e) => handleSettingChange('environment', e.target.value)}
                    className="hosting-select"
                  >
                    <option value="production">Production</option>
                    <option value="staging">Staging</option>
                    <option value="development">Development</option>
                  </select>
                </div>

                <div className="hosting-setting-group hosting-setting-full-width">
                  <label htmlFor="healthCheckUrl">Health Check URL</label>
                  <input
                    type="url"
                    id="healthCheckUrl"
                    value={deploymentSettings.healthCheckUrl}
                    onChange={(e) => handleSettingChange('healthCheckUrl', e.target.value)}
                    className="hosting-input"
                    placeholder="https://api.example.com/health"
                  />
                </div>

                <div className="hosting-setting-group hosting-setting-full-width">
                  <label htmlFor="buildCommand">Build Command</label>
                  <input
                    type="text"
                    id="buildCommand"
                    value={deploymentSettings.buildCommand}
                    onChange={(e) => handleSettingChange('buildCommand', e.target.value)}
                    className="hosting-input"
                    placeholder="npm run build"
                  />
                </div>
              </div>
              
              <div className="hosting-settings-actions">
                <button className="hosting-btn hosting-btn-secondary">
                  Reset to Defaults
                </button>
                <button className="hosting-btn hosting-btn-primary">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hosting;
