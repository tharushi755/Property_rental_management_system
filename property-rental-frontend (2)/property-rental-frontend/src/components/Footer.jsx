import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#ccc',
      fontSize: '16px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = '#C4622D';
      e.currentTarget.style.borderColor = '#C4622D';
      e.currentTarget.style.color = 'white';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      e.currentTarget.style.color = '#ccc';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {children}
  </a>
);

const FooterLink = ({ to, children }) => (
  <li style={{ marginBottom: '10px' }}>
    <Link
      to={to}
      style={{ color: '#9a9a9a', textDecoration: 'none', fontSize: '13.5px', transition: 'color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.color = '#E8D5B7'}
      onMouseLeave={e => e.currentTarget.style.color = '#9a9a9a'}
    >
      {children}
    </Link>
  </li>
);

function Footer() {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const bg = darkMode ? '#080c18' : '#111827';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer style={{ background: bg, color: '#9a9a9a', marginTop: '80px' }}>

      {/* Top gradient accent bar */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #C4622D, #e8956d, #C4622D)',
        backgroundSize: '200% 100%',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px 40px' }}>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '52px',
        }}>

          {/* Brand column */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '26px',
                fontWeight: 700,
                color: '#C4622D',
                letterSpacing: '-0.02em',
              }}>
                Vila<span style={{ color: '#E8D5B7' }}>Stay</span>
              </span>
            </Link>
            <p style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#7a7a7a', maxWidth: '260px', marginBottom: '24px' }}>
              Discover handpicked villas, cabanas, and boutique hotels. Your perfect escape is just a click away.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <SocialIcon href="#" label="Facebook">f</SocialIcon>
              <SocialIcon href="#" label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></SocialIcon>
              <SocialIcon href="#" label="Twitter">𝕏</SocialIcon>
              <SocialIcon href="#" label="LinkedIn">in</SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/wishlist">Wishlist</FooterLink>
              <FooterLink to="/dashboard">Dashboard</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <FooterLink to="/">Help Center</FooterLink>
              <FooterLink to="/">Cancellation Policy</FooterLink>
              <FooterLink to="/">Privacy Policy</FooterLink>
              <FooterLink to="/">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Stay Updated
            </h4>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '13px', color: '#7a7a7a', marginBottom: '12px', lineHeight: 1.5 }}>
                  Get travel deals and new listings in your inbox.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #C4622D, #a8451a)',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            ) : (
              <p style={{ fontSize: '13px', color: '#C4622D', fontWeight: 600, marginBottom: '24px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px',verticalAlign:'middle'}}><polyline points="20 6 9 17 4 12"/></svg>Thanks for subscribing!
              </p>
            )}

            <div style={{ fontSize: '13px', lineHeight: 2, color: '#7a7a7a' }}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>support@vilastay.com</div>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+1 (555) 123-4567</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12.5px', color: '#555', margin: 0 }}>
            © 2024 VilaStay. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <Link
                key={item}
                to="/"
                style={{ fontSize: '12.5px', color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#E8D5B7'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
