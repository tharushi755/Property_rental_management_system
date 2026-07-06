import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getAllBookingsAdmin, cancelBooking } from '../../services/api';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllBookingsAdmin();
      setBookings(response.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b =>
    b.property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cancelBookingHandler = async (id) => {
    if (window.confirm('Cancel this booking?')) {
      try {
        await cancelBooking(id);
        fetchBookings();
        alert('Booking cancelled');
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  const { darkMode } = useTheme();
  const bgColor = darkMode ? '#0f172a' : '#ffffff';
  const cardBg = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#cbd5e1' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';
  const inputBg = darkMode ? '#17213a' : '#ffffff';
  const tableHeaderBg = darkMode ? '#152135' : '#FAF8F4';
  const tableRowBorder = darkMode ? '#2c3e50' : '#F0EAE0';

  const totalRevenue = bookings.filter(b => b.status === 'CONFIRMED').reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  if (loading) {
    return <div style={{ padding: '32px', textAlign: 'center' }}>Loading bookings...</div>;
  }

  return (
    <div style={{ padding: '32px', background: bgColor, color: textColor }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '32px', marginBottom: '8px' }}>Booking Management</h1>
          <p style={{ color: textMuted }}>Total Revenue: <strong style={{ color: '#C4622D' }}>${totalRevenue.toLocaleString()}</strong></p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Search by property or guest..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px 16px', border: `1px solid ${borderColor}`, borderRadius: '10px', width: '250px', outline: 'none', background: inputBg, color: textColor, boxShadow: darkMode ? 'inset 0 0 0 1px rgba(255,255,255,0.05)' : 'none' }} />
        </div>
      </div>

      <div style={{ background: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: tableHeaderBg, borderBottom: `1px solid ${borderColor}` }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', color: textMuted }}>Property</th>
              <th style={{ padding: '16px', textAlign: 'left', color: textMuted }}>Guest</th>
              <th style={{ padding: '16px', textAlign: 'left', color: textMuted }}>Dates</th>
              <th style={{ padding: '16px', textAlign: 'left', color: textMuted }}>Amount</th>
              <th style={{ padding: '16px', textAlign: 'left', color: textMuted }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', color: textMuted }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id} style={{ borderBottom: `1px solid ${tableRowBorder}` }}>
                <td style={{ padding: '16px', fontWeight: 500, color: textColor }}>{booking.property?.title || 'N/A'}</td>
                <td style={{ padding: '16px', color: textColor }}>{booking.user?.name || 'N/A'}</td>
                <td style={{ padding: '16px', fontSize: '13px', color: darkMode ? '#a0aec0' : '#666' }}>{booking.checkIn} → {booking.checkOut}</td>
                <td style={{ padding: '16px', fontWeight: 600, color: '#C4622D' }}>${booking.totalPrice}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, background: booking.status === 'CONFIRMED' ? (darkMode ? '#164e1a' : '#E8F5E9') : (darkMode ? '#4c1f1f' : '#FFEBEE'), color: booking.status === 'CONFIRMED' ? (darkMode ? '#bef264' : '#2E7D32') : (darkMode ? '#fecaca' : '#C62828') }}>
                    {booking.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  {booking.status === 'CONFIRMED' && (
                    <button onClick={() => cancelBookingHandler(booking.id)} style={{ padding: '6px 12px', background: '#C62828', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBookings;