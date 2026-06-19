import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Footer() {
  const { darkMode } = useTheme();

  const footerBg = darkMode ? '#0f0f1a' : '#1A1612';
  const textColor = darkMode ? '#aaa' : '#ccc';
  const borderColor = darkMode ? '#2c3e50' : '#333';

  return (
    <footer style={{
      background: footerBg,
      color: textColor,
      padding: '48px 32px 24px',
      marginTop: '60px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px',
            color: '#C4622D',
            marginBottom: '16px'
          }}>
            Vila<span style={{ color: '#E8D5B7' }}>Stay</span>
          </h3>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: textColor }}>
            Find your perfect getaway with VilaStay. Book villas, cabanas, and hotels at the best prices.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}><Link to="/" style={{ color: textColor, textDecoration: 'none', fontSize: '13px' }}>Home</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/properties" style={{ color: textColor, textDecoration: 'none', fontSize: '13px' }}>Properties</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/wishlist" style={{ color: textColor, textDecoration: 'none', fontSize: '13px' }}>Wishlist</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/contact" style={{ color: textColor, textDecoration: 'none', fontSize: '13px' }}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}><Link to="/" style={{ color: textColor, textDecoration: 'none', fontSize: '13px' }}>Help Center</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/" style={{ color: textColor, textDecoration: 'none', fontSize: '13px' }}>Cancellation Policy</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/" style={{ color: textColor, textDecoration: 'none', fontSize: '13px' }}>Privacy Policy</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/" style={{ color: textColor, textDecoration: 'none', fontSize: '13px' }}>Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>Contact</h4>
          <p style={{ fontSize: '13px', marginBottom: '8px' }}>📧 support@vilastay.com</p>
          <p style={{ fontSize: '13px', marginBottom: '8px' }}>📞 +1 (555) 123-4567</p>
          <p style={{ fontSize: '13px' }}>📍 123 Travel Street, Suite 100</p>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        paddingTop: '32px',
        marginTop: '32px',
        borderTop: `1px solid ${borderColor}`,
        fontSize: '12px',
        color: textColor
      }}>
        <p>© 2024 VilaStay. All rights reserved. | Find Your Perfect Escape</p>
      </div>
    </footer>
  );
}

export default Footer;