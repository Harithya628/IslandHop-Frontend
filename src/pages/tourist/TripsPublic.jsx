import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import '../Page.css';
import './TripsPublic.css';
import TripsHero from './TripsHero';

const TripsPublic = () => {
  return (
    <div className="trips-public-page">
      <Navbar />
      <div className="trips-public-container">
        <div className="trips-public-header">
          <h1 className="trips-public-title">Plan Your Perfect Trip to Sri Lanka</h1>
        </div>
        <TripsHero />
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