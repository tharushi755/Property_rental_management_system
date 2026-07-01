import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import { getProperties } from '../services/api';

function HomePage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [destinations, setDestinations] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const heroImages = [
    "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const bgColor = darkMode ? '#0f172a' : '#ffffff';

  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm.trim());
    const section = document.getElementById('destinations-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchClear = () => {
    setSearchTerm('');
    setSearchQuery('');
    const section = document.getElementById('destinations-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchSubmit();
    }
  };

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
      setAllProperties(allProperties);
      
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
            tag: getTagForCity(city),
            propertyTitles: []
          });
        }
        const destination = destinationMap.get(city);
        destination.propertyCount++;
        if (property.title) {
          destination.propertyTitles.push(property.title);
        }
      });
      
      if (allProperties.length > 0) {
        destinationMap.set('International', {
          name: 'International',
          slug: 'international',
          location: 'Worldwide',
          propertyCount: allProperties.length,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
          propertyTitles: allProperties.map(p => p.title || '')
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
      'Kandy': 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/701829228.jpg?k=4e391a56dfbebce81ee15758f8ae847746296cf08e01de65ee87fd2cfb92483b&o=',
      'Galle': 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/633855882.jpg?k=de18ae21309dc7e17e0e0dd459ab09ab16be60fe58be1af5a0a246a0238b4486&o=',
      'Colombo': 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/548877514.jpg?k=8626bff4822c5f73b96785a4616190d97b1f7780c1846973abe6c8f424393d67&o=',
      'Jaffna': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
      'Anuradhapura': 'https://images.unsplash.com/photo-1653151106733-eadfaf201962?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Trincomalee': 'https://images.unsplash.com/photo-1558446791-ac5fec3caddf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Gampaha': 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/351246493.jpg?k=31c2cedbe69ffb41853c9557754690814cbd56ff92d80c1a73a0e8b62d99a62c&o=',
      'Negombo': 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/855866441.jpg?k=81828b5e0a838644092b8030d330d02bf9b297524f78a8dcba0f86593efb1e8d&o=',
      'Nuwara Eliya':'https://images.unsplash.com/photo-1578517929167-db9ed31cd5c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    };
    return images[city] || 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/633855882.jpg?k=de18ae21309dc7e17e0e0dd459ab09ab16be60fe58be1af5a0a246a0238b4486&o=';
  
  };

  const getTagForCity = (city) => {
    const tags = {
      'Kandy': 'Peradeniya',
      'Galle': 'Talpe',
      'Colombo': 'Mount Lavinia',
      'Jaffna': 'Mahiyanganaya',
      'Anuradhapura': 'Sri Maha Bodhi',
      'Trincomalee': 'Koneshwaram',
      'Gampaha': 'Asgiriya',
      'Negombo': 'Most Booked'
    };
  };

  const handleDestinationClick = (destination) => {
    navigate(`/destination/${destination.slug}`, { state: { destination } });
  };

  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#6B5B4F';
  const cardBg = darkMode ? '#1e293b' : 'white';

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

  const filteredDestinations = destinations.filter(dest => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    if (normalizedSearch.length === 0) {
      return true;
    }

    const propertyTitleMatch = dest.propertyTitles?.some(title =>
      title?.toLowerCase().includes(normalizedSearch)
    );

    return dest.name.toLowerCase().includes(normalizedSearch) ||
      dest.location?.toLowerCase().includes(normalizedSearch) ||
      dest.tag?.toLowerCase().includes(normalizedSearch) ||
      propertyTitleMatch;
  });

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
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', padding: '0 24px' }}>
          <div style={{ 
            display: 'inline-block', 
            background: 'rgba(196,98,45,0.9)', 
            borderRadius: '30px', 
            padding: '10px 28px',
            fontSize: '12px',
            marginBottom: '24px',
            fontWeight: 600
          }}>
            ◆ WELCOME TO VILASTAY
          </div>
          
          <h1 style={{ 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: 'clamp(3rem, 6vw, 6rem)', 
            lineHeight: 1.0,
            marginBottom: '20px',
            fontWeight: 800,
            textShadow: '2px 2px 6px rgba(0,0,0,0.35)'
          }}>
            Find Your Perfect <em style={{ fontStyle: 'italic', color: '#F0A875' }}>Escape</em>
          </h1>
          
          <p style={{ fontSize: '11px', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            Explore {destinations.length} destinations with {totalProperties}+ properties
          </p>
          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search by destination, town, city, or tag"
              style={{
                width: '100%',
                maxWidth: '620px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.95)',
                color: '#1A1612',
                padding: '18px 26px',
                fontSize: '15px',
                outline: 'none',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
            />
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleSearchSubmit}
              style={{
                background: '#C4622D',
                color: 'white',
                border: 'none',
                borderRadius: '999px',
                padding: '12px 28px',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          onClick={() => {
            const section = document.getElementById('destinations-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.75,
          }}
        >
          <div style={{
            width: '20px',
            height: '32px',
            border: '1.5px solid rgba(255,255,255,0.8)',
            borderRadius: '12px',
            position: 'relative',
          }}>
            <div style={{
              width: '3px',
              height: '6px',
              background: 'white',
              borderRadius: '2px',
              position: 'absolute',
              top: '5px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scrollDot 1.8s ease-in-out infinite',
            }} />
          </div>
          <style>{`
            @keyframes scrollDot {
              0%   { opacity: 1; top: 5px; }
              80%  { opacity: 0; top: 16px; }
              100% { opacity: 0; top: 5px; }
            }
          `}</style>
        </div>
      </div>

      {/* Destination Cards Section */}
      <div id="destinations-section" style={{ padding: '60px 32px', background: bgColor }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '38px', color: textColor, marginBottom: '16px' }}>
            Where Will You Go?
          </h2>
          <p style={{ color: textMuted, fontSize: '16px', marginBottom: '24px' }}>
            {destinations.length} breathtaking destinations around the world
          </p>
          {searchQuery && (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={handleSearchClear}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  color: '#1A1612',
                  border: '1px solid #C4622D',
                  borderRadius: '999px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {filteredDestinations.length > 0 ? filteredDestinations.map(dest => (
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
          )) : (
            <div style={{
              gridColumn: '1 / -1',
              padding: '40px 20px',
              textAlign: 'center',
              borderRadius: '24px',
              background: darkMode ? '#111827' : '#f8f5f1',
              color: textColor
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>No destinations found</h3>
              <p style={{ fontSize: '16px', color: textMuted }}>
                Try searching for a different town, city, or property tag.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;