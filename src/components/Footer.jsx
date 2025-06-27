import React from 'react';
import styles from './Footer.module.css';
import footerLogo from '../assets/islandhop footer 1.png';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={footerLogo} alt="IslandHop Footer Logo" className={styles.logoImg} />
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} IslandHop. All rights reserved.
        </span>
      </div>
      <div className={styles.links}>
        <a href="/explore">Explore</a>
        <a href="/plan-trip">Plan Trip</a>
        <a href="/guide">Guides</a>
        <a href="/support">Support</a>
      </div>
      <button
        className={styles.toTopBtn}
        title="Go to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#fff" stroke="#1FA9FF" strokeWidth="2"/>
          <path d="M16 22V10" stroke="#1FA9FF" strokeWidth="2" strokeLinecap="round"/>
          <path d="M10 16L16 10L22 16" stroke="#1FA9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  </footer>
);

export default Footer;
