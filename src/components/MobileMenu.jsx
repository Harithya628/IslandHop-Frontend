import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ 
  isOpen, 
  isClosing, 
  onClose, 
  onNavigate, 
  isLoggedIn, 
  onLogin, 
  onLogout 
}) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.mobileMenuOverlay} ${isClosing ? styles.closing : ''}`} onClick={onClose}>
      <div className={`${styles.mobileMenu} ${isClosing ? styles.closing : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Mobile Menu Header */}
        <div className={styles.mobileMenuHeader}>
          <h3>Menu</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Items */}
        <div className={styles.mobileNavItems}>
          <div 
            className={`${styles.mobileNavItem} ${isActive('/') ? styles.active : ''}`}
            onClick={() => onNavigate('/')}
          >
            Home
          </div>
          <div 
            className={`${styles.mobileNavItem} ${isActive('/explore') ? styles.active : ''}`}
            onClick={() => onNavigate('/explore')}
          >
            Explore
          </div>
          <div 
            className={`${styles.mobileNavItem} ${isActive('/plan-trip') ? styles.active : ''}`}
            onClick={() => onNavigate('/plan-trip')}
          >
            Trips
          </div>
          <div 
            className={`${styles.mobileNavItem} ${isActive('/join-pool') ? styles.active : ''}`}
            onClick={() => onNavigate('/join-pool')}
          >
            Pools
          </div>
        </div>

        {/* Mobile Utility Buttons */}
        <div className={styles.mobileUtilityButtons}>
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

        {/* Mobile Auth Buttons */}
        <div className={styles.mobileAuthButtons}>
          {!isLoggedIn ? (
            <>
              <div 
                className={`${styles.mobileLoginBtn} ${isActive('/login') ? styles.active : ''}`}
                onClick={() => onNavigate('/login')}
              >
                Login
              </div>
              <div 
                className={`${styles.mobileSignUpBtn} ${isActive('/signup') ? styles.active : ''}`}
                onClick={() => onNavigate('/signup')}
              >
                Sign Up
              </div>
            </>
          ) : (
            <div className={styles.mobileProfileSection}>
              <div className={styles.mobileProfileInfo}>
                <div className={styles.profileAvatar}>JS</div>
                <span>John Smith</span>
              </div>
              <div className={styles.mobileProfileActions}>
                <div className={styles.mobileNavItem} onClick={() => onNavigate('/profile')}>
                  My Profile
                </div>
                <div className={styles.mobileNavItem} onClick={() => onNavigate('/trips')}>
                  My Trips
                </div>
                <div className={`${styles.mobileNavItem} ${styles.logoutBtn}`} onClick={onLogout}>
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
