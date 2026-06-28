import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { LuggageIcon, HomeIcon } from '../components/Icons';
import { useTheme } from '../context/ThemeContext';

function RegisterPage({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'GUEST'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const bgColor = darkMode ? '#0f172a' : '#ffffff';
  const cardBg = darkMode ? '#1e293b' : 'white';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';
  const inputBg = darkMode ? '#0f172a' : 'white';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name || !formData.email.includes('@') || !formData.password || formData.password.length < 6) {
      setError('Please fill all fields correctly. Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });

      if (response.data.success) {
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
        alert(`Welcome ${formData.name}! Your account has been created.`);
        navigate('/');
      } else {
        setError(response.data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
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
        }}>Create account</h2>
        <p style={{ fontSize: '14px', color: textMuted, marginBottom: '28px' }}>
          Join thousands of travellers finding perfect stays.
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
          <div style={{ marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>I am a:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div
              onClick={() => setFormData({...formData, role: 'GUEST'})}
              style={{
                border: `1px solid ${formData.role === 'GUEST' ? '#C4622D' : borderColor}`,
                borderRadius: '10px',
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                background: formData.role === 'GUEST' ? '#FEF5EF' : cardBg
              }}
            >
              <div style={{ marginBottom: '4px', color: formData.role === 'GUEST' ? '#C4622D' : textMuted }}><LuggageIcon size={24}/></div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: textColor }}>Guest</div>
            </div>
            <div
              onClick={() => setFormData({...formData, role: 'OWNER'})}
              style={{
                border: `1px solid ${formData.role === 'OWNER' ? '#C4622D' : borderColor}`,
                borderRadius: '10px',
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                background: formData.role === 'OWNER' ? '#FEF5EF' : cardBg
              }}
            >
              <div style={{ marginBottom: '4px', color: formData.role === 'OWNER' ? '#C4622D' : textMuted }}><HomeIcon size={24}/></div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: textColor }}>Property Owner</div>
            </div>
          </div>

          {['text', 'email', 'text', 'password'].map((type, i) => {
            const fields = [
              { key: 'name', placeholder: 'Full name' },
              { key: 'email', placeholder: 'Email' },
              { key: 'phone', placeholder: 'Phone (optional)' },
              { key: 'password', placeholder: 'Password (min 6 characters)' },
            ];
            const f = fields[i];
            return (
              <div key={f.key} style={{ marginBottom: '16px' }}>
                <input
                  type={type}
                  placeholder={f.placeholder}
                  value={formData[f.key]}
                  onChange={(e) => setFormData({...formData, [f.key]: e.target.value})}
                  required={f.key !== 'phone'}
                  style={{
                    width: '100%',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '11px 14px',
                    fontSize: '14px',
                    outline: 'none',
                    background: inputBg,
                    color: textColor
                  }}
                />
              </div>
            );
          })}

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
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: textMuted }}>
          Already have an account? <Link to="/login" style={{ color: '#C4622D', cursor: 'pointer' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
