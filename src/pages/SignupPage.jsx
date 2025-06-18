import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import sriLankaVideo from '../assets/sri-lanka-video.mp4';
import islandHopLogo from '../assets/IslandHopWhite.png';
import islandHopIcon from '../assets/islandHopIcon.png';
import ProfileCompletionPopup from '../components/ProfileCompletionPopup';
import './SignupPage.css';
import api from '../api/axios';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  // Add GoogleAuthProvider instance
  const provider = new GoogleAuthProvider();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log('User created:', userCredential.user);
      console.log('ID Token:', idToken);

      // Send ID token and role to backend to start session
      const res = await api.post('/session-register', {
        idToken,
        role: 'tourist',
      });

      // Log backend response
      console.log('Backend response (email signup):', res);

      if (res.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Registration failed on server');
      }
    } catch (err) {
      setError(err.message || 'Registration error');
      console.log('Error during email signup:', err);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log('Google user:', result.user);
      console.log('Google ID Token:', idToken);

      const res = await api.post('/session-register', {
        idToken,
        role: 'tourist',
      });

      // Log backend response
      console.log('Backend response (Google signup):', res);

      if (res.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Google registration failed on server');
      }
    } catch (err) {
      setError(err.message || 'Google sign-up error');
      console.log('Error during Google signup:', err);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="signup-container">
      {/* Left side - Video area */}
      <div className="video-section">
        <div className="video-container">
          <video 
            className="signup-video"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src={sriLankaVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-logo" onClick={handleLogoClick}>
            <img src={islandHopIcon} alt="IslandHop Icon" className="logo-icon" />
            <img src={islandHopLogo} alt="IslandHop" className="logo-image" />
          </div>
          <div className="video-overlay">
            <div className="video-content">
              <h3>Welcome to IslandHop</h3>
              <p>Discover the beauty of Sri Lanka with our curated travel experiences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="form-section">
        <div className="signup-box">
          <h2>Create Account</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleEmailSignup}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <span 
                className="forgot-password" 
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </span>
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="divider"><span>or</span></div>
          <button onClick={handleGoogleSignup} className="google-button">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          <p className="login-link">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Login</span>
          </p>
          
          <div className="professional-signup">
            <span 
              className="professional-link" 
              onClick={() => navigate('/signup/professional')}
            >
              Join as a Professional
            </span>
          </div>
        </div>
      </div>

      <ProfileCompletionPopup 
        showPopup={showPopup} 
        onClose={handleClosePopup} 
      />
    </div>
  );
}

export default SignupPage;
