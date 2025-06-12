import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Navbar />      <div className="landing-container">
        <h1>Hello, Welcome to IslandHop</h1>
        <p>Your next adventure awaits in beautiful Sri Lanka!</p>
        <div className="button-container">
          <button onClick={() => navigate('/explore')} className="primary-button">
            Explore Destinations
          </button>
          <button onClick={() => navigate('/plan-trip')} className="secondary-button">
            Plan Your Trip
          </button>
        </div>
    </div>
  </div>
  );
}

export default LandingPage;
