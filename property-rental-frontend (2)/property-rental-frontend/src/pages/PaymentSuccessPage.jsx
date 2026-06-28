import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { CheckCircleIcon, CalendarIcon, UsersIcon, MapPinIcon, CreditCardIcon, ReceiptIcon } from '../components/Icons';

function PaymentSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const bgColor    = darkMode ? '#0f0f23' : '#FAF8F4';
  const cardBg     = darkMode ? '#1a1a2e' : 'white';
  const textColor  = darkMode ? '#fff' : '#1A1612';
  const textMuted  = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';

  if (!state) {
    navigate('/dashboard');
    return null;
  }

  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ background: bgColor, minHeight: '100vh', padding: '60px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        {/* Success header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(76,175,80,0.35)'
          }}>
            <CheckCircleIcon size={40} stroke="white"/>
          </div>
          <h1 style={{ fontSize: '28px', color: textColor, marginBottom: '8px' }}>Payment Successful!</h1>
          <p style={{ color: textMuted, fontSize: '14px' }}>Your booking is confirmed. A receipt has been saved to your transaction history.</p>
        </div>

        {/* Receipt card */}
        <div style={{ background: cardBg, borderRadius: '20px', border: `1px solid ${borderColor}`, overflow: 'hidden' }}>

          {/* Top accent */}
          <div style={{ height: '4px', background: 'linear-gradient(90deg, #4CAF50, #C4622D)' }}/>

          <div style={{ padding: '28px' }}>
            {/* Transaction ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', color: textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transaction ID</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#C4622D', fontSize: '14px' }}>{state.transactionId}</span>
            </div>

            {/* Property */}
            <div style={{ background: darkMode ? '#0a0a18' : '#FAF8F4', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontWeight: 700, color: textColor, fontSize: '16px', marginBottom: '6px' }}>{state.propertyTitle}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: textMuted, fontSize: '13px' }}>
                <MapPinIcon size={13}/> {state.propertyLocation}
              </div>
            </div>

            {/* Booking details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {[
                { icon: <CalendarIcon size={15}/>, label: 'Check-in', value: fmt(state.checkIn) },
                { icon: <CalendarIcon size={15}/>, label: 'Check-out', value: fmt(state.checkOut) },
                { icon: <CalendarIcon size={15}/>, label: 'Duration', value: `${state.nights} night${state.nights > 1 ? 's' : ''}` },
                { icon: <UsersIcon size={15}/>, label: 'Guests', value: `${state.guests} guest${state.guests > 1 ? 's' : ''}` },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#C4622D', marginTop: '1px' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', color: textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment method */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: darkMode ? '#0a0a18' : '#FAF8F4', borderRadius: '10px', marginBottom: '20px' }}>
              <CreditCardIcon size={16} stroke={textMuted}/>
              <span style={{ color: textMuted, fontSize: '13px' }}>
                {state.paymentMethod === 'CARD'
                  ? `Card ending in ${state.cardLast4}`
                  : 'PayPal'}
              </span>
              <span style={{ marginLeft: 'auto', background: '#E8F5E9', color: '#2E7D32', fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '20px' }}>
                SUCCESS
              </span>
            </div>

            {/* Amount */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: `2px solid ${borderColor}` }}>
              <span style={{ fontWeight: 700, fontSize: '16px', color: textColor }}>Total Paid</span>
              <span style={{ fontWeight: 800, fontSize: '24px', color: '#C4622D' }}>${state.amount} <span style={{ fontSize: '14px', fontWeight: 500, color: textMuted }}>USD</span></span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={() => navigate('/transactions')}
            style={{
              flex: 1, padding: '13px', background: 'transparent',
              border: `2px solid #C4622D`, color: '#C4622D',
              borderRadius: '12px', fontWeight: 600, cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            <ReceiptIcon size={15}/> View Transactions
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              flex: 1, padding: '13px',
              background: 'linear-gradient(135deg, #C4622D, #a8451a)',
              color: 'white', border: 'none', borderRadius: '12px',
              fontWeight: 600, cursor: 'pointer', fontSize: '14px'
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
