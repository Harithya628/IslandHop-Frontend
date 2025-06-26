import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import islandHopLogo from '../assets/IslandHop.png';
import islandHopIcon from '../assets/islandHopIcon.png';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  
  // Mock user state - replace with actual auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && !isMobileMenuClosing) {
      document.body.classList.add('mobile-menu-open');
      // Prevent scroll on iOS Safari
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen, isMobileMenuClosing]);

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

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, 300); // Match animation duration
  };

  const handleMobileNavigation = (path) => {
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      navigate(path);
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, 300); // Match animation duration
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
      // Add actual logout logic here
      navigate('/');
    }, 300);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
      navigate('/login');
    }, 300);
  };

  return (
    <>
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
                onClick={() => handleNavigation('/')}
              >
                Explore
              </div>
              <div 
                className={`${styles.navItem} ${isActive('/plan-trip') ? styles.active : ''}`}
                onClick={() => handleNavigation('/plan-trip')}
              >
                Trips
              </div>              <div 
                className={`${styles.navItem} ${isActive('/join-pool') ? styles.active : ''}`}
                onClick={() => handleNavigation('/join-pool')}
              >
                Pools
              </div>
              <div 
                className={`${styles.navItem} ${isActive('/guide') ? styles.active : ''}`}
                onClick={() => handleNavigation('/guide')}
              >
                Guide
              </div>
            </div>
          </div>
          
          {/* Right side - Search + Auth */}
          <div className={styles.rightSection}>
            {/* Mobile hamburger menu */}
            <div 
              className={styles.mobileMenuToggle} 
              onClick={toggleMobileMenu}
            >
              <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <form className={styles.searchContainer} onSubmit={handleSearch}>
              <div className={styles.searchBox}>            <input
                type="text"
                placeholder="Search destinations, experiences..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
                <button type="submit" className={styles.searchButton}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>
            </form>
            
            <div className={styles.utilityButtons}>
              <div className={styles.languageBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                EN
              </div>
              <div className={styles.currencyBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                USD
              </div>
            </div>
            
            <div className={styles.authButtons}>
              {!isLoggedIn ? (
                <>
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
                </>
              ) : (
                <div className={styles.profileContainer}>
                  <div className={styles.profileBtn} onClick={toggleProfileDropdown}>
                    <div className={styles.profilePicture}>
                      <div className={styles.profileAvatar}>
                        JS
                      </div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.dropdownIcon}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                  {isProfileDropdownOpen && (
                    <div className={styles.profileDropdown}>
                      <div className={styles.dropdownItem} onClick={() => handleNavigation('/profile')}>
                        My Profile
                      </div>
                      <div className={styles.dropdownItem} onClick={() => handleNavigation('/trips')}>
                        My Trips
                      </div>
                      <div className={styles.dropdownItem} onClick={handleLogout}>
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        isClosing={isMobileMenuClosing}
        onClose={closeMobileMenu}
        onNavigate={handleMobileNavigation}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
