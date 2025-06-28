import './Group1.css';
import pic1 from '../../assets/pic1.png';
import pic2 from '../../assets/pic2.png';
import pic3 from '../../assets/pic3.png';

const TripsHero = () => {
  return (
    <div className="pexels-roman-odintsov-4553621-parent" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 1200 }}>
        <img className="pexels-roman-odintsov-4553621-icon" alt="" src={pic3} />
        <img className="pexels-roman-odintsov-4553621-icon1" alt="" src={pic1} />
        <img className="pexels-roman-odintsov-4553621-icon2" alt="" src={pic2} />
      </div>
    </div>
  );
};

export default TripsHero;
