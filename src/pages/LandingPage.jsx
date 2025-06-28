import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ReadyForYourNextAdventure from '../components/ReadyForYourNextAdventure';
import ExperienceText from '../components/ExperienceText';
import sriLankaVideo from '../assets/sri-lanka-video.mp4';
import Footer from '../components/Footer';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Setting up enhanced video looping');
    
    // Set essential properties
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    
    // Remove the loop attribute to handle it manually
    video.loop = false;
    
    let isLooping = false;
    
    const restartVideo = async () => {
      if (isLooping) return;
      isLooping = true;
      
      try {
        console.log('Restarting video...');
        video.currentTime = 0;
        await video.play();
        console.log('Video restarted successfully');
      } catch (error) {
        console.error('Error restarting video:', error);
      } finally {
        isLooping = false;
      }
    };

    // Monitor video time and restart when near the end
    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      
      // If we're within 0.5 seconds of the end, restart
      if (duration && currentTime && (duration - currentTime < 0.5)) {
        restartVideo();
      }
    };

    // Handle when video actually ends
    const handleEnded = () => {
      console.log('Video ended event');
      restartVideo();
    };

    // Handle when video can start playing
    const handleCanPlay = () => {
      console.log('Video can play');
      if (video.paused) {
        video.play().catch(console.error);
      }
    };

    // Add event listeners
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    // Initial play attempt
    setTimeout(() => {
      video.play().catch(error => {
        console.log('Initial autoplay failed:', error);
      });
    }, 100);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-container">
        <video 
          ref={videoRef}
          className="hero-video" 
          autoPlay 
          muted 
          playsInline
          preload="metadata"
          onLoadedData={() => console.log('Video loaded successfully')}
          onPlay={() => console.log('Video started playing')}
          onEnded={() => console.log('Video ended event fired')}
          onError={(e) => console.error('Video error:', e)}
          onTimeUpdate={() => {}}
        >
          <source src={sriLankaVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <ReadyForYourNextAdventure />
          <ExperienceText />
          <div className="button-container">
            <button onClick={() => navigate('/explore')} className="primary-button">
              Start Planning
            </button>
            <button onClick={() => navigate('/plan-trip')} className="secondary-button">
              Join a Pool
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose IslandHop?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏝️</div>
              <h3>Discover Hidden Gems</h3>
              <p>Explore Sri Lanka's most beautiful and lesser-known destinations with our curated travel experiences.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Easy Transportation</h3>
              <p>Book reliable rides and transportation across the island with our trusted local partners.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏨</div>
              <h3>Authentic Stays</h3>
              <p>Stay in carefully selected accommodations that offer authentic Sri Lankan hospitality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="destinations-section">
        <div className="container">
          <h2>Popular Destinations</h2>
          <div className="destinations-grid">
            <div className="destination-card">
              <div className="destination-image">
                <div className="placeholder-image">Kandy</div>
              </div>
              <h3>Kandy</h3>
              <p>The cultural capital with the famous Temple of the Tooth</p>
            </div>
            <div className="destination-card">
              <div className="destination-image">
                <div className="placeholder-image">Galle</div>
              </div>
              <h3>Galle</h3>
              <p>Historic fort city on the southern coast</p>
            </div>
            <div className="destination-card">
              <div className="destination-image">
                <div className="placeholder-image">Ella</div>
              </div>
              <h3>Ella</h3>
              <p>Breathtaking hill country with tea plantations</p>
            </div>
            <div className="destination-card">
              <div className="destination-image">
                <div className="placeholder-image">Sigiriya</div>
              </div>
              <h3>Sigiriya</h3>
              <p>Ancient rock fortress and UNESCO World Heritage site</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container">
          <h2>Experience Sri Lanka Like Never Before</h2>
          <div className="experience-content">
            <div className="experience-text">
              <h3>Immerse Yourself in Culture</h3>
              <p>From ancient temples to colonial architecture, Sri Lanka offers a rich tapestry of cultural experiences. Visit sacred sites, participate in traditional ceremonies, and learn about the island's fascinating history spanning over 2,500 years.</p>
              <h3>Adventure Awaits</h3>
              <p>Whether you're surfing the southern waves, hiking through misty mountains, or spotting leopards in national parks, Sri Lanka provides endless opportunities for adventure seekers and nature lovers alike.</p>
            </div>
            <div className="experience-stats">
              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">UNESCO World Heritage Sites</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">26</div>
                <div className="stat-label">National Parks</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Miles of Coastline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
