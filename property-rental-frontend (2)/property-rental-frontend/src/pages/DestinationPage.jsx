import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import { HeartIcon, MapPinIcon, StarIcon, BedIcon, BathIcon, UsersIcon } from '../components/Icons';
import { getProperties } from '../services/api';

function DestinationPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const itemsPerPage = 6;

  const destinationName = slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Destination';
  const destination = location.state?.destination || { name: destinationName };
  const isInternational = destination.name === 'International';

  useEffect(() => {
    fetchProperties();
  }, [currentPage, selectedType, slug]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let response;
      if (isInternational) {
        response = await getProperties(currentPage, itemsPerPage, '', selectedType);
      } else {
        response = await getProperties(currentPage, itemsPerPage, destination.name, selectedType);
      }
      setProperties(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setTotalElements(response.data.totalElements || 0);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyClick = (property) => {
    navigate(`/property/${property.id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setCurrentPage(0);
  };

  // Local filter for search term
  const filteredProperties = properties.filter(property =>
    searchTerm === '' || 
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bgColor = darkMode ? '#1a1a2e' : '#FAF8F4';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaa' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';

  const getCoverImage = () => {
    if (isInternational) return 'https://images.unsplash.com/photo-1623595289196-007a22dd8560?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const dest = destination?.name?.toLowerCase() || '';
    if (dest.includes('tahoe')) return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop';
    if (dest.includes('colorado')) return 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=400&fit=crop';
    if (dest.includes('smoky')) return 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&h=400&fit=crop';
    if (dest.includes('swiss')) return 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&h=400&fit=crop';
    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop';
  };

  return (
    <div style={{ background: bgColor, minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        backgroundImage: `url("${getCoverImage()}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 32px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', marginBottom: '24px' }}>← Back to Home</button>
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>{destination?.name}</h1>
          <p style={{ fontSize: '18px' }}>{totalElements} properties available</p>

          <div style={{ background: 'white', borderRadius: '60px', padding: '8px', display: 'flex', gap: '8px', maxWidth: '650px', margin: '40px auto 0', flexWrap: 'wrap', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}>
            <input type="text" placeholder={`Search in ${destination?.name}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 2, minWidth: '200px', border: 'none', outline: 'none', padding: '14px 20px', borderRadius: '50px', fontSize: '15px', color: '#1A1612', background: '#ffffff', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)', minHeight: '48px' }} />
            <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(0); }} style={{ border: 'none', outline: 'none', padding: '14px 20px', background: '#f5f0e8', borderRadius: '50px', cursor: 'pointer', fontSize: '14px', color: '#333', minHeight: '48px' }}>
              <option value="">All Types</option>
              <option>Villa</option><option>Cabin</option><option>Cabana</option><option>Hotel</option><option>Chalet</option><option>Lodge</option><option>Suite</option><option>Bungalow</option><option>Condo</option><option>Cottage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div style={{ padding: '40px 32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', color: textColor }}>Properties in {destination?.name}</h2>
          <p style={{ color: textMuted }}>{filteredProperties.length} of {totalElements} unique stays available</p>
          {(searchTerm || selectedType) && <button onClick={clearFilters} style={{ marginTop: '12px', background: 'transparent', border: `1px solid #C4622D`, color: '#C4622D', padding: '6px 16px', borderRadius: '20px', cursor: 'pointer' }}>Clear Filters</button>}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: textMuted }}>Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: textMuted }}>
            <p>No properties found.</p>
            <button onClick={clearFilters} style={{ marginTop: '16px', background: '#C4622D', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '25px', cursor: 'pointer' }}>Clear Filters</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
              {filteredProperties.map(property => (
                <div key={property.id} onClick={() => handlePropertyClick(property)} style={{ background: cardBg, borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s', border: `1px solid ${borderColor}` }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ position: 'relative', height: '240px' }}>
                    <img src={property.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop'} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#C4622D', color: 'white', padding: '4px 14px', borderRadius: '20px', fontSize: '11px' }}>{property.type}</div>
                    <div onClick={(e) => { e.stopPropagation(); isInWishlist(property.id) ? removeFromWishlist(property.id) : addToWishlist(property); }} style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><HeartIcon size={18} filled={isInWishlist(property.id)} color={isInWishlist(property.id) ? '#e05252' : '#999'}/></div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#C4622D', display:'flex', alignItems:'center', gap:'4px' }}><MapPinIcon size={13}/>{property.location?.split(',')[0] || property.location}</span><span style={{display:'flex',alignItems:'center',gap:'4px'}}><StarIcon size={13} filled/> {property.rating} ({property.reviews})</span></div>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: textColor }}>{property.title}</h3>
                    <div style={{ marginBottom: '12px', color: textMuted, display:'flex', alignItems:'center', gap:'12px' }}><span style={{display:'flex',alignItems:'center',gap:'4px'}}><BedIcon size={13}/>{property.beds} beds</span><span style={{display:'flex',alignItems:'center',gap:'4px'}}><BathIcon size={13}/>{property.baths} baths</span><span style={{display:'flex',alignItems:'center',gap:'4px'}}><UsersIcon size={13}/>{property.guests} guests</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${borderColor}`, paddingTop: '14px' }}><span><span style={{ fontSize: '22px', fontWeight: 700, color: '#C4622D' }}>Rs{property.price}</span> /night</span><button onClick={(e) => { e.stopPropagation(); handlePropertyClick(property); }} style={{ padding: '8px 20px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>View Deal →</button></div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION - Now showing! */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '50px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  style={{ padding: '10px 20px', background: currentPage === 0 ? (darkMode ? '#2c3e50' : '#E8D5B7') : '#C4622D', color: currentPage === 0 ? (darkMode ? '#666' : '#9A8F84') : 'white', border: 'none', borderRadius: '10px', cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
                >
                  ← Previous
                </button>
                
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i;
                  } else if (currentPage <= 2) {
                    pageNum = i;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 5 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      style={{
                        width: '44px',
                        height: '44px',
                        background: currentPage === pageNum ? '#C4622D' : cardBg,
                        color: currentPage === pageNum ? 'white' : textColor,
                        border: currentPage === pageNum ? 'none' : `1px solid ${borderColor}`,
                        borderRadius: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage + 1 >= totalPages}
                  style={{ padding: '10px 20px', background: currentPage + 1 >= totalPages ? (darkMode ? '#2c3e50' : '#E8D5B7') : '#C4622D', color: currentPage + 1 >= totalPages ? (darkMode ? '#666' : '#9A8F84') : 'white', border: 'none', borderRadius: '10px', cursor: currentPage + 1 >= totalPages ? 'not-allowed' : 'pointer' }}
                >
                  Next →
                </button>
              </div>
            )}

            {/* Showing info */}
            {totalPages > 1 && (
              <div style={{ textAlign: 'center', marginTop: '20px', color: textMuted, fontSize: '13px' }}>
                Page {currentPage + 1} of {totalPages} ({totalElements} total properties)
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DestinationPage;