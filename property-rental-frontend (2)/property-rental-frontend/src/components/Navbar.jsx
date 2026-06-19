import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { wishlist } = useWishlist();
  const isAdmin = user?.role === 'ADMIN';
  const [scrolled, setScrolled] = useState(false);

  const isSolidPage = location.pathname === '/dashboard' || 
                      location.pathname === '/wishlist' ||
                      location.pathname.startsWith('/admin') ||
                      location.pathname.startsWith('/property') ||
                      location.pathname.startsWith('/checkout');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const isSolid = isSolidPage || scrolled;

  const navStyle = {
    background: isSolid 
      ? (darkMode ? '#16213e' : 'white') 
      : 'transparent',
    borderBottom: isSolid ? (darkMode ? '1px solid #2c3e50' : '1px solid #E8D5B7') : 'none',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    boxShadow: isSolid ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
  };

  const linkStyle = {
    fontSize: '14px',
    color: isSolid 
      ? (darkMode ? '#ccc' : '#4A4A4A')
      : 'white',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s'
  };

  const logoScheme = isSolid ? '#C4622D' : 'white';

  return (
    <nav style={navStyle}>
      <Link to="/" style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '22px',
        fontWeight: 700,
        color: logoScheme,
        textDecoration: 'none'
      }}>
        Vila<span style={{ color: isSolid ? '#8B5E3C' : '#F0A875' }}>Stay</span>
      </Link>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Explore</Link>
        
        {user && (
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        )}
        
        <Link to="/wishlist" style={linkStyle}>
          ❤️ Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
        </Link>
        
        {(user?.role === 'OWNER' || user?.role === 'ADMIN') && (
          <Link to="/add-property" style={linkStyle}>🏠 List Property</Link>
        )}

        {isAdmin && (
          <Link to="/admin" style={{ ...linkStyle, color: '#C4622D', fontWeight: 600 }}>
            ⚡ Admin
          </Link>
        )}
        
        <button
          onClick={toggleDarkMode}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '5px',
            color: isSolid ? (darkMode ? '#ccc' : '#4A4A4A') : 'white'
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {!user ? (
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/login">
            <button style={{
              background: 'transparent',
              color: isSolid ? '#C4622D' : 'white',
              border: `1px solid ${isSolid ? '#C4622D' : 'white'}`,
              padding: '8px 22px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button style={{
              background: isSolid ? '#C4622D' : 'white',
              color: isSolid ? 'white' : '#C4622D',
              border: 'none',
              padding: '8px 22px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <div 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: isSolid ? '#C4622D' : 'white',
            color: isSolid ? 'white' : '#C4622D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600
          }}>
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: isSolid ? (darkMode ? '#fff' : '#1A1612') : 'white' }}>
            {user?.name?.split(' ')[0] || 'User'}
          </span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;