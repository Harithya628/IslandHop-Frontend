import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../Page.css';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [selectedUser, setSelectedUser] = React.useState('user1');
  const [leftMetric, setLeftMetric] = React.useState('bookings');
  const [rightMetric, setRightMetric] = React.useState('users');

  // Mock data for different users
  const userData = {
    user1: {
      bookings: [65, 78, 90, 105, 128, 142, 168, 185, 201, 225, 248, 270],
      users: [45, 52, 68, 73, 89, 95, 112, 128, 145, 162, 178, 195],
      revenue: [12000, 15600, 18900, 22300, 27800, 31200, 36800, 42100, 47300, 53200, 58900, 64500],
      sessions: [1200, 1450, 1680, 1890, 2150, 2380, 2650, 2920, 3180, 3450, 3720, 3980],
      conversion: [2.1, 2.3, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.2, 4.5, 4.8, 5.1]
    },
    user2: {
      bookings: [45, 62, 78, 95, 112, 138, 155, 172, 189, 205, 228, 245],
      users: [35, 48, 58, 68, 82, 98, 115, 132, 148, 165, 182, 200],
      revenue: [9800, 13200, 16800, 20400, 24600, 29200, 33800, 38400, 42900, 47600, 52800, 57200],
      sessions: [980, 1180, 1420, 1650, 1890, 2140, 2380, 2620, 2860, 3100, 3340, 3580],
      conversion: [1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.2, 3.5, 3.8, 4.0, 4.3, 4.6]
    },
    user3: {
      bookings: [85, 95, 110, 125, 142, 158, 175, 192, 210, 235, 258, 280],
      users: [55, 65, 78, 88, 102, 118, 135, 152, 170, 188, 205, 225],
      revenue: [15200, 18400, 22100, 26300, 31800, 36400, 42200, 47800, 53600, 59800, 66200, 72800],
      sessions: [1480, 1720, 2020, 2340, 2680, 3020, 3380, 3740, 4100, 4460, 4820, 5180],
      conversion: [2.8, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0]
    }
  };

  // Metric labels and colors
  const metricConfig = {
    bookings: { label: 'Total Bookings', color: '#1E90FF', bgColor: 'rgba(30, 144, 255, 0.1)' },
    users: { label: 'Active Users', color: '#00D4AA', bgColor: 'rgba(0, 212, 170, 0.1)' },
    revenue: { label: 'Revenue ($)', color: '#FF9800', bgColor: 'rgba(255, 152, 0, 0.1)' },
    sessions: { label: 'Sessions', color: '#E91E63', bgColor: 'rgba(233, 30, 99, 0.1)' },
    conversion: { label: 'Conversion Rate (%)', color: '#9C27B0', bgColor: 'rgba(156, 39, 176, 0.1)' }
  };

  // Dynamic chart data based on selected user and metrics
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: metricConfig[leftMetric].label,
        data: userData[selectedUser][leftMetric],
        borderColor: metricConfig[leftMetric].color,
        backgroundColor: metricConfig[leftMetric].bgColor,
        borderWidth: 3,
        pointBackgroundColor: metricConfig[leftMetric].color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
      },
      {
        label: metricConfig[rightMetric].label,
        data: userData[selectedUser][rightMetric],
        borderColor: metricConfig[rightMetric].color,
        backgroundColor: metricConfig[rightMetric].bgColor,
        borderWidth: 3,
        pointBackgroundColor: metricConfig[rightMetric].color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
            family: 'Roboto, sans-serif'
          }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            family: 'Roboto, sans-serif'
          },
          color: '#666'
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            family: 'Roboto, sans-serif'
          },
          color: '#666',
          padding: 8
        },
        border: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: {
        capBezierPoints: false
      }
    }
  };

  return (
    <div className="page">
      <div className="analytics-container">
        <div className="analytics-header">
          <h1>Analytics Dashboard</h1>
          <p>Track your platform's performance and growth metrics</p>
        </div>

        {/* Bento Box Grid Layout */}
        <div className="bento-grid">
          {/* Main Chart - Large Section */}
          <div className="bento-item bento-chart">
            <div className="chart-header">
              <div className="chart-title-section">
                <h2>Growth Overview</h2>
                <p>Monthly performance trends</p>
              </div>
              <div className="user-selector">
                <button 
                  className={`user-btn ${selectedUser === 'user1' ? 'active' : ''}`}
                  onClick={() => setSelectedUser('user1')}
                >
                  User 1
                </button>
                <button 
                  className={`user-btn ${selectedUser === 'user2' ? 'active' : ''}`}
                  onClick={() => setSelectedUser('user2')}
                >
                  User 2
                </button>
                <button 
                  className={`user-btn ${selectedUser === 'user3' ? 'active' : ''}`}
                  onClick={() => setSelectedUser('user3')}
                >
                  User 3
                </button>
              </div>
            </div>
            <div className="chart-wrapper">
              <Line data={chartData} options={chartOptions} />
            </div>
            
            {/* Metric Selector Controls */}
            <div className="metric-selector">
              <div className="metric-dropdown-group">
                <select 
                  value={leftMetric} 
                  onChange={(e) => setLeftMetric(e.target.value)}
                  className="metric-dropdown"
                >
                  <option value="bookings">Total Bookings</option>
                  <option value="users">Active Users</option>
                  <option value="revenue">Revenue</option>
                  <option value="sessions">Sessions</option>
                  <option value="conversion">Conversion Rate</option>
                </select>
                
                <span className="metric-against">against</span>
                
                <select 
                  value={rightMetric} 
                  onChange={(e) => setRightMetric(e.target.value)}
                  className="metric-dropdown"
                >
                  <option value="bookings">Total Bookings</option>
                  <option value="users">Active Users</option>
                  <option value="revenue">Revenue</option>
                  <option value="sessions">Sessions</option>
                  <option value="conversion">Conversion Rate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Key Metrics - Tall Right Section */}
          <div className="bento-item bento-metrics">
            <h3>Key Metrics</h3>
            <div className="bento-stats-list">
              <div className="bento-stat-item">
                <div className="bento-stat-icon" style={{ backgroundColor: '#E3F2FD' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E90FF" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="bento-stat-content">
                  <h4>2,847</h4>
                  <p>Total Users</p>
                  <span className="bento-stat-change positive">+12.5%</span>
                </div>
              </div>

              <div className="bento-stat-item">
                <div className="bento-stat-icon" style={{ backgroundColor: '#E8F5E8' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                <div className="bento-stat-content">
                  <h4>1,428</h4>
                  <p>Total Bookings</p>
                  <span className="bento-stat-change positive">+8.2%</span>
                </div>
              </div>

              <div className="bento-stat-item">
                <div className="bento-stat-icon" style={{ backgroundColor: '#FFF3E0' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="bento-stat-content">
                  <h4>$48,295</h4>
                  <p>Revenue</p>
                  <span className="bento-stat-change positive">+15.3%</span>
                </div>
              </div>

              <div className="bento-stat-item">
                <div className="bento-stat-icon" style={{ backgroundColor: '#FCE4EC' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                  </svg>
                </div>
                <div className="bento-stat-content">
                  <h4>94.2%</h4>
                  <p>Satisfaction Rate</p>
                  <span className="bento-stat-change positive">+2.1%</span>
                </div>
              </div>

              <div className="bento-stat-item">
                <div className="bento-stat-icon" style={{ backgroundColor: '#F3E8FF' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C27B0" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <div className="bento-stat-content">
                  <h4>4.2%</h4>
                  <p>Conversion Rate</p>
                  <span className="bento-stat-change positive">+0.8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Destinations - Medium Section */}
          <div className="bento-item bento-destinations">
            <h3>Top Destinations</h3>
            <div className="bento-destinations-list">
              <div className="destination-item">
                <span className="destination-name">Maldives</span>
                <span className="destination-value">342</span>
              </div>
              <div className="destination-item">
                <span className="destination-name">Bali</span>
                <span className="destination-value">298</span>
              </div>
              <div className="destination-item">
                <span className="destination-name">Hawaii</span>
                <span className="destination-value">267</span>
              </div>
              <div className="destination-item">
                <span className="destination-name">Santorini</span>
                <span className="destination-value">189</span>
              </div>
            </div>
          </div>

          {/* Recent Activity - Medium Section */}
          <div className="bento-item bento-activity">
            <h3>Recent Activity</h3>
            <div className="bento-activity-list">
              <div className="activity-item">
                <span className="activity-desc">New registrations</span>
                <span className="activity-value">+24 today</span>
              </div>
              <div className="activity-item">
                <span className="activity-desc">Completed bookings</span>
                <span className="activity-value">+18 today</span>
              </div>
              <div className="activity-item">
                <span className="activity-desc">Support tickets</span>
                <span className="activity-value">3 pending</span>
              </div>
              <div className="activity-item">
                <span className="activity-desc">System uptime</span>
                <span className="activity-value">99.9%</span>
              </div>
            </div>
          </div>

          {/* Service Providers - Medium Section */}
          <div className="bento-item bento-services">
            <h3>Service Providers</h3>
            <div className="bento-services-list">
              <div className="service-provider-item">
                <div className="service-provider-info">
                  <div className="service-provider-icon" style={{ backgroundColor: '#EEF2FF' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
                      <path d="M8 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="9"/>
                    </svg>
                  </div>
                  <div className="service-provider-content">
                    <span className="service-provider-type">Active Drivers</span>
                    <span className="service-provider-count">127</span>
                  </div>
                </div>
                <div className="service-provider-status online">Online</div>
              </div>
              
              <div className="service-provider-item">
                <div className="service-provider-info">
                  <div className="service-provider-icon" style={{ backgroundColor: '#F0FDF4' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                    </svg>
                  </div>
                  <div className="service-provider-content">
                    <span className="service-provider-type">Tour Guides</span>
                    <span className="service-provider-count">84</span>
                  </div>
                </div>
                <div className="service-provider-status available">Available</div>
              </div>
              
              <div className="service-provider-item">
                <div className="service-provider-info">
                  <div className="service-provider-icon" style={{ backgroundColor: '#FEF3C7' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <div className="service-provider-content">
                    <span className="service-provider-type">Ride Requests</span>
                    <span className="service-provider-count">42</span>
                  </div>
                </div>
                <div className="service-provider-status pending">Pending</div>
              </div>
              
              <div className="service-provider-item">
                <div className="service-provider-info">
                  <div className="service-provider-icon" style={{ backgroundColor: '#DBEAFE' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div className="service-provider-content">
                    <span className="service-provider-type">New Applicants</span>
                    <span className="service-provider-count">15</span>
                  </div>
                </div>
                <div className="service-provider-status new">New</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
