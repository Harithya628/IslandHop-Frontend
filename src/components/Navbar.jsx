import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import islandHopLogo from '../assets/IslandHop.png';
import islandHopIcon from '../assets/islandHopIcon.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.navbarContainer}>
        <div 
          className={styles.logo}
          onClick={() => handleNavigation('/')}
        >
          <img src={islandHopIcon} alt="IslandHop Icon" className={styles.logoIcon} />
          <img src={islandHopLogo} alt="IslandHop" className={styles.logoText} />
        </div>
        
        <div className={styles.navItems}>
          <div 
            className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}
            onClick={() => handleNavigation('/')}
          >
            Home
          </div>
          <div 
            className={`${styles.navItem} ${isActive('/explore') ? styles.active : ''}`}
            onClick={() => handleNavigation('/explore')}
          >
            Explore
          </div>
          <div 
            className={`${styles.navItem} ${isActive('/plan-trip') ? styles.active : ''}`}
            onClick={() => handleNavigation('/plan-trip')}
          >
            Plan a trip
          </div>
        </div>
        
        <div className={styles.authButtons}>
          <div 
            className={`${styles.loginBtn} ${isActive('/login') ? styles.active : ''}`}
            onClick={() => handleNavigation('/login')}
          >
            Login
          </div>
          <div 
            className={`${styles.signUpBtn} ${isActive('/signup') ? styles.active : ''}`}
            onClick={() => handleNavigation('/signup')}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
