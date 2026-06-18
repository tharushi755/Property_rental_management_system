import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { createProperty } from '../services/api';

function AddPropertyPage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'Villa',
    location: '',
    price: 100,
    guests: 4,
    beds: 2,
    baths: 2,
    description: '',
    imageUrl: '',
    amenities: ''
  });

  const bgColor = darkMode ? '#1a1a2e' : '#FAF8F4';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Get current user
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (!user || !user.id) {
        setError('Please login to add a property');
        navigate('/login');
        return;
      }
      
      // Check if user is OWNER or ADMIN
      if (user.role !== 'OWNER' && user.role !== 'ADMIN') {
        setError('Only property owners can list properties');
        return;
      }
      
      const propertyData = {
        ...formData,
        price: parseInt(formData.price),
        guests: parseInt(formData.guests),
        beds: parseInt(formData.beds),
        baths: parseInt(formData.baths),
        owner: { id: user.id },
        status: 'PENDING'
      };
      
      await createProperty(propertyData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      console.error('Error creating property:', err);
      setError('Failed to create property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ background: bgColor, minHeight: '100vh', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ background: cardBg, borderRadius: '20px', padding: '60px', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ color: textColor }}>Property Submitted!</h2>
          <p style={{ marginTop: '10px', color: '#9A8F84' }}>Your property has been submitted for admin approval.</p>
          <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 24px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: bgColor, minHeight: '100vh', padding: '80px 40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: textColor, marginBottom: '8px' }}>
          List Your Property
        </h1>
        <p style={{ color: '#9A8F84', marginBottom: '32px' }}>
          Fill in the details below to list your property. It will be reviewed by our team.
        </p>

        {error && (
          <div style={{ background: '#FFEBEE', color: '#C62828', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: cardBg, borderRadius: '20px', padding: '32px', border: `1px solid ${borderColor}` }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Property Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Property Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor }}
              >
                <option>Villa</option><option>Cabin</option><option>Cabana</option><option>Hotel</option>
                <option>Chalet</option><option>Apartment</option><option>Suite</option><option>Bungalow</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Location *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g., Santorini, Greece"
                value={formData.location}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Price/Night ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Max Guests</label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Bedrooms</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.imageUrl}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor }}
            />
            <p style={{ fontSize: '12px', color: '#9A8F84', marginTop: '4px' }}>Use Unsplash or Pexels image URLs</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Amenities</label>
            <input
              type="text"
              name="amenities"
              placeholder="WiFi, Pool, Parking, Kitchen, Air conditioning"
              value={formData.amenities}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: textColor }}>Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your property, its unique features, nearby attractions..."
              value={formData.description}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: bgColor, color: textColor, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{ padding: '12px 24px', background: '#9A8F84', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '12px 24px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyPage;