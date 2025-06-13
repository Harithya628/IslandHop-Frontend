import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Axios instance
import './SignupPage.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Send ID token and role to backend to start session
      const res = await api.post('/session-register', {
        idToken,
        role: 'tourist',
      });

      if (res.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Registration failed on server');
      }
    } catch (err) {
      setError(err.message || 'Registration error');
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await api.post('/session-register', {
        idToken,
        role: 'tourist',
      });

      if (res.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Google registration failed on server');
      }
    } catch (err) {
      setError(err.message || 'Google sign-up error');
    }
  };

  return (
    <div className="signup-container">
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
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="divider"><span>or</span></div>
        <button onClick={handleGoogleSignup} className="google-button">
          Continue with Google
        </button>
        <p className="login-link">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
