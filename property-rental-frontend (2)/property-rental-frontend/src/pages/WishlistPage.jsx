import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { HeartIcon, MapPinIcon, TrashIcon, StarIcon } from '../components/Icons';

function WishlistPage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { wishlist, removeFromWishlist } = useWishlist();

  // Remove duplicates by using unique id
  const uniqueWishlist = wishlist.filter((item, index, self) => 
    index === self.findIndex((t) => t.id === item.id)
  );

  const bgColor = darkMode ? '#1a1a2e' : '#FAF8F4';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';

  return (
    <div style={{ background: bgColor, minHeight: '100vh', padding: '80px 40px 40px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '36px', color: textColor, marginBottom: '8px' }}>
            <HeartIcon size={28} filled color="#C4622D" style={{marginRight:10, verticalAlign:'middle'}}/> My Wishlist
          </h1>
          <p style={{ color: textMuted }}>
            {uniqueWishlist.length} {uniqueWishlist.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {/* Wishlist Grid */}
        {uniqueWishlist.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: cardBg,
            borderRadius: '20px',
            border: `1px solid ${borderColor}`
          }}>
            <div style={{ marginBottom: '16px' }}><HeartIcon size={64} filled color="#C4622D"/></div>
            <h2 style={{ color: textColor, marginBottom: '8px' }}>Your wishlist is empty</h2>
            <p style={{ color: textMuted, marginBottom: '24px' }}>
              Save your favorite properties by clicking the heart icon
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '12px 28px',
                background: '#C4622D',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Browse Properties →
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {uniqueWishlist.map(property => (
              <div
                key={property.id}
                style={{
                  background: cardBg,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: `1px solid ${borderColor}`,
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  onClick={() => navigate(`/property/${property.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={property.image}
                      alt={property.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#C4622D',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}>
                      {property.type}
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px', color: textColor }}>
                      {property.title}
                    </h3>
                    <div style={{ fontSize: '13px', color: textMuted, marginBottom: '12px' }}>
                      <MapPinIcon size={13} style={{marginRight:4, verticalAlign:'middle'}}/>{property.location}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: '#C4622D' }}>${property.price}</span>
                        <span style={{ fontSize: '12px', color: textMuted }}> /night</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <StarIcon size={13} filled color="#FFB800"/>
                        <span style={{ fontWeight: 500 }}>{property.rating}</span>
                        <span style={{ fontSize: '12px', color: textMuted }}>({property.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Remove button */}
                <div style={{ padding: '12px 16px 16px', borderTop: `1px solid ${borderColor}` }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(property.id);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'transparent',
                      color: '#C62828',
                      border: `1px solid #C62828`,
                      borderRadius: '30px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 500,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#C62828';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#C62828';
                    }}
                  >
                    <TrashIcon size={14} style={{marginRight:6, verticalAlign:'middle'}}/> Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;