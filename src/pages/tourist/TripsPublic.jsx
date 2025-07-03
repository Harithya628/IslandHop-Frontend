import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import '../Page.css';
import './TripsPublic.css';
import TripsHero from './TripsHero';

const TripsPublic = () => {
  const navigate = useNavigate();

  const handleTestNavigation = () => {
    navigate('/plan-trip'); 
  };

  return (
    <div className="trips-public-page">
      <Navbar />
      <div className="trips-public-container">
        <div className="trips-public-header">
          <h1 className="trips-public-title">Plan Your Perfect Trip to Sri Lanka</h1>
        </div>
        <TripsHero />
        
        {/* Professional Planning Card */}
        <div className="planning-card">
          <div className="planning-card-content">
            <div className="planning-card-image-space">
              <img 
                src="/src/assets/IslandHopWhite.png" 
                alt="IslandHop Logo" 
                className="planning-card-main-logo"
              />
            </div>
            <div className="planning-card-text-content">
              <h2 className="planning-card-title">Reimagine the way you plan your travels</h2>
              <p className="planning-card-description">
                Enjoy a seamless planning experience with personalized suggestions, flexible tools, and everything you need in one place.
              </p>
              <button 
                className="planning-button" 
                onClick={handleTestNavigation}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 32px',
                  backgroundColor: '#000000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: '24px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#333333';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#000000';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Start Planning Trip Now
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="trips-public-spacer" />
        <p className="trips-public-description">
          Browse, get inspired, and start planning your own adventure!
        </p>
        <div className="trips-public-cards-container">
          <div className="trips-public-card">
            <h3 className="trips-public-card-title">Beach Getaway</h3>
            <p className="trips-public-card-description">Relax on the golden sands of Sri Lanka's southern coast. 3 days, 2 nights.</p>
          </div>
          <div className="trips-public-card">
            <h3 className="trips-public-card-title">Cultural Tour</h3>
            <p className="trips-public-card-description">Experience the rich heritage of Kandy and Sigiriya. 5 days, 4 nights.</p>
          </div>
          <div className="trips-public-card">
            <h3 className="trips-public-card-title">Wildlife Adventure</h3>
            <p className="trips-public-card-description">Safari in Yala National Park and spot elephants and leopards. 2 days, 1 night.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripsPublic;