import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import islandHopLogo from '../assets/IslandHop.png';
import islandHopIcon from '../assets/islandHopIcon.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // You can implement search functionality here
      console.log('Searching for:', searchTerm);
      // For now, navigate to explore page with search term
      navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.navbarContainer}>
        {/* Left side - Logo */}
        <div 
          className={styles.logo}
          onClick={() => handleNavigation('/')}
        >
          <img src={islandHopIcon} alt="IslandHop Icon" className={styles.logoIcon} />
          <img src={islandHopLogo} alt="IslandHop" className={styles.logoText} />
        </div>
        
        {/* Center - Navigation Items */}
        <div className={styles.centerSection}>
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
        </div>
        
        {/* Right side - Search + Auth */}
        <div className={styles.rightSection}>
          <form className={styles.searchContainer} onSubmit={handleSearch}>
            <div className={styles.searchBox}>            <input
              type="text"
              placeholder="Search destinations, experiences..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
              <button type="submit" className={styles.searchButton}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </form>
          
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
    </div>
  );
};

export default Navbar;
