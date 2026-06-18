import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBooking } from '../services/api';

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Get data from navigation state
  const property = bookingData.property || {
    id: null,
    title: 'Selected Property',
    price: 320
  };
  const nights = bookingData.nights || 3;
  const guests = bookingData.guests || 2;
  const checkIn = bookingData.checkIn;
  const checkOut = bookingData.checkOut;
  
  // Calculate prices
  const subtotal = property.price * nights;
  const cleaningFee = 40;
  const serviceFee = 25;
  const total = subtotal + cleaningFee + serviceFee;

  // Debug log
  useEffect(() => {
    console.log('Checkout page loaded with:', { property, nights, guests, checkIn, checkOut, total });
  }, []);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handlePayment = async () => {
    setError('');
    
    // Validate card details
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        setError('Please fill all card details');
        return;
      }
      if (cardDetails.number.replace(/\s/g, '').length < 16) {
        setError('Please enter a valid card number');
        return;
      }
      if (cardDetails.cvv.length < 3) {
        setError('Please enter a valid CVV');
        return;
      }
    }
    
    setProcessing(true);
    
    try {
      // Get current user from localStorage
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (!user || !user.id) {
        setError('Please login to complete booking');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }
      
      if (!property.id) {
        setError('Property information missing');
        return;
      }
      
      // Prepare booking data
      const bookingDataToSend = {
        propertyId: property.id,
        userId: user.id,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: parseInt(guests)
      };
      
      console.log('Sending booking:', bookingDataToSend);
      
      // Send to backend
      const response = await createBooking(bookingDataToSend);
      
      console.log('Booking response:', response.data);
      
      if (response.data.success) {
        alert('✅ Booking confirmed! Check your dashboard.');
        navigate('/dashboard');
      } else {
        setError(response.data.error || 'Booking failed');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '40px auto', 
      padding: '0 20px',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: '#C4622D',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '14px'
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '8px' }}>
        Complete Your Booking
      </h1>
      <p style={{ color: '#9A8F84', marginBottom: '32px' }}>
        Almost there! Confirm your details and payment.
      </p>

      {error && (
        <div style={{ background: '#FFEBEE', color: '#C62828', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px' }}>
        {/* Left Column - Order Summary */}
        <div>
          <div style={{
            background: '#FAF8F4',
            borderRadius: '20px',
            padding: '24px',
            position: 'sticky',
            top: '80px'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Order Summary</h3>
            
            <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E8D5B7' }}>
              <div style={{ fontWeight: 600, marginBottom: '8px' }}>{property.title}</div>
              <div style={{ fontSize: '13px', color: '#9A8F84' }}>
                {nights} nights · {guests} guests
              </div>
              {checkIn && checkOut && (
                <div style={{ fontSize: '12px', color: '#9A8F84', marginTop: '4px' }}>
                  {new Date(checkIn).toLocaleDateString()} → {new Date(checkOut).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>${property.price} × {nights} nights</span>
                <span>${subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              paddingTop: '16px', 
              borderTop: '2px solid #E8D5B7',
              fontWeight: 700,
              fontSize: '18px'
            }}>
              <span>Total (USD)</span>
              <span style={{ color: '#C4622D' }}>${total}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Payment */}
        <div>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Payment Method</h3>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer',
                padding: '12px 20px',
                border: `2px solid ${paymentMethod === 'card' ? '#C4622D' : '#E8D5B7'}`,
                borderRadius: '12px',
                background: paymentMethod === 'card' ? '#FEF5EF' : 'white'
              }}>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                💳 Credit Card
              </label>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer',
                padding: '12px 20px',
                border: `2px solid ${paymentMethod === 'paypal' ? '#C4622D' : '#E8D5B7'}`,
                borderRadius: '12px',
                background: paymentMethod === 'paypal' ? '#FEF5EF' : 'white'
              }}>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                PayPal
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div style={{ 
                background: 'white', 
                border: '1px solid #E8D5B7', 
                borderRadius: '16px', 
                padding: '24px' 
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #E8D5B7', 
                      borderRadius: '10px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #E8D5B7', 
                      borderRadius: '10px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: '1px solid #E8D5B7', 
                        borderRadius: '10px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength="4"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: '1px solid #E8D5B7', 
                        borderRadius: '10px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div style={{
                background: '#FAF8F4',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💙</div>
                <p style={{ color: '#666' }}>
                  You will be redirected to PayPal to complete your payment.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            style={{
              width: '100%',
              padding: '16px',
              background: processing ? '#9A8F84' : '#C4622D',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: processing ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {processing ? 'Processing...' : `Pay $${total}`}
          </button>

          <p style={{ 
            fontSize: '11px', 
            color: '#9A8F84', 
            textAlign: 'center', 
            marginTop: '16px' 
          }}>
            By completing this booking, you agree to our Terms of Service and Cancellation Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;