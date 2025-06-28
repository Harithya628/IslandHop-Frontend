import './TripsHero.css';
import pic1 from '../../assets/pic1.png';
import pic2 from '../../assets/pic2.png';
import pic3 from '../../assets/pic3.png';

const TripsHero = () => {
  return (
    <div className="trips-hero-container">
      <div className="trips-hero-content">
        <h1 className="trips-hero-title">Discover Your Next Adventure</h1>
        <p className="trips-hero-subtitle">
          Explore breathtaking destinations and create unforgettable memories.
        </p>
        <div className="trips-hero-images">
          <img className="hero-image hero-image-1" alt="Destination 1" src={pic1} />
          <img className="hero-image hero-image-2" alt="Destination 2" src={pic2} />
          <img className="hero-image hero-image-3" alt="Destination 3" src={pic3} />
        </div>
      </div>
    </div>
  );
};

export default TripsHero;