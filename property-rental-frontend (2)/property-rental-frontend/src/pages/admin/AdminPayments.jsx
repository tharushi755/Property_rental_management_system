import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getAllPaymentsAdmin, refundPayment } from '../../services/api';

const statusColor = { SUCCESS: '#2E7D32', FAILED: '#C62828', REFUNDED: '#C4622D' };
const statusBg    = { SUCCESS: '#E8F5E9', FAILED: '#FFEBEE', REFUNDED: '#FEF5EF' };

function AdminPayments() {
  const { darkMode } = useTheme();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const cardBg    = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa'    : '#9A8F84';
  const border    = darkMode ? '#2c3e50' : '#E8D5B7';
  const inputBg   = darkMode ? '#0f172a' : '#ffffff';

  useEffect(() => { fetchPayments(); }, []);

  const handleRefund = async (transactionId) => {
    if (!window.confirm(`Refund transaction ${transactionId} and cancel the booking?`)) return;
    try {
      const res = await refundPayment(transactionId);
      if (res.data.success) {
        alert('Payment refunded and booking cancelled successfully.');
        fetchPayments();
      } else {
        alert(res.data.error || 'Refund failed');
      }
    } catch {
      alert('Refund failed. Please try again.');
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getAllPaymentsAdmin();
      setPayments(res.data || []);
    } catch {
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const filtered = payments.filter(p => {
    const matchFilter = filter === 'ALL' || p.status === filter;
    const matchSearch = !search ||
      p.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      p.propertyTitle?.toLowerCase().includes(search.toLowerCase()) ||
      p.cardholderName?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalRevenue   = payments.filter(p => p.status === 'SUCCESS').reduce((s, p) => s + p.amount, 0);
  const successCount   = payments.filter(p => p.status === 'SUCCESS').length;
  const refundedCount  = payments.filter(p => p.status === 'REFUNDED').length;
  const failedCount    = payments.filter(p => p.status === 'FAILED').length;

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: textMuted }}>Loading payments...</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: textColor, marginBottom: '4px' }}>Payment Management</h2>
          <p style={{ color: textMuted, fontSize: '14px' }}>{payments.length} total transactions</p>
        </div>
        <input
          type="text"
          placeholder="Search by transaction ID, property, or name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 16px', border: `1px solid ${border}`, borderRadius: '10px', width: '300px', outline: 'none', background: inputBg, color: textColor, fontSize: '14px' }}
        />
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: '#C4622D' },
          { label: 'Successful', value: successCount, color: '#2E7D32' },
          { label: 'Refunded', value: refundedCount, color: '#C4622D' },
          { label: 'Failed', value: failedCount, color: '#C62828' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: '12px', color: textMuted, marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['ALL', 'SUCCESS', 'REFUNDED', 'FAILED'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 18px', borderRadius: '30px', border: `1px solid ${filter === f ? '#C4622D' : border}`,
            background: filter === f ? '#C4622D' : cardBg, color: filter === f ? 'white' : textMuted,
            cursor: 'pointer', fontSize: '13px', fontWeight: 500
          }}>
            {f === 'ALL' ? `All (${payments.length})` : `${f.charAt(0) + f.slice(1).toLowerCase()} (${payments.filter(p => p.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: cardBg, borderRadius: '16px', border: `1px solid ${border}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${border}`, background: darkMode ? '#0f172a' : '#fafafa' }}>
              {['Transaction ID', 'Property', 'Guest', 'Method', 'Amount', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: textMuted }}>No payments found.</td>
              </tr>
            ) : filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${border}` }}>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#C4622D', fontWeight: 600 }}>{p.transactionId}</span>
                </td>
                <td style={{ padding: '14px 16px', color: textColor, fontSize: '13px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.propertyTitle || '—'}
                </td>
                <td style={{ padding: '14px 16px', color: textColor, fontSize: '13px' }}>
                  {p.cardholderName || '—'}
                </td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: textMuted }}>
                  {p.paymentMethod === 'CARD' ? `Card •••• ${p.cardLast4 || '****'}` : 'PayPal'}
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: textColor }}>
                  ${p.amount}
                </td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: textMuted }}>
                  {p.createdAt ? fmt(p.createdAt) : '—'}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: statusBg[p.status] || '#F5F5F5', color: statusColor[p.status] || '#666' }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  {p.status === 'SUCCESS' && (
                    <button
                      onClick={() => handleRefund(p.transactionId)}
                      style={{ padding: '5px 14px', background: 'transparent', border: '1px solid #C4622D', color: '#C4622D', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                    >
                      Refund
                    </button>
                  )}
                  {p.status === 'REFUNDED' && <span style={{ fontSize: '12px', color: textMuted }}>Refunded</span>}
                  {p.status === 'FAILED' && <span style={{ fontSize: '12px', color: '#C62828' }}>Declined</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p style={{ marginTop: '12px', fontSize: '13px', color: textMuted, textAlign: 'right' }}>
          Showing {filtered.length} of {payments.length} transactions
        </p>
      )}
    </div>
  );
}

export default AdminPayments;
