import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getUserBookings, cancelBooking } from '../services/api';
import { CalendarIcon, HomeIcon, DollarIcon, BeachIcon, UsersIcon } from '../components/Icons';

function DashboardPage({ user }) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const bgColor = darkMode ? '#0f172a' : '#ffffff';
  const cardBg = darkMode ? '#1e293b' : 'white';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';

  // Fetch bookings from backend when component loads
  useEffect(() => {
    if (user && user.id) {
      fetchBookings();
    } else if (!user) {
      navigate('/login');
    }
  }, [user]);

  const fetchBookings = async () => {               
    setLoading(true);
    try {
      const response = await getUserBookings(user.id);
      setBookings(response.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        alert('Booking cancelled successfully');
        fetchBookings(); // Refresh the list
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const totalBookings = bookings?.length || 0;
  const upcomingStays = bookings?.filter(b => b.status === 'CONFIRMED').length || 0;
  const totalSpent = bookings?.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0;

  if (loading) {
    return (
      <div style={{ background: bgColor, minHeight: '100vh', padding: '80px 40px 40px 40px', textAlign: 'center' }}>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ background: bgColor, minHeight: '100vh', padding: '80px 40px 40px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Welcome Header */}
        <div style={{
          background: 'linear-gradient(135deg, #C4622D 0%, #8B5E3C 100%)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '32px',
          color: 'white'
        }}>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '32px', marginBottom: '8px' }}>
            Welcome back, {user?.name || user?.email?.split('@')[0]}!
          </h1>
          <p style={{ opacity: 0.9 }}>Here's what's happening with your bookings.</p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}`, textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', color: '#C4622D' }}><CalendarIcon size={36}/></div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#C4622D' }}>{totalBookings}</div>
            <div style={{ color: textMuted }}>Total Bookings</div>
          </div>

          <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}`, textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', color: '#C4622D' }}><HomeIcon size={36}/></div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#C4622D' }}>{upcomingStays}</div>
            <div style={{ color: textMuted }}>Upcoming Stays</div>
          </div>

          <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}`, textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', color: '#C4622D' }}><DollarIcon size={36}/></div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#C4622D' }}>Rs{totalSpent}</div>
            <div style={{ color: textMuted }}>Total Spent</div>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <button onClick={() => navigate('/transactions')} style={{ padding: '10px 20px', background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '30px', color: '#C4622D', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
            View Transaction History →
          </button>
        </div>

        {/* My Bookings Section */}
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '24px', color: textColor, marginBottom: '20px' }}>
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <div style={{ background: cardBg, borderRadius: '16px', padding: '60px', textAlign: 'center', border: `1px solid ${borderColor}` }}>
            <div style={{ marginBottom: '16px', color: '#C4622D' }}><BeachIcon size={48}/></div>
            <h3 style={{ color: textColor, marginBottom: '8px' }}>No bookings yet</h3>
            <p style={{ color: textMuted, marginBottom: '24px' }}>Start exploring properties to make your first booking!</p>
            <button 
              onClick={() => navigate('/')} 
              style={{ background: '#C4622D', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '30px', cursor: 'pointer' }}
            >
              Browse Properties →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bookings.map((booking) => (
              <div key={booking.id} style={{ 
                background: cardBg, 
                borderRadius: '16px', 
                padding: '20px', 
                border: `1px solid ${borderColor}`, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', color: textColor }}>
                    {booking.property?.title || 'Property'}
                  </h3>
                  <p style={{ fontSize: '13px', color: textMuted }}>
                    <CalendarIcon size={12} style={{marginRight:4}}/>{formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} · <UsersIcon size={12} style={{margin:'0 4px'}}/>{booking.guests} {parseInt(booking.guests) === 1 ? 'guest' : 'guests'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '20px', fontWeight: 700, color: '#C4622D' }}>Rs{booking.totalPrice}</p>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      background: booking.status === 'CONFIRMED' ? '#E8F5E9' : '#FFEBEE', 
                      color: booking.status === 'CONFIRMED' ? '#2E7D32' : '#C62828' 
                    }}>
                      {booking.status === 'CONFIRMED' ? 'Confirmed' : booking.status}
                    </span>
                    {booking.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#C62828',
                          color: 'white',
                          border: 'none',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '11px'
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;