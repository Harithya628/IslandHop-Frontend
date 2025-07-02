import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import OngoingPoolMap from '../../components/OngoingPoolMap';
import '../Page.css';
import './Pools.css';
import FindPools from './FindPools';
import MyPools from './MyPools';
import Confirmed from './Confirmed';
import Ongoing from './Ongoing';

const tabList = [
  { label: 'Find Pools', key: 'find' },
  { label: 'My Pools', key: 'my' },
  { label: 'Confirmed', key: 'confirmed' },
  { label: 'Ongoing', key: 'ongoing' },
];

const Pools = () => {
  const [activeTab, setActiveTab] = useState('find');

  return (
    <div className="pools-page">
      <Navbar />
      <div className="pools-content">
        <h1 className="pools-heading" style={{ marginTop: '8.5rem' }}>Pools</h1>
        <p style={{ marginTop: '1.2rem', color: '#4a5a6a', fontSize: '1.15rem', textAlign: 'center', maxWidth: 600 }}>
          Meet new friends and explore together, find your perfect travel pool!
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {tabList.map(tab => (
            <button
              key={tab.key}
              className={`pools-btn${activeTab === tab.key ? ' pools-btn-active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Tab content placeholder */}
        <div style={{ marginTop: '2.5rem', minHeight: 120, width: '100%', marginBottom: '3.5rem' }}>
          {activeTab === 'find' && <FindPools />}
          {activeTab === 'my' && <MyPools />}
          {activeTab === 'confirmed' && <Confirmed />}
          {activeTab === 'ongoing' && <Ongoing />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pools;