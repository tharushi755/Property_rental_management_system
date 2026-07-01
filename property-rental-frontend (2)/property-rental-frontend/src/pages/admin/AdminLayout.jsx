import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { BarChartIcon, UsersIcon, HomeIcon, CalendarIcon, CreditCardIcon } from '../../components/Icons';

function AdminLayout() {
  const location = useLocation();
  const { darkMode } = useTheme();

  const bgColor = darkMode ? '#0f172a' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const activeBg = darkMode ? '#2c3e50' : '#C4622D';
  const activeColor = 'white';

  const navItems = [
    { path: '/admin', name: 'Dashboard', icon: <BarChartIcon size={15}/> },
    { path: '/admin/users', name: 'Users', icon: <UsersIcon size={15}/> },
    { path: '/admin/properties', name: 'Properties', icon: <HomeIcon size={15}/> },
    { path: '/admin/bookings', name: 'Bookings', icon: <CalendarIcon size={15}/> },
    { path: '/admin/payments', name: 'Payments', icon: <CreditCardIcon size={15}/> },
  ];

  return (
    <div style={{ background: bgColor, minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 32px 40px' }}>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '32px', color: textColor, marginBottom: '8px' }}>
          Admin Panel
        </h1>
        <p style={{ color: '#9A8F84', marginBottom: '32px' }}>
          Manage users, properties, bookings and payments
        </p>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: `1px solid ${darkMode ? '#2c3e50' : '#E8D5B7'}`,
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: location.pathname === item.path ? activeBg : 'transparent',
                color: location.pathname === item.path ? activeColor : textColor,
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s'
              }}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;