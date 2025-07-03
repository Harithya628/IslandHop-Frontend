import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { updateUserData } from '../utils/userStorage';
import styles from './Navbar.module.css';
import islandHopLogo from '../assets/IslandHop.png';
import islandHopIcon from '../assets/islandHopIcon.png';
import MobileMenu from './MobileMenu';
import ProfileModal from './ProfileModal';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, isAuthenticated, displayInfo, logout } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  console.log('🔍 Navbar - Auth state:', { 
    isAuthenticated, 
    role, 
    displayName: displayInfo?.displayName 
  });

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && !isMobileMenuClosing) {
      document.body.classList.add('mobile-menu-open');
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
    setIsProfileDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
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
    }, 300);
  };

  const handleMobileNavigation = (path) => {
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      navigate(path);
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, 300);
  };

  const handleLogout = async () => {
    console.log('👋 Navbar: Logging out...');
    setIsProfileDropdownOpen(false);
    setIsMobileMenuClosing(true);
    
    try {
      await logout();
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsMobileMenuClosing(false);
        navigate('/');
      }, 300);
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  const handleLogin = () => {
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
      navigate('/login');
    }, 300);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (displayInfo?.displayName) {
      const names = displayInfo.displayName.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    if (displayInfo?.email) {
      return displayInfo.email[0].toUpperCase();
    }
    return 'U';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest(`.${styles.profileContainer}`)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

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
                onClick={() => handleNavigation('/explore')}
              >
                Explore
              </div>
              <div 
                className={`${styles.navItem} ${isActive('/my-trips') ? styles.active : ''}`}
                onClick={() => handleNavigation('/my-trips')}
              >
                Trips
              </div>
              <div 
                className={`${styles.navItem} ${isActive('/pools') ? styles.active : ''}`}
                onClick={() => handleNavigation('/pools')}
              >
                Pools
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
              {!isAuthenticated ? (
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
                      {displayInfo?.photoURL ? (
                        <img 
                          src={displayInfo.photoURL} 
                          alt="Profile" 
                          className={styles.profileImage}
                        />
                      ) : (
                        <div className={styles.profileAvatar}>
                          {getUserInitials()}
                        </div>
                      )}
                    </div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>
                        {displayInfo?.displayName || 'User'}
                      </span>
                      <span className={styles.userRole}>
                        {role || 'Tourist'}
                      </span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.dropdownIcon}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                  
                  {isProfileDropdownOpen && (
                    <div className={styles.profileDropdown}>

                      {role === 'tourist' && (
                        <>
                          <div className={styles.dropdownItem} onClick={openProfileModal}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                            Profile Details
                          </div>
                          <div className={styles.dropdownItem} onClick={() => handleNavigation('/my-trips')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                              <polyline points="9,22 9,12 15,12 15,22"/>
                            </svg>
                            My Trips
                          </div>
                          <div className={styles.dropdownItem} onClick={() => handleNavigation('/favorites')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            Favorites
                          </div>
                          <div className={styles.dropdownDivider}></div>
                        </>
                      )}
                      
                      <div className={styles.dropdownItem} onClick={() => handleNavigation('/settings')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3"/>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                        </svg>
                        Settings

                      </div>
                      
                      <div className={styles.dropdownDivider}></div>
                      
                      <div className={styles.dropdownItem} onClick={handleLogout}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                          <polyline points="16,17 21,12 16,7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
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
        isLoggedIn={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={closeProfileModal}
          user={user}
          displayInfo={displayInfo}
        />
      )}
    </>
  );
};

export default Navbar;
