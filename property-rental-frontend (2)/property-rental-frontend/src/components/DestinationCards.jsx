import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function DestinationCards() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const destinations = [
    {
      id: 1,
      name: 'Lake Tahoe',
      slug: 'lake-tahoe',
      location: 'California/Nevada',
      properties: 28,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      tag: 'Popular'
    },
    {
      id: 2,
      name: 'Colorado Rockies',
      slug: 'colorado-rockies',
      location: 'Colorado',
      properties: 24,
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop',
      tag: 'Mountain Views'
    },
    {
      id: 3,
      name: 'Great Smoky Mountains',
      slug: 'great-smoky-mountains',
      location: 'Tennessee/North Carolina',
      properties: 32,
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=250&fit=crop',
      tag: 'Most Booked'
    },
    {
      id: 4,
      name: 'Oregon Coast',
      slug: 'oregon-coast',
      location: 'Oregon',
      properties: 22,
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=250&fit=crop',
      tag: 'Ocean Views'
    },
    {
      id: 5,
      name: 'International',
      slug: 'international',
      location: 'Worldwide',
      properties: 35,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
      tag: 'Global'
    }
  ];

  const handleClick = (destination) => {
    navigate(`/destination/${destination.slug}`, { state: { destination } });
  };

  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#6B5B4F';
  const cardBg = darkMode ? '#1e293b' : 'white';

  return (
    <div style={{ padding: '60px 32px', background: darkMode ? '#0f172a' : '#F8F9FA' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ 
          fontFamily: "'Montserrat', sans-serif", 
          fontSize: '38px', 
          color: textColor,
          marginBottom: '16px'
        }}>
          Where Will You Go?
        </h2>
        <p style={{ color: textMuted, fontSize: '16px' }}>
          Escape to breathtaking destinations around the world
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {destinations.map(dest => (
          <div
            key={dest.id}
            onClick={() => handleClick(dest)}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              background: cardBg,
              boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src={dest.image}
              alt={dest.name}
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '20px' }}>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#C4622D',
                color: 'white',
                fontSize: '11px',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                {dest.tag}
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px', color: textColor }}>{dest.name}</h3>
              <p style={{ fontSize: '13px', color: textMuted, marginBottom: '8px' }}>{dest.location}</p>
              <p style={{ fontSize: '13px', color: '#C4622D', fontWeight: 500 }}>{dest.properties} properties</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationCards;