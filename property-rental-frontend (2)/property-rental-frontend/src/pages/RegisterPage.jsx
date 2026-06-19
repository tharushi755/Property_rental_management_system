import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { LuggageIcon, HomeIcon } from '../components/Icons';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email.includes('@') || !formData.password || formData.password.length < 6) {
      setError('Please fill all fields correctly. Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      // Send registration request to BACKEND
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });

      if (response.data.success) {
        const userData = response.data.user;
        // Save to localStorage for frontend state
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
      background: '#FAF8F4'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid #E8D5B7'
      }}>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '6px'
        }}>Create account</h2>
        <p style={{ fontSize: '14px', color: '#9A8F84', marginBottom: '28px' }}>
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
          <div style={{ marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>I am a:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div
              onClick={() => setFormData({...formData, role: 'GUEST'})}
              style={{
                border: `1px solid ${formData.role === 'GUEST' ? '#C4622D' : '#E8D5B7'}`,
                borderRadius: '10px',
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                background: formData.role === 'GUEST' ? '#FEF5EF' : 'white'
              }}
            >
              <div style={{ marginBottom: '4px', color: formData.role === 'GUEST' ? '#C4622D' : '#999' }}><LuggageIcon size={24}/></div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>Guest</div>
            </div>
            <div
              onClick={() => setFormData({...formData, role: 'OWNER'})}
              style={{
                border: `1px solid ${formData.role === 'OWNER' ? '#C4622D' : '#E8D5B7'}`,
                borderRadius: '10px',
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                background: formData.role === 'OWNER' ? '#FEF5EF' : 'white'
              }}
            >
              <div style={{ marginBottom: '4px', color: formData.role === 'OWNER' ? '#C4622D' : '#999' }}><HomeIcon size={24}/></div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>Property Owner</div>
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{
                width: '100%',
                border: '1px solid #E8D5B7',
                borderRadius: '10px',
                padding: '11px 14px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{
                width: '100%',
                border: '1px solid #E8D5B7',
                borderRadius: '10px',
                padding: '11px 14px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{
                width: '100%',
                border: '1px solid #E8D5B7',
                borderRadius: '10px',
                padding: '11px 14px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              style={{
                width: '100%',
                border: '1px solid #E8D5B7',
                borderRadius: '10px',
                padding: '11px 14px',
                fontSize: '14px',
                outline: 'none'
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
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#9A8F84' }}>
          Already have an account? <Link to="/login" style={{ color: '#C4622D', cursor: 'pointer' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;