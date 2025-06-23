import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ComplaintReports.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const issueCategories = [
  'All',
  'Driver No-show',
  'Vehicle Issues',
  'Payment Problems',
  'Lost Items',
  'Rude Behavior',
  'Other',
];

const dummyChartData = {
  'All': [12, 18, 10, 7, 15, 9, 6],
  'Driver No-show': [8, 12, 7, 3, 10, 5, 2],
  'Vehicle Issues': [2, 3, 1, 2, 2, 2, 1],
  'Payment Problems': [1, 2, 1, 1, 1, 1, 1],
  'Lost Items': [1, 1, 1, 1, 1, 1, 1],
  'Rude Behavior': [0, 0, 0, 0, 1, 0, 1],
  'Other': [0, 0, 0, 0, 0, 0, 0],
};

const dummyTableData = [
  { issue: 'Driver No-show', count: 42, percent: '38%' },
  { issue: 'Vehicle Issues', count: 13, percent: '12%' },
  { issue: 'Payment Problems', count: 8, percent: '7%' },
  { issue: 'Lost Items', count: 7, percent: '6%' },
  { issue: 'Rude Behavior', count: 4, percent: '4%' },
  { issue: 'Other', count: 36, percent: '33%' },
];

const ComplaintReports = () => {
  const [category, setCategory] = useState('All');
  const [dateRange, setDateRange] = useState('last7');
  const [downloading, setDownloading] = useState(false);

  // Dummy date labels for last 7 days
  const dateLabels = [
    '2025-06-16',
    '2025-06-17',
    '2025-06-18',
    '2025-06-19',
    '2025-06-20',
    '2025-06-21',
    '2025-06-22',
  ];

  // Chart Data
  const chartData = {
    labels: dateLabels,
    datasets: [
      {
        label: category === 'All' ? 'All Complaints' : category,
        data: dummyChartData[category],
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        maxBarThickness: 38,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1e293b',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#64748b',
          font: { size: 13, family: 'Roboto, sans-serif' },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(226,232,240,0.5)', drawBorder: false },
        ticks: {
          color: '#64748b',
          font: { size: 13, family: 'Roboto, sans-serif' },
          stepSize: 2,
        },
      },
    },
  };

  // Simulate download/share
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Report downloaded!');
    }, 1200);
  };

  const handleShare = () => {
    alert('Report shared with admin team!');
  };

  return (
    <div className="page">
      <div className="complaint-reports-container">
        <div className="complaint-reports-header">
          <h1>Complaint Reports</h1>
          <p>Analyze complaint trends, filter by category and date, and export reports</p>
        </div>

        {/* Filters */}
        <div className="complaint-filters">
          <div className="filter-group">
            <label htmlFor="category" className="filter-label">Issue Category</label>
            <select
              id="category"
              className="filter-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {issueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="date-range" className="filter-label">Date Range</label>
            <select
              id="date-range"
              className="filter-select"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="filter-actions">
            <button
              className="btn-download"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <span className="loader" />
              ) : (
                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              )}
              Download
            </button>
            <button className="btn-share" onClick={handleShare}>
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
              </svg>
              Share
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="complaint-chart-section">
          <Bar data={chartData} options={chartOptions} height={320} />
        </div>

        {/* Table */}
        <div className="complaint-table-section">
          <h3>Most Common Complaint Issues</h3>
          <table className="complaint-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Count</th>
                <th>% of Total</th>
              </tr>
            </thead>
            <tbody>
              {dummyTableData.map((row, idx) => (
                <tr key={row.issue}>
                  <td>{row.issue}</td>
                  <td>{row.count}</td>
                  <td>{row.percent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintReports;