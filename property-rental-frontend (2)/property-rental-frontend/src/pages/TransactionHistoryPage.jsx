import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getUserPayments } from '../services/api';
import { ReceiptIcon, CalendarIcon, CreditCardIcon, MapPinIcon, CheckCircleIcon, DollarIcon } from '../components/Icons';

function TransactionHistoryPage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [expanded, setExpanded] = useState(null);

  const bgColor    = darkMode ? '#0f0f23' : '#FAF8F4';
  const cardBg     = darkMode ? '#1a1a2e' : 'white';
  const textColor  = darkMode ? '#fff' : '#1A1612';
  const textMuted  = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user?.id) { navigate('/login'); return; }

    getUserPayments(user.id)
      .then(res => setTransactions(res.data || []))
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const fmtTime = (d) => new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const statusColor = { SUCCESS: '#2E7D32', FAILED: '#C62828', REFUNDED: '#C4622D' };
  const statusBg    = { SUCCESS: '#E8F5E9', FAILED: '#FFEBEE', REFUNDED: '#FEF5EF' };

  const filtered = filter === 'ALL' ? transactions : transactions.filter(t => t.status === filter);

  const totalSpent   = transactions.filter(t => t.status === 'SUCCESS').reduce((s, t) => s + t.amount, 0);
  const totalCount   = transactions.filter(t => t.status === 'SUCCESS').length;
  const refundCount  = transactions.filter(t => t.status === 'REFUNDED').length;

  return (
    <div style={{ background: bgColor, minHeight: '100vh', padding: '80px 24px 48px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', color: textColor, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ReceiptIcon size={30} stroke="#C4622D"/> Transaction History
          </h1>
          <p style={{ color: textMuted }}>All your payments and bookings in one place.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Spent', value: `$${totalSpent}`, icon: <DollarIcon size={22}/>, color: '#C4622D' },
            { label: 'Bookings Paid', value: totalCount, icon: <CheckCircleIcon size={22}/>, color: '#2E7D32' },
            { label: 'Refunds', value: refundCount, icon: <ReceiptIcon size={22}/>, color: '#9A8F84' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} style={{ background: cardBg, borderRadius: '16px', padding: '20px', border: `1px solid ${borderColor}`, textAlign: 'center' }}>
              <div style={{ color, marginBottom: '8px' }}>{icon}</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: textColor }}>{value}</div>
              <div style={{ fontSize: '12px', color: textMuted, marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['ALL', 'SUCCESS', 'REFUNDED', 'FAILED'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '8px 18px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
              background: filter === f ? '#C4622D' : (darkMode ? '#1a1a2e' : 'white'),
              color: filter === f ? 'white' : textMuted,
              border: `1px solid ${filter === f ? '#C4622D' : borderColor}`
            }}>
              {f === 'ALL' ? `All (${transactions.length})` : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Transaction list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: textMuted }}>Loading transactions...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: cardBg, borderRadius: '20px', border: `1px solid ${borderColor}` }}>
            <ReceiptIcon size={48} stroke={textMuted}/>
            <h3 style={{ color: textColor, margin: '16px 0 8px' }}>No transactions yet</h3>
            <p style={{ color: textMuted, marginBottom: '24px' }}>Your payment history will appear here after your first booking.</p>
            <button onClick={() => navigate('/')} style={{ padding: '12px 28px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 500 }}>
              Browse Properties
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(txn => (
              <div key={txn.id} style={{ background: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, overflow: 'hidden' }}>
                {/* Row */}
                <div
                  onClick={() => setExpanded(expanded === txn.id ? null : txn.id)}
                  style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                >
                  {/* Icon */}
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: statusBg[txn.status] || '#FAF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CreditCardIcon size={20} stroke={statusColor[txn.status] || '#9A8F84'}/>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: textColor, fontSize: '15px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {txn.propertyTitle}
                    </div>
                    <div style={{ fontSize: '12px', color: textMuted, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontFamily: 'monospace' }}>{txn.transactionId}</span>
                      · {fmt(txn.createdAt)} {fmtTime(txn.createdAt)}
                    </div>
                  </div>

                  {/* Amount + status */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '17px', color: txn.status === 'REFUNDED' ? '#C4622D' : textColor }}>
                      {txn.status === 'REFUNDED' ? '+' : '-'}${txn.amount}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '20px', background: statusBg[txn.status], color: statusColor[txn.status] }}>
                      {txn.status}
                    </span>
                  </div>

                  <div style={{ color: textMuted, fontSize: '18px', marginLeft: '4px' }}>{expanded === txn.id ? '▲' : '▼'}</div>
                </div>

                {/* Expanded details */}
                {expanded === txn.id && (
                  <div style={{ padding: '0 24px 20px', borderTop: `1px solid ${borderColor}` }}>
                    <div style={{ paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                      {[
                        { label: 'Property', value: txn.propertyTitle },
                        { label: 'Location', value: txn.propertyLocation, icon: <MapPinIcon size={12}/> },
                        { label: 'Check-in', value: txn.checkIn ? fmt(txn.checkIn) : '—' },
                        { label: 'Check-out', value: txn.checkOut ? fmt(txn.checkOut) : '—' },
                        { label: 'Duration', value: txn.nights ? `${txn.nights} night${txn.nights > 1 ? 's' : ''}` : '—' },
                        { label: 'Guests', value: txn.guests ? `${txn.guests} guest${txn.guests > 1 ? 's' : ''}` : '—' },
                        { label: 'Payment', value: txn.paymentMethod === 'CARD' ? `Card •••• ${txn.cardLast4}` : 'PayPal' },
                        { label: 'Booking', value: txn.bookingStatus || '—' },
                      ].map(({ label, value, icon }) => (
                        <div key={label}>
                          <div style={{ color: textMuted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{label}</div>
                          <div style={{ color: textColor, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {icon && <span style={{ color: '#C4622D' }}>{icon}</span>}{value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionHistoryPage;
