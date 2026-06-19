import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import { getProperties } from '../services/api';

function HomePage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const heroImages = [
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600"
];

const [currentSlide, setCurrentSlide] = useState(0);

  const bgColor = darkMode ? '#1a1a2e' : '#FAF8F4';

  useEffect(() => {
    loadDestinations();
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      const response = await getProperties(0, 100);
      const allProperties = response.data.content || [];
      const destinationMap = new Map();
      
      allProperties.forEach(property => {
        let city = property.location?.split(',')[0]?.trim();
        
        if (city === 'North Malé Atoll') city = 'Maldives';
        if (city === 'Ubud') city = 'Bali';
        if (city === 'Zermatt') city = 'Swiss Alps';
        if (city === 'Aspen' || city === 'Breckenridge' || city === 'Vail' || city === 'Telluride') city = 'Colorado Rockies';
        if (city === 'Gatlinburg' || city === 'Pigeon Forge') city = 'Great Smoky Mountains';
        
        if (!destinationMap.has(city)) {
          destinationMap.set(city, {
            name: city,
            slug: city.toLowerCase().replace(/\s+/g, '-'),
            location: property.location,
            propertyCount: 0,
            image: getImageForCity(city),
            tag: getTagForCity(city)
          });
        }
        destinationMap.get(city).propertyCount++;
      });
      
      if (allProperties.length > 0) {
        destinationMap.set('International', {
          name: 'International',
          slug: 'international',
          location: 'Worldwide',
          propertyCount: allProperties.length,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
        });
      }
      
      setDestinations(Array.from(destinationMap.values()));
      setError(null);
      
    } catch (err) {
      console.error('Error loading destinations:', err);
      setError('Failed to load destinations. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getImageForCity = (city) => {
    const images = {
      'Santorini': 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=250&fit=crop',
      'Maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=250&fit=crop',
      'Swiss Alps': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop',
      'Bali': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
      'Barcelona': 'https://images.unsplash.com/photo-1564501049412-61c2a30805a1?w=400&h=250&fit=crop',
      'Lake Tahoe': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      'Colorado Rockies': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop',
      'Great Smoky Mountains': 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=250&fit=crop'
    };
    return images[city] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop';
  };

  const getTagForCity = (city) => {
    const tags = {
      'Santorini': 'Greek Island',
      'Maldives': 'Paradise',
      'Swiss Alps': 'Mountain',
      'Bali': 'Tropical',
      'Barcelona': 'City',
      'Lake Tahoe': 'Popular',
      'Colorado Rockies': 'Mountain Views',
      'Great Smoky Mountains': 'Most Booked'
    };
    
  };

  const handleDestinationClick = (destination) => {
    navigate(`/destination/${destination.slug}`, { state: { destination } });
  };

  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#6B5B4F';
  const cardBg = darkMode ? '#16213e' : 'white';

  if (loading) {
    return (
      <div style={{ background: bgColor, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: textColor }}>Loading destinations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: bgColor, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: textColor }}>
          <p>{error}</p>
          <button onClick={() => loadDestinations()} style={{ marginTop: '20px', padding: '10px 20px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Retry</button>
        </div>
      </div>
    );
  }

  const totalProperties = destinations.find(d => d.name === 'International')?.propertyCount || 0;

  return (
    <div style={{ background: bgColor, minHeight: '100vh' }}>
      {/* Hero Section - FULL SCREEN (100vh) with Scroll Indicator */}
      <div style={{
        position: 'relative',
        backgroundImage: `url(${heroImages[currentSlide]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        transition: 'background-image 1s ease-in-out',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55))'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', padding: '0 20px' }}>
          <div style={{ 
            display: 'inline-block', 
            background: 'rgba(196,98,45,0.9)', 
            borderRadius: '30px', 
            padding: '8px 24px',
            fontSize: '13px',
            marginBottom: '24px',
            fontWeight: 500
          }}>
            ✦ WELCOME TO VILASTAY
          </div>
          
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '56px', 
            marginBottom: '20px',
            fontWeight: 700,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Find Your Perfect <em style={{ fontStyle: 'italic', color: '#F0A875' }}>Escape</em>
          </h1>
          
          <p style={{ fontSize: '18px', maxWidth: '550px', margin: '0 auto' }}>
            Explore {destinations.length} destinations with {totalProperties}+ properties
          </p>
        </div>

        {/* Scroll Down Indicator - Click to scroll to destinations */}
        <div 
          onClick={() => {
            const section = document.getElementById('destinations-section');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            zIndex: 2,
            animation: 'bounce 2s infinite'
          }}
        >
          <div style={{
            width: '30px',
            height: '50px',
            border: '2px solid white',
            borderRadius: '20px',
            position: 'relative'
          }}>
            <div style={{
              width: '4px',
              height: '10px',
              background: 'white',
              borderRadius: '2px',
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scrollDown 2s infinite'
            }} />
          </div>
          <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8 }}>Scroll</p>
        </div>
      </div>

      {/* Destination Cards Section */}
      <div id="destinations-section" style={{ padding: '60px 32px', background: bgColor }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '38px', color: textColor, marginBottom: '16px' }}>
            Where Will You Go?
          </h2>
          <p style={{ color: textMuted, fontSize: '16px' }}>
            {destinations.length} breathtaking destinations around the world
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {destinations.map(dest => (
            <div
              key={dest.name}
              onClick={() => handleDestinationClick(dest)}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                background: cardBg,
                boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  color: 'white',
                  fontSize: '11px',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>
                  {dest.tag}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px', color: textColor }}>{dest.name}</h3>
                <p style={{ fontSize: '13px', color: textMuted, marginBottom: '8px' }}>{dest.location}</p>
                <p style={{ fontSize: '13px', color: '#C4622D', fontWeight: 500 }}>{dest.propertyCount} properties</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;