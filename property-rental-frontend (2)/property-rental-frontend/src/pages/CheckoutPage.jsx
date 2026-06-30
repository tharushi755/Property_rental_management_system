import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { processPayment } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { CreditCardIcon, CheckCircleIcon, LockIcon } from '../components/Icons';

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useTheme();
  const bookingData = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState('');

  const property = bookingData.property || { id: null, title: 'Selected Property', price: 320 };
  const nights   = bookingData.nights  || 3;
  const guests   = bookingData.guests  || 2;
  const checkIn  = bookingData.checkIn;
  const checkOut = bookingData.checkOut;

  const subtotal    = property.price * nights;
  const cleaningFee = 40;
  const serviceFee  = 25;
  const total       = subtotal + cleaningFee + serviceFee;

  const bgColor    = darkMode ? '#0f172a' : '#ffffff';
  const cardBg     = darkMode ? '#1e293b' : 'white';
  const textColor  = darkMode ? '#fff' : '#1A1612';
  const textMuted  = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';

  const formatCardNumber = (v) => {
    const digits = v.replace(/\D/g, '').substring(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, '').substring(0, 4);
    if (digits.length >= 3) return digits.substring(0, 2) + '/' + digits.substring(2);
    return digits;
  };

  const getCardType = (num) => {
    const n = num.replace(/\s/g, '');
    if (/^4/.test(n)) return 'VISA';
    if (/^5[1-5]/.test(n)) return 'MC';
    if (/^3[47]/.test(n)) return 'AMEX';
    return '';
  };

  const processingSteps = [
    'Connecting to payment gateway...',
    'Verifying card details...',
    'Processing payment...',
    'Confirming booking...',
    'Payment successful!'
  ];

  const handlePayment = async () => {
    setError('');

    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        setError('Please fill in all card details'); return;
      }
      if (cardDetails.number.replace(/\s/g, '').length < 16) {
        setError('Please enter a valid 16-digit card number'); return;
      }
      if (cardDetails.cvv.length < 3) {
        setError('CVV must be at least 3 digits'); return;
      }
    }

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user?.id) { navigate('/login'); return; }
    if (!property.id) { setError('Property information missing'); return; }

    setProcessing(true);

    // Animate processing steps
    for (let i = 0; i < processingSteps.length - 1; i++) {
      setProcessingStep(i);
      await new Promise(r => setTimeout(r, 700));
    }

    try {
      const cardLast4 = cardDetails.number.replace(/\s/g, '').slice(-4);
      const response = await processPayment({
        userId: user.id,
        propertyId: property.id,
        checkIn, checkOut,
        guests: parseInt(guests),
        paymentMethod: paymentMethod.toUpperCase(),
        cardLast4: paymentMethod === 'card' ? cardLast4 : '',
        cardholderName: paymentMethod === 'card' ? cardDetails.name : 'PayPal User',
      });

      setProcessingStep(processingSteps.length - 1);
      await new Promise(r => setTimeout(r, 600));

      if (response.data.success) {
        navigate('/payment-success', { state: response.data });
      } else {
        setError(response.data.error || 'Payment failed');
        setProcessing(false);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (processing) {
    return (
      <div style={{ background: bgColor, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 32px', position: 'relative' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              border: '4px solid #E8D5B7',
              borderTop: '4px solid #C4622D',
              animation: 'spin 1s linear infinite'
            }}/>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <h2 style={{ color: textColor, marginBottom: '12px', fontSize: '22px' }}>
            {processingStep === processingSteps.length - 1 ? 'Payment Complete!' : 'Processing Payment'}
          </h2>
          <p style={{ color: '#C4622D', fontWeight: 500 }}>{processingSteps[processingStep]}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {processingSteps.slice(0, -1).map((_, i) => (
              <div key={i} style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: i <= processingStep ? '#C4622D' : borderColor,
                transition: 'background 0.3s'
              }}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: bgColor, minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#C4622D', cursor: 'pointer', marginBottom: '20px', fontSize: '14px' }}>
          ← Back
        </button>

        <h1 style={{ fontSize: '32px', color: textColor, marginBottom: '4px' }}>Complete Your Booking</h1>
        <p style={{ color: textMuted, marginBottom: '32px' }}>Review your details and pay securely.</p>

        {error && (
          <div style={{ background: '#FFEBEE', color: '#C62828', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px' }}>

          {/* Order Summary */}
          <div>
            <div style={{ background: cardBg, borderRadius: '20px', padding: '28px', border: `1px solid ${borderColor}`, position: 'sticky', top: '80px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: textColor, marginBottom: '20px' }}>Booking Summary</h3>

              <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: `1px solid ${borderColor}` }}>
                <div style={{ fontWeight: 600, color: textColor, marginBottom: '6px' }}>{property.title}</div>
                <div style={{ fontSize: '13px', color: textMuted }}>{nights} nights · {guests} guest{guests > 1 ? 's' : ''}</div>
                {checkIn && checkOut && (
                  <div style={{ fontSize: '12px', color: textMuted, marginTop: '4px' }}>
                    {new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>

              <div style={{ fontSize: '14px', color: textColor }}>
                {[
                  [`$${property.price} × ${nights} night${nights > 1 ? 's' : ''}`, `$${subtotal}`],
                  ['Cleaning fee', `$${cleaningFee}`],
                  ['Service fee', `$${serviceFee}`],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: textMuted }}>{label}</span><span>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: `2px solid ${borderColor}`, fontWeight: 700, fontSize: '18px', color: textColor }}>
                <span>Total (USD)</span>
                <span style={{ color: '#C4622D' }}>${total}</span>
              </div>

              <div style={{ marginTop: '20px', padding: '12px', background: darkMode ? '#0f172a' : '#F0FDF4', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#2E7D32' }}>
                <CheckCircleIcon size={14} stroke="#2E7D32"/> Free cancellation before check-in
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <div style={{ background: cardBg, borderRadius: '20px', padding: '28px', border: `1px solid ${borderColor}`, marginBottom: '20px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: textColor, marginBottom: '20px' }}>Payment Method</h3>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {[
                  { value: 'card', label: 'Credit / Debit Card', icon: <CreditCardIcon size={16}/> },
                  { value: 'paypal', label: 'PayPal', icon: <span style={{ fontWeight: 700, fontSize: '13px', color: '#003087' }}>Pay</span> },
                ].map(({ value, label, icon }) => (
                  <label key={value} style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                    padding: '12px 16px', border: `2px solid ${paymentMethod === value ? '#C4622D' : borderColor}`,
                    borderRadius: '12px', background: paymentMethod === value ? (darkMode ? 'rgba(196,98,45,0.15)' : '#FEF5EF') : cardBg,
                    transition: 'all 0.2s'
                  }}>
                    <input type="radio" value={value} checked={paymentMethod === value} onChange={() => setPaymentMethod(value)} style={{ display: 'none' }}/>
                    {icon}
                    <span style={{ fontSize: '13px', fontWeight: 500, color: textColor }}>{label}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div>
                  {/* Card preview */}
                  <div style={{
                    background: 'linear-gradient(135deg, #C4622D, #8B3A1A)',
                    borderRadius: '16px', padding: '24px', marginBottom: '24px', color: 'white',
                    position: 'relative', overflow: 'hidden', minHeight: '140px'
                  }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }}/>
                    <div style={{ position: 'absolute', bottom: '-30px', right: '40px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                      <span style={{ fontSize: '12px', opacity: 0.8 }}>VilaStay Pay</span>
                      <span style={{ fontWeight: 700, fontSize: '14px' }}>{getCardType(cardDetails.number) || 'CARD'}</span>
                    </div>
                    <div style={{ fontSize: '18px', letterSpacing: '3px', marginBottom: '16px', fontFamily: 'monospace' }}>
                      {cardDetails.number || '•••• •••• •••• ••••'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.9 }}>
                      <span>{cardDetails.name || 'CARDHOLDER NAME'}</span>
                      <span>{cardDetails.expiry || 'MM/YY'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textMuted, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Card Number</label>
                      <input
                        type="text" placeholder="1234 5678 9012 3456" maxLength="19"
                        value={cardDetails.number}
                        onChange={e => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                        style={{ width: '100%', padding: '12px 14px', border: `1px solid ${borderColor}`, borderRadius: '10px', fontSize: '15px', background: bgColor, color: textColor, fontFamily: 'monospace', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textMuted, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cardholder Name</label>
                      <input
                        type="text" placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={e => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                        style={{ width: '100%', padding: '12px 14px', border: `1px solid ${borderColor}`, borderRadius: '10px', fontSize: '14px', background: bgColor, color: textColor, outline: 'none' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textMuted, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expiry Date</label>
                        <input
                          type="text" placeholder="MM/YY" maxLength="5"
                          value={cardDetails.expiry}
                          onChange={e => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                          style={{ width: '100%', padding: '12px 14px', border: `1px solid ${borderColor}`, borderRadius: '10px', fontSize: '14px', background: bgColor, color: textColor, outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textMuted, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CVV</label>
                        <input
                          type="password" placeholder="•••" maxLength="4"
                          value={cardDetails.cvv}
                          onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                          style={{ width: '100%', padding: '12px 14px', border: `1px solid ${borderColor}`, borderRadius: '10px', fontSize: '14px', background: bgColor, color: textColor, outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div style={{ textAlign: 'center', padding: '32px', background: darkMode ? '#0f172a' : '#F8FAFF', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: '#003087', marginBottom: '8px' }}>
                    Pay<span style={{ color: '#009CDE' }}>Pal</span>
                  </div>
                  <p style={{ color: textMuted, fontSize: '13px' }}>You'll be redirected to PayPal to complete your payment securely.</p>
                </div>
              )}
            </div>

            <button
              onClick={handlePayment}
              style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg, #C4622D, #a8451a)',
                color: 'white', border: 'none', borderRadius: '14px',
                fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(196,98,45,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}
            >
              <LockIcon size={16}/> Pay ${total}
            </button>

            <p style={{ fontSize: '11px', color: textMuted, textAlign: 'center', marginTop: '12px' }}>
              Your payment is encrypted and secure. By completing this booking you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
