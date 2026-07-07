 import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { HeartIcon, MapPinIcon, PoolIcon, SunriseIcon, WifiIcon, CarIcon, CheckCircleIcon, StarIcon } from '../components/Icons';
import { getPropertyById } from '../services/api';

function PropertyDetailPage({ user, onBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showBookingAlert, setShowBookingAlert] = useState(false);
  const [nights, setNights] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch property from backend
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await getPropertyById(id);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperty();
  }, [id]);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    setCheckIn(tomorrow.toISOString().split('T')[0]);
    setCheckOut(nextWeek.toISOString().split('T')[0]);
  }, []);

  // CALCULATE NIGHTS AND PRICE WHEN DATES CHANGE
  useEffect(() => {
    if (checkIn && checkOut && property) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setNights(diffDays);
      const newSubtotal = property.price * diffDays * guests;
      setSubtotal(newSubtotal);
      setTotal(newSubtotal + 40 + 25);
    }
  }, [checkIn, checkOut, property]);

  // Recalculate when guests change
  useEffect(() => {
    if (nights > 0 && property) {
      const newSubtotal = property.price * nights*guests;
      setSubtotal(newSubtotal);
      setTotal(newSubtotal + 40 + 25);
    }
  }, [guests, nights, property]);

  const handleProceedToCheckout = () => {
    if (!user) {
      alert('Please login to book this property');
      navigate('/login');
      return;
    }
    
    const checkoutData = {
      property: {
        id: property.id,
        title: property.title,
        price: property.price
      },
      nights: nights,
      guests: guests,
      checkIn: checkIn,
      checkOut: checkOut,
      subtotal: subtotal,
      total: total
    };
    
    console.log('Sending to checkout:', checkoutData);
    
    navigate('/checkout', { 
      state: checkoutData
    });
  };

  const parseAmenities = (amenitiesStr) => {
    if (!amenitiesStr) return [];
    return amenitiesStr.split(',').map(item => item.trim());
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#fff' : '#1A1612' }}>
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#fff' : '#1A1612' }}>
        <h2>Property not found</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const bgColor = darkMode ? '#1a1a2e' : '#FAF8F4';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';
  
  const amenitiesArray = parseAmenities(property.amenities);
  const cleaningFee = 40;
  const serviceFee = 25;

  return (
    <div style={{ background: bgColor, minHeight: '100vh', color: textColor }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ 
          margin: '20px 32px', 
          background: 'none', 
          border: 'none', 
          color: '#C4622D', 
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ← Back to listings
      </button>
      
      <div style={{
        height: '400px',
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${property.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '0 32px',
        borderRadius: '20px',
        position: 'relative'
      }}>
        <button
          onClick={() => isInWishlist(property.id) ? removeFromWishlist(property.id) : addToWishlist(property)}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'white',
            border: 'none',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            fontSize: '22px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <HeartIcon size={18} filled={isInWishlist(property.id)} color={isInWishlist(property.id) ? '#e05252' : 'currentColor'}/>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Left Column - Details */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 600, 
              color: '#C4622D',
              background: darkMode ? 'rgba(196,98,45,0.2)' : '#FEF5EF',
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              {property.type}
            </span>
          </div>
          
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '38px', marginBottom: '12px' }}>
            {property.title}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: textMuted }}>
              <MapPinIcon size={15} style={{marginRight:6, verticalAlign:'middle'}}/>{property.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <StarIcon size={15} filled color="#FFB800"/> {property.rating || 4.5} · {property.reviews || 0} reviews
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            padding: '20px 0', 
            borderTop: `1px solid ${borderColor}`, 
            borderBottom: `1px solid ${borderColor}`,
            marginBottom: '24px'
          }}>
            <div><span style={{ fontSize: '18px', fontWeight: 600 }}>{property.guests || 4}</span><div style={{ fontSize: '12px', color: textMuted }}>Guests</div></div>
            <div><span style={{ fontSize: '18px', fontWeight: 600 }}>{property.beds || 2}</span><div style={{ fontSize: '12px', color: textMuted }}>Bedrooms</div></div>
            <div><span style={{ fontSize: '18px', fontWeight: 600 }}>{property.baths || 2}</span><div style={{ fontSize: '12px', color: textMuted }}>Bathrooms</div></div>
          </div>
          
          <h3 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: "'Montserrat', sans-serif" }}>About this property</h3>
          <p style={{ lineHeight: 1.7, color: textMuted, marginBottom: '32px' }}>
            {property.description || 'Beautiful property with amazing amenities and great location.'}
          </p>
          
          <h3 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: "'Montserrat', sans-serif" }}>Amenities</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
            gap: '12px',
            marginBottom: '40px'
          }}>
            {amenitiesArray.length > 0 ? (
              amenitiesArray.map((amenity, index) => (
                <div key={index} style={{ 
                  background: darkMode ? '#1a1a2e' : '#FAF8F4', 
                  padding: '10px 14px', 
                  borderRadius: '10px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {amenity}
                </div>
              ))
            ) : (
              <>
                <div style={{ background: darkMode ? '#1a1a2e' : '#FAF8F4', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', display:'flex', alignItems:'center', gap:'8px' }}><PoolIcon size={15} stroke="#C4622D"/> Private pool</div>
                <div style={{ background: darkMode ? '#1a1a2e' : '#FAF8F4', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', display:'flex', alignItems:'center', gap:'8px' }}><SunriseIcon size={15} stroke="#C4622D"/> Sea view</div>
                <div style={{ background: darkMode ? '#1a1a2e' : '#FAF8F4', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', display:'flex', alignItems:'center', gap:'8px' }}><WifiIcon size={15} stroke="#C4622D"/> Fast WiFi</div>
                <div style={{ background: darkMode ? '#1a1a2e' : '#FAF8F4', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', display:'flex', alignItems:'center', gap:'8px' }}><CarIcon size={15} stroke="#C4622D"/> Free parking</div>
              </>
            )}
          </div>

          {/* Reviews Section */}
          <ReviewSection propertyId={property.id} user={user} />
        </div>

        {/* Right Column - Booking Card */}
        <div>
          <div style={{ 
            background: cardBg, 
            border: `1px solid ${borderColor}`, 
            borderRadius: '20px', 
            padding: '24px',
            position: 'sticky',
            top: '80px',
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#C4622D' }}>Rs{property.price}</span>
              <span style={{ color: textMuted }}> / night</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', marginBottom: '24px' }}>
              <span style={{display:'flex',alignItems:'center',gap:'4px'}}><StarIcon size={14} filled color="#FFB800"/> {property.rating || 4.5}</span>
              <span style={{ color: textMuted }}>· {property.reviews || 0} reviews</span>
            </div>
            
            {/* Date Selection - NOW UPDATES NIGHTS */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1px', 
              background: borderColor, 
              borderRadius: '12px', 
              overflow: 'hidden', 
              marginBottom: '12px' 
            }}>
              <div style={{ background: cardBg, padding: '14px' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: textMuted, marginBottom: '4px' }}>CHECK-IN</div>
                <input 
                  type="date" 
                  value={checkIn} 
                  onChange={(e) => setCheckIn(e.target.value)} 
                  style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent', color: textColor, cursor: 'pointer' }} 
                />
              </div>
              <div style={{ background: cardBg, padding: '14px' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: textMuted, marginBottom: '4px' }}>CHECK-OUT</div>
                <input 
                  type="date" 
                  value={checkOut} 
                  onChange={(e) => setCheckOut(e.target.value)} 
                  style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent', color: textColor, cursor: 'pointer' }} 
                />
              </div>
            </div>
            
            {/* Guests Selection */}
            <div style={{ border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px', marginBottom: '24px' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: textMuted, marginBottom: '4px' }}>GUESTS</div>
              <select 
                value={guests} 
                onChange={(e) => setGuests(Number(e.target.value))} 
                style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent', color: textColor, cursor: 'pointer' }}
              >
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
                <option value="6">6 guests</option>
                <option value="7">7 guests</option>
                <option value="8">8 guests</option>
              </select>
            </div>
            
            {/* Price Breakdown - NOW UPDATES DYNAMICALLY */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span>Rs{property.price} × {nights} {nights ===1? 'night' : 'nights'} x{guests} guests  </span>
                <span>Rs{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span>Cleaning fee</span>
                <span>Rs{cleaningFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span>Service fee</span>
                <span>Rs{serviceFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: `1px solid ${borderColor}`, fontWeight: 700, fontSize: '16px' }}>
                <span>Total</span>
                <span style={{ color: '#C4622D' }}>Rs{total}</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button 
              onClick={handleProceedToCheckout}
              style={{ 
                width: '100%', 
                background: '#C4622D', 
                color: 'white', 
                border: 'none', 
                padding: '16px', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontSize: '16px', 
                fontWeight: 600,
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#a84e22'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#C4622D'}
            >
              Proceed to Checkout →
            </button>
            
            <p style={{ fontSize: '11px', color: textMuted, textAlign: 'center', marginTop: '16px' }}>
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>

      {/* Booking Alert */}
      {showBookingAlert && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#2E7D32',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          animation: 'slideIn 0.3s ease'
        }}>
          <CheckCircleIcon size={16} stroke="#2E7D32" style={{marginRight:6, verticalAlign:'middle'}}/> Booking confirmed! Check your dashboard.
        </div>
      )}
    </div>
  );
}

export default PropertyDetailPage;