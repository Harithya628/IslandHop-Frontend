import React, { useState } from 'react';
import { Search, Filter, Calendar, DollarSign, User, Clock } from 'lucide-react';
import styles from './Earnings.module.css';

const Earnings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all-time');

  // Mock payment data - replace with actual data from API
  const payments = [
    {
      id: 1,
      description: 'Trip from Colombo to Kandy',
      amount: 2500.00,
      payerName: 'John Smith',
      date: '2025-06-28',
      time: '14:30',
      status: 'completed',
      paymentMethod: 'card'
    },
    {
      id: 2,
      description: 'Airport transfer - Bandaranaike to Galle Face',
      amount: 1800.00,
      payerName: 'Sarah Wilson',
      date: '2025-06-28',
      time: '09:15',
      status: 'completed',
      paymentMethod: 'cash'
    },
    {
      id: 3,
      description: 'City tour - Colombo attractions',
      amount: 3200.00,
      payerName: 'Michael Brown',
      date: '2025-06-27',
      time: '16:45',
      status: 'pending',
      paymentMethod: 'card'
    },
    {
      id: 4,
      description: 'Trip from Negombo to Mount Lavinia',
      amount: 1500.00,
      payerName: 'Emma Davis',
      date: '2025-06-27',
      time: '11:20',
      status: 'completed',
      paymentMethod: 'digital'
    },
    {
      id: 5,
      description: 'Shopping mall transfer',
      amount: 800.00,
      payerName: 'David Johnson',
      date: '2025-06-26',
      time: '19:30',
      status: 'completed',
      paymentMethod: 'cash'
    }
  ];

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.payerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || payment.status === selectedFilter;
    
    const matchesDate = dateFilter === 'all-time' || 
                       (dateFilter === 'today' && payment.date === '2025-06-28') ||
                       (dateFilter === 'week' && new Date(payment.date) >= new Date('2025-06-22')) ||
                       (dateFilter === 'month' && new Date(payment.date) >= new Date('2025-06-01'));
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  // Calculate total earnings
  const totalEarnings = filteredPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toFixed(2)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card': return '💳';
      case 'cash': return '💵';
      case 'digital': return '📱';
      default: return '💰';
    }
  };

  return (
    <div className={styles.driverPage}>
      <div className={styles.pageHeader}>
        <h1>Earnings</h1>
      </div>

      <div className={styles.pageContent}>
        {/* Search and Filter Section */}
        <div className={styles.searchFilterBar}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search payments by description or payer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterOptions}>
            <div className={styles.filterGroup}>
              <Filter className={styles.filterIcon} />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Payments</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <Calendar className={styles.filterIcon} />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all-time">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments List */}
        <div className={styles.paymentsSection}>
          <h2>Payment History ({filteredPayments.length} payments)</h2>
          
          {filteredPayments.length === 0 ? (
            <div className={styles.noPayments}>
              <p>No payments found matching your criteria.</p>
            </div>
          ) : (
            <div className={styles.paymentsList}>
              {filteredPayments.map(payment => (
                <div key={payment.id} className={styles.paymentCard}>
                  <div className={styles.paymentHeader}>
                    <div className={styles.paymentDescription}>
                      <h3>{payment.description}</h3>
                      <div className={styles.paymentStatus} style={{ color: getStatusColor(payment.status) }}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </div>
                    </div>
                    <div className={styles.paymentAmount}>
                      {formatCurrency(payment.amount)}
                    </div>
                  </div>
                  
                  <div className={styles.paymentDetails}>
                    <div className={styles.paymentInfo}>
                      <div className={styles.infoItem}>
                        <User className={styles.infoIcon} />
                        <span>{payment.payerName}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <Calendar className={styles.infoIcon} />
                        <span>{payment.date}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <Clock className={styles.infoIcon} />
                        <span>{payment.time}</span>
                      </div>
                    </div>
                    <div className={styles.paymentMethod}>
                      <span className={styles.methodIcon}>{getPaymentMethodIcon(payment.paymentMethod)}</span>
                      <span className={styles.methodText}>{payment.paymentMethod.charAt(0).toUpperCase() + payment.paymentMethod.slice(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Earnings;
