import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const bgColor = darkMode ? '#0f0f23' : '#FAF8F4';
  const cardBg = darkMode ? '#1a1a2e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';
  const inputBg = darkMode ? '#0f0f23' : 'white';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.success) {
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
        alert(`Welcome ${userData.name}! You are now logged in.`);
        navigate('/');
      } else {
        setError(response.data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      background: bgColor
    }}>
      <div style={{
        background: cardBg,
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        border: `1px solid ${borderColor}`,
        boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '6px',
          color: textColor
        }}>Welcome back</h2>
        <p style={{ fontSize: '14px', color: textMuted, marginBottom: '28px' }}>
          Sign in to access your bookings and saved properties.
        </p>

        {error && (
          <div style={{
            background: '#FFEBEE',
            color: '#C62828',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '13px'
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, marginBottom: '6px', display: 'block', color: textColor }}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vilastay.com"
              required
              style={{
                width: '100%',
                border: `1px solid ${error && !email ? '#C4622D' : borderColor}`,
                borderRadius: '10px',
                padding: '11px 14px',
                fontSize: '14px',
                outline: 'none',
                background: inputBg,
                color: textColor
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, marginBottom: '6px', display: 'block', color: textColor }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              style={{
                width: '100%',
                border: `1px solid ${error && !password ? '#C4622D' : borderColor}`,
                borderRadius: '10px',
                padding: '11px 14px',
                fontSize: '14px',
                outline: 'none',
                background: inputBg,
                color: textColor
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#C4622D',
              color: 'white',
              border: 'none',
              padding: '13px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '6px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: textMuted }}>
          Don't have an account? <Link to="/register" style={{ color: '#C4622D', cursor: 'pointer' }}>Sign up</Link>
        </p>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${borderColor}` }}>
          <p style={{ fontSize: '12px', color: textMuted, textAlign: 'center' }}>
            Demo Accounts:<br />
            Admin: admin@vilastay.com / admin123<br />
            Guest: guest@example.com / guest123<br />
            Owner: owner@example.com / owner123
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
