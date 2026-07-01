import React, { useState, useEffect } from 'react';
import { getAdminStats, getAllUsers, getAllBookingsAdmin } from '../../services/api';
import { UsersIcon, HomeIcon, CalendarIcon, DollarIcon } from '../../components/Icons';
import { useTheme } from '../../context/ThemeContext';

function AdminDashboard() {
  const { darkMode } = useTheme();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingProperties: 0,
    activeUsers: 0,
    monthlyBookings: 0,
    monthlyRevenue: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsResponse = await getAdminStats();
      setStats(statsResponse.data);
      
      // Fetch all users for recent list
      const usersResponse = await getAllUsers();
      const users = usersResponse.data || [];
      // Get last 5 users (most recent by id descending)
      const recentUsersList = [...users].reverse().slice(0, 5);
      setRecentUsers(recentUsersList);
      
      // Fetch all bookings for recent list
      const bookingsResponse = await getAllBookingsAdmin();
      const bookings = bookingsResponse.data || [];
      // Get last 5 bookings (most recent by id descending)
      const recentBookingsList = [...bookings].reverse().slice(0, 5);
      setRecentBookings(recentBookingsList);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const bgColor = darkMode ? '#0f172a' : '#ffffff';
  const cardBg = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#cbd5e1' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchAllData} style={{ padding: '8px 16px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', background: bgColor, minHeight: '100vh', color: textColor }}>
      <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '32px', marginBottom: '8px' }}>
        Admin Dashboard
      </h1>
      <p style={{ color: textMuted, marginBottom: '32px' }}>
        Overview of platform activity and statistics
      </p>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}` }}>
          <div style={{ marginBottom: '8px', color: '#C4622D' }}><UsersIcon size={32}/></div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#C4622D' }}>{stats.totalUsers || 0}</div>
          <div style={{ fontSize: '13px', color: textMuted }}>Total Users</div>
          <div style={{ fontSize: '11px', color: '#2E7D32', marginTop: '8px' }}>{stats.activeUsers || 0} active</div>
        </div>

        <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}` }}>
          <div style={{ marginBottom: '8px', color: '#C4622D' }}><HomeIcon size={32}/></div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#C4622D' }}>{stats.totalProperties || 0}</div>
          <div style={{ fontSize: '13px', color: textMuted }}>Total Properties</div>
          <div style={{ fontSize: '11px', color: darkMode ? '#fcd34d' : '#ED6C02', marginTop: '8px' }}>{stats.pendingProperties || 0} pending approval</div>
        </div>

        <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}` }}>
          <div style={{ marginBottom: '8px', color: '#C4622D' }}><CalendarIcon size={32}/></div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#C4622D' }}>{stats.totalBookings || 0}</div>
          <div style={{ fontSize: '13px', color: textMuted }}>Total Bookings</div>
          <div style={{ fontSize: '11px', color: darkMode ? '#86efac' : '#2E7D32', marginTop: '8px' }}>+{stats.monthlyBookings || 0} this month</div>
        </div>

        <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}` }}>
          <div style={{ marginBottom: '8px', color: '#C4622D' }}><DollarIcon size={32}/></div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#C4622D' }}>${(stats.totalRevenue || 0).toLocaleString()}</div>
          <div style={{ fontSize: '13px', color: textMuted }}>Total Revenue</div>
          <div style={{ fontSize: '11px', color: darkMode ? '#86efac' : '#2E7D32', marginTop: '8px' }}>
            +${(stats.monthlyRevenue || 0).toLocaleString()} this month
          </div>
        </div>
      </div>

      {/* Recent Activity - REAL DATA */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Users - FROM BACKEND */}
        <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}` }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '18px', marginBottom: '16px', color: textColor }}>Recent Users</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentUsers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: textMuted }}>No users found</div>
            ) : (
              recentUsers.map((user, index) => (
                <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${borderColor}` }}>
                  <div>
                    <div style={{ fontWeight: 500, color: textColor }}>{user.name || 'Unknown'}</div>
                    <div style={{ fontSize: '12px', color: textMuted }}>{user.email}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: textMuted }}>{formatDate(user.createdAt)}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bookings - FROM BACKEND */}
        <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}` }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '18px', marginBottom: '16px', color: textColor }}>Recent Bookings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: textMuted }}>No bookings yet</div>
            ) : (
              recentBookings.map((booking) => (
                <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${borderColor}` }}>
                  <div>
                    <div style={{ fontWeight: 500, color: textColor }}>{booking.property?.title || 'Unknown Property'}</div>
                    <div style={{ fontSize: '12px', color: textMuted }}>{booking.user?.name || 'Unknown User'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, color: '#C4622D' }}>${booking.totalPrice || 0}</div>
                    <div style={{ fontSize: '11px', color: textMuted }}>{formatDate(booking.createdAt)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;