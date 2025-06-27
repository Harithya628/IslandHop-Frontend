import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import sriLankaVideo from '../assets/sri-lanka-video.mp4';
import islandHopLogo from '../assets/IslandHop.png';
import islandHopLogoWhite from '../assets/IslandHopWhite.png';
import islandHopIcon from '../assets/islandHopIcon.png';
import './LoginPage.css';
import api from '../api/axios';
import Footer from '../components/Footer';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Send ID token to backend for session login
      const res = await api.post('/login', { idToken });

      if (res.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Login failed on server');
      }
    } catch (err) {
      setError(err.message || 'Login error');
      console.log('Error during email login:', err);
    }
  };

  const handleGoogleLogin = async () => {
    console.log('Google login');
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Send ID token to backend for session login
      const res = await api.post('/login', { idToken });

      if (res.status === 200) {
        console.log('Google login successful:', res.data);
        navigate('/dashboard');
      } else {
        setError('Google login failed on server');
      }
    } catch (err) {
      setError(err.message || 'Google login error');
      console.log('Error during Google login:', err);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="login-container">
        {/* Top left logo */}
        <div className="top-logo" onClick={handleLogoClick}>
          <img src={islandHopIcon} alt="IslandHop Icon" className="logo-icon" />
          <img src={islandHopLogoWhite} alt="IslandHop" className="logo-image logo-white" />
          <img src={islandHopLogo} alt="IslandHop" className="logo-image logo-black" />
        </div>

        {/* Left side - Video area */}
        <div className="video-section">
          <div className="video-container">
            <video 
              className="login-video"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src={sriLankaVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay">
              <div className="video-content">
                <h3>Welcome Back<br />to IslandHop</h3>
                <p>Continue your journey through the beauty of Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="form-section">
          <div className="login-box">
            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to your IslandHop account</p>
            
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={handleEmailLogin}>
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
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <span 
                  className="forgot-password"
                  onClick={() => navigate('/forgot-password')}
                  style={{ cursor: 'pointer' }}
                >
                  Forgot password?
                </span>
              </div>
              
              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>
            
            <div className="divider"><span>or</span></div>
            
            <button onClick={handleGoogleLogin} className="google-button">
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <div className="signup-link">
              Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
