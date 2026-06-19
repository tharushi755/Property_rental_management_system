import React, { useState, useEffect, useRef } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Only the home page gets the transparent-over-hero treatment.
  // Every other page forces the glass navbar so text stays readable.
  const isSolidPage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const glassActive = isSolidPage || scrolled;

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
          padding-bottom: 2px;
          letter-spacing: 0.02em;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #C4622D;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-btn-outline {
          background: transparent;
          padding: 8px 22px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.2s ease;
          letter-spacing: 0.03em;
        }
        .nav-btn-outline:hover {
          transform: translateY(-1px);
        }
        .nav-btn-fill {
          padding: 8px 22px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.2s ease;
          letter-spacing: 0.03em;
        }
        .nav-btn-fill:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(196, 98, 45, 0.35);
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
          transition: box-shadow 0.2s;
        }
        .user-menu:hover .user-avatar {
          box-shadow: 0 0 0 3px rgba(196, 98, 45, 0.3);
        }
        .wishlist-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          background: #C4622D;
          color: white;
          border-radius: 9px;
          font-size: 10px;
          font-weight: 700;
          padding: 0 4px;
          margin-left: 4px;
          vertical-align: middle;
        }
        .theme-toggle {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: 64px;
          height: 32px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          transition: background 0.35s ease, box-shadow 0.35s ease;
        }
        .theme-toggle:focus-visible {
          outline: 2px solid #C4622D;
          outline-offset: 2px;
        }
        .theme-toggle-thumb {
          position: absolute;
          top: 3px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 1px 6px rgba(0,0,0,0.25);
          transition: left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .theme-toggle-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          transition: opacity 0.2s ease;
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        transition: 'all 0.35s ease',
        ...(glassActive ? {
          background: darkMode
            ? 'rgba(15, 20, 40, 0.82)'
            : 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: darkMode
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(0,0,0,0.07)',
          boxShadow: darkMode
            ? '0 4px 24px rgba(0,0,0,0.35)'
            : '0 4px 24px rgba(0,0,0,0.06)',
        } : {
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: 'none',
          boxShadow: 'none',
        })
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '23px',
          fontWeight: 700,
          textDecoration: 'none',
          color: glassActive ? '#C4622D' : 'white',
          letterSpacing: '-0.02em',
          flexShrink: 0,
        }}>
          Vila<span style={{ color: glassActive ? '#8B5E3C' : '#F0A875' }}>Stay</span>
        </Link>

        {/* Center nav links */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <Link
            to="/"
            className={`nav-link${isActive('/') ? ' active' : ''}`}
            style={{ color: glassActive ? (darkMode ? '#e0e0e0' : '#3a3a3a') : 'rgba(255,255,255,0.92)' }}
          >
            Explore
          </Link>

          <Link
            to="/destination/international"
            className={`nav-link${isActive('/destination') ? ' active' : ''}`}
            style={{ color: glassActive ? (darkMode ? '#e0e0e0' : '#3a3a3a') : 'rgba(255,255,255,0.92)' }}
          >
            Destinations
          </Link>

          <Link
            to="/contact"
            className={`nav-link${isActive('/contact') ? ' active' : ''}`}
            style={{ color: glassActive ? (darkMode ? '#e0e0e0' : '#3a3a3a') : 'rgba(255,255,255,0.92)' }}
          >
            Contact
          </Link>

          {(user?.role === 'OWNER' || user?.role === 'ADMIN') && (
            <Link
              to="/add-property"
              className={`nav-link${isActive('/add-property') ? ' active' : ''}`}
              style={{ color: glassActive ? (darkMode ? '#e0e0e0' : '#3a3a3a') : 'rgba(255,255,255,0.92)' }}
            >
              List Property
            </Link>
          )}

          {/* Wishlist icon button */}
          <Link
            to="/wishlist"
            style={{ position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            title="Wishlist"
          >
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke={glassActive ? (darkMode ? '#e0e0e0' : '#3a3a3a') : 'white'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'stroke 0.2s' }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlist.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-7px',
                minWidth: '16px',
                height: '16px',
                background: '#C4622D',
                color: 'white',
                borderRadius: '8px',
                fontSize: '9px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
                lineHeight: 1,
              }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Dark mode toggle — sliding pill */}
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, #1a1f3a, #2d3561)'
                : 'linear-gradient(135deg, #f9a825, #fb8c00)',
            }}
          >
            {/* Sun icon — always on left */}
            <span className="theme-toggle-icon" style={{ left: '8px', opacity: darkMode ? 0.4 : 1 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.5" fill="white" fillOpacity={darkMode ? 0 : 1} stroke="white"/>
                <line x1="12" y1="2" x2="12" y2="4"/>
                <line x1="12" y1="20" x2="12" y2="22"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="2" y1="12" x2="4" y2="12"/>
                <line x1="20" y1="12" x2="22" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </span>

            {/* Moon icon — always on right */}
            <span className="theme-toggle-icon" style={{ right: '8px', opacity: darkMode ? 1 : 0.4 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </span>

            {/* Sliding thumb — plain white circle, no icon */}
            <span
              className="theme-toggle-thumb"
              style={{ left: darkMode ? '35px' : '3px' }}
            />
          </button>
        </div>

        {/* Right: Auth */}
        {!user ? (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button
                className="nav-btn-outline"
                style={{
                  color: glassActive ? '#C4622D' : 'white',
                  border: `1.5px solid ${glassActive ? '#C4622D' : 'rgba(255,255,255,0.7)'}`,
                }}
              >
                Sign In
              </button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <button
                className="nav-btn-fill"
                style={{
                  background: 'linear-gradient(135deg, #C4622D, #a8451a)',
                  color: 'white',
                }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            {/* Trigger */}
            <div
              className="user-menu"
              onClick={() => setDropdownOpen(o => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                padding: '6px 12px 6px 6px',
                borderRadius: '30px',
                transition: 'background 0.2s',
                background: glassActive
                  ? (darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)')
                  : 'rgba(255,255,255,0.12)',
                userSelect: 'none',
              }}
            >
              <div
                className="user-avatar"
                style={{ background: 'linear-gradient(135deg, #C4622D, #a8451a)', color: 'white' }}
              >
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: glassActive ? (darkMode ? '#fff' : '#1A1612') : 'white',
                letterSpacing: '0.01em',
              }}>
                {user?.name?.split(' ')[0] || 'User'}
              </span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke={glassActive ? (darkMode ? '#fff' : '#1A1612') : 'white'}
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                minWidth: '200px',
                background: darkMode ? 'rgba(15,20,40,0.95)' : 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                borderRadius: '14px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
                overflow: 'hidden',
                zIndex: 100,
              }}>
                <div style={{
                  padding: '14px 16px',
                  borderBottom: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: darkMode ? '#fff' : '#1A1612' }}>
                    {user?.name || 'User'}
                  </div>
                  <div style={{ fontSize: '11px', color: darkMode ? '#888' : '#999', marginTop: '2px' }}>
                    {user?.email || ''}
                  </div>
                </div>

                {[
                  { label: 'Dashboard', icon: '▤', to: '/dashboard' },
                  { label: 'Wishlist', icon: '♡', to: '/wishlist' },
                  ...(user?.role === 'OWNER' || user?.role === 'ADMIN'
                    ? [{ label: 'List Property', icon: '＋', to: '/add-property' }]
                    : []),
                  ...(user?.role === 'ADMIN'
                    ? [{ label: 'Admin Panel', icon: '⚡', to: '/admin' }]
                    : []),
                ].map(item => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '11px 16px',
                      fontSize: '13.5px',
                      fontWeight: 500,
                      color: darkMode ? '#ddd' : '#333',
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}

                <div style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)' }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '11px 16px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#e05252',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(224,82,82,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e05252" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
