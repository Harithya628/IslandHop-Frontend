import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import '../Page.css';
import TripsHero from './TripsHero';

const TripsPublic = () => {
  return (
    <div className="page" style={{ background: '#f7fafd', minHeight: '100vh' }}>
      <Navbar />
      <div className="page-content-card" style={{ maxWidth: 1100, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', padding: '2.5rem 2rem' }}>
        <div className="page-header" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#223040', marginBottom: 8 }}>Explore Public Trips</h1>
          <p style={{ color: '#4a5a6a', fontSize: '1.15rem', margin: 0 }}>Discover amazing journeys shared by our community.</p>
        </div>
        <TripsHero />
        <div style={{ height: '32px' }} />
        <p style={{ marginTop: 0, textAlign: 'center', color: '#4a5a6a', fontSize: '1.1rem', marginBottom: 32 }}>
          Browse, get inspired, and start planning your own adventure!
        </p>
        <div className="stats-grid" style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          <div className="stat-card" style={{ border: '1px solid #e3e8ee', borderRadius: 14, padding: '1.5rem 1.2rem', width: 270, background: '#fafdff', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', transition: 'box-shadow 0.2s', textAlign: 'left' }}>
            <h3 style={{ fontWeight: 700, color: '#1a2a3a', marginBottom: 8 }}>Beach Getaway</h3>
            <p style={{ color: '#4a5a6a', margin: 0 }}>Relax on the golden sands of Sri Lanka's southern coast. 3 days, 2 nights.</p>
          </div>
          <div className="stat-card" style={{ border: '1px solid #e3e8ee', borderRadius: 14, padding: '1.5rem 1.2rem', width: 270, background: '#fafdff', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', transition: 'box-shadow 0.2s', textAlign: 'left' }}>
            <h3 style={{ fontWeight: 700, color: '#1a2a3a', marginBottom: 8 }}>Cultural Tour</h3>
            <p style={{ color: '#4a5a6a', margin: 0 }}>Experience the rich heritage of Kandy and Sigiriya. 5 days, 4 nights.</p>
          </div>
          <div className="stat-card" style={{ border: '1px solid #e3e8ee', borderRadius: 14, padding: '1.5rem 1.2rem', width: 270, background: '#fafdff', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', transition: 'box-shadow 0.2s', textAlign: 'left' }}>
            <h3 style={{ fontWeight: 700, color: '#1a2a3a', marginBottom: 8 }}>Wildlife Adventure</h3>
            <p style={{ color: '#4a5a6a', margin: 0 }}>Safari in Yala National Park and spot elephants and leopards. 2 days, 1 night.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripsPublic;