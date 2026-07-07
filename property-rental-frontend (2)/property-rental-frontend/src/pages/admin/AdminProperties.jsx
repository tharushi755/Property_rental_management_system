import React, { useState, useEffect } from 'react';
import { getAllPropertiesAdmin, approveProperty, deleteProperty, createProperty, updateProperty } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { EditIcon, PlusIcon, SaveIcon, SparkleIcon, MapPinIcon, CheckIcon, TrashIcon } from '../../components/Icons';

const EMPTY_PROPERTY = {
  title: '',
  type: 'Villa',
  location: '',
  price: 100,
  guests: 4,
  beds: 2,
  baths: 2,
  description: '',
  imageUrl: '',
  amenities: '',
  owner: { id: 3 }
};

function AdminProperties() {
  const { darkMode } = useTheme();
  const pageBg = darkMode ? '#0f172a' : '#ffffff';
  const cardBg = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#cbd5e1' : '#9A8F84';
  const borderColor = darkMode ? '#2c3e50' : '#E8D5B7';
  const inputBg = darkMode ? '#0f172a' : '#ffffff';

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = creating, otherwise id of property being edited
  const [newProperty, setNewProperty] = useState(EMPTY_PROPERTY);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getAllPropertiesAdmin();
      setProperties(response.data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(p =>
    filter === 'All' ? true : p.status === filter
  );

  const approvePropertyHandler = async (id) => {
    try {
      await approveProperty(id);
      fetchProperties();
      alert('Property approved!');
    } catch (err) {
      alert('Failed to approve property');
    }
  };

  const deletePropertyHandler = async (id) => {
    if (window.confirm('Delete this property permanently?')) {
      try {
        await deleteProperty(id);
        fetchProperties();
        alert('Property deleted');
      } catch (err) {
        alert('Failed to delete property');
      }
    }
  };

  const startEditHandler = (property) => {
    setEditingId(property.id);
    setNewProperty({
      title: property.title || '',
      type: property.type || 'Villa',
      location: property.location || '',
      price: property.price ?? 100,
      guests: property.guests ?? 4,
      beds: property.beds ?? 2,
      baths: property.baths ?? 2,
      description: property.description || '',
      imageUrl: property.imageUrl || '',
      amenities: property.amenities || '',
      owner: property.owner || { id: 3 }
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelFormHandler = () => {
    setShowForm(false);
    setEditingId(null);
    setNewProperty(EMPTY_PROPERTY);
  };

  const savePropertyHandler = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProperty(editingId, newProperty);
        alert('Property updated successfully!');
      } else {
        await createProperty(newProperty);
        alert('Property created successfully!');
      }
      setShowForm(false);
      setEditingId(null);
      setNewProperty(EMPTY_PROPERTY);
      fetchProperties();
    } catch (err) {
      alert(editingId ? 'Failed to update property' : 'Failed to create property');
    }
  };

  if (loading) {
    return <div style={{ padding: '32px', textAlign: 'center', background: pageBg, color: textColor }}>Loading properties...</div>;
  }

  return (
    <div style={{ padding: '32px', background: pageBg, color: textColor }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '32px', marginBottom: '8px' }}>Property Management</h1>
          <p style={{ color: textMuted }}>Review, approve, and manage all properties</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              if (showForm) {
                cancelFormHandler();
              } else {
                setEditingId(null);
                setNewProperty(EMPTY_PROPERTY);
                setShowForm(true);
              }
            }}
            style={{ padding: '10px 20px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            + Create New Property
          </button>
          {['All', 'APPROVED', 'PENDING'].map(option => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              style={{ padding: '8px 20px', background: filter === option ? '#C4622D' : cardBg, color: filter === option ? 'white' : textColor, border: `1px solid ${filter === option ? '#C4622D' : borderColor}`, borderRadius: '20px', cursor: 'pointer' }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Create Property Form */}
      {showForm && (
        <div style={{ background: cardBg, borderRadius: '16px', padding: '24px', marginBottom: '24px', border: `1px solid ${borderColor}` }}>
          <h3 style={{ marginBottom: '16px', color: textColor, display:'flex', alignItems:'center', gap:'8px' }}>{editingId ? <><EditIcon size={16}/> Update Property</> : <><PlusIcon size={16}/> Create New Property</>}</h3>
          <form onSubmit={savePropertyHandler} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Title */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Property Title *</label>
              <input 
                type="text" 
                placeholder="e.g., Luxury Beachfront Villa" 
                value={newProperty.title} 
                onChange={(e) => setNewProperty({...newProperty, title: e.target.value})} 
                required 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }} 
              />
            </div>
            
            {/* Type and Location */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Property Type *</label>
              <select 
                value={newProperty.type} 
                onChange={(e) => setNewProperty({...newProperty, type: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }}
              >
                <option>Villa</option><option>Cabin</option><option>Cabana</option><option>Hotel</option>
                <option>Chalet</option><option>Apartment</option><option>Suite</option><option>Bungalow</option>
                <option>Cottage</option><option>Lodge</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Location *</label>
              <input 
                type="text" 
                placeholder="e.g., Santorini, Greece" 
                value={newProperty.location} 
                onChange={(e) => setNewProperty({...newProperty, location: e.target.value})} 
                required 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }} 
              />
            </div>
            
            {/* Price and Guests */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Price per Night (Rs) *</label>
              <input 
                type="number" 
                placeholder="e.g., 250" 
                value={newProperty.price} 
                onChange={(e) => setNewProperty({...newProperty, price: parseInt(e.target.value)})} 
                required 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Max Guests *</label>
              <input 
                type="number" 
                placeholder="e.g., 6" 
                value={newProperty.guests} 
                onChange={(e) => setNewProperty({...newProperty, guests: parseInt(e.target.value)})} 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }} 
              />
            </div>
            
            {/* Beds and Baths */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Number of Beds</label>
              <input 
                type="number" 
                placeholder="e.g., 3" 
                value={newProperty.beds} 
                onChange={(e) => setNewProperty({...newProperty, beds: parseInt(e.target.value)})} 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Number of Bathrooms</label>
              <input 
                type="number" 
                placeholder="e.g., 2" 
                value={newProperty.baths} 
                onChange={(e) => setNewProperty({...newProperty, baths: parseInt(e.target.value)})} 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }} 
              />
            </div>
            
            {/* Image URL */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Image URL</label>
              <input 
                type="text" 
                placeholder="https://images.unsplash.com/photo-..." 
                value={newProperty.imageUrl} 
                onChange={(e) => setNewProperty({...newProperty, imageUrl: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }} 
              />
              <p style={{ fontSize: '11px', color: textMuted, marginTop: '4px' }}>Use Unsplash or Pexels image URLs for best results</p>
            </div>
            
            {/* Amenities */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Amenities</label>
              <input 
                type="text" 
                placeholder="WiFi, Pool, Parking, Air conditioning, Kitchen, Hot tub" 
                value={newProperty.amenities} 
                onChange={(e) => setNewProperty({...newProperty, amenities: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor }} 
              />
              <p style={{ fontSize: '11px', color: textMuted, marginTop: '4px' }}>Separate amenities with commas</p>
            </div>
            
            {/* Description */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: textColor }}>Description</label>
              <textarea 
                placeholder="Describe the property, its unique features, nearby attractions, etc." 
                value={newProperty.description} 
                onChange={(e) => setNewProperty({...newProperty, description: e.target.value})} 
                rows="4" 
                style={{ width: '100%', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: inputBg, color: textColor, fontSize: '14px', resize: 'vertical' }} 
              />
            </div>
            
            {/* Buttons */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={cancelFormHandler} style={{ padding: '12px 24px', background: borderColor, color: textColor, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
              <button type="submit" style={{ padding: '12px 24px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, display:'flex', alignItems:'center', gap:'6px' }}>{editingId ? <><SaveIcon size={14}/> Save Changes</> : <><SparkleIcon size={14}/> Create Property</>}</button>
            </div>
          </form>
        </div>
      )}

      {/* Properties List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredProperties.map(property => (
          <div key={property.id} style={{ background: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '18px' }}>{property.title}</h3>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: property.status === 'APPROVED' ? (darkMode ? '#164e1a' : '#E8F5E9') : (darkMode ? '#78350f' : '#FFF8E1'), color: property.status === 'APPROVED' ? (darkMode ? '#b7f5bc' : '#2E7D32') : (darkMode ? '#fcd37d' : '#ED6C02') }}>
                  {property.status}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: textMuted, marginBottom: '8px' }}>
                {property.type} · Rs{property.price}/night · <MapPinIcon size={12} style={{marginRight:3, verticalAlign:'middle'}}/>{property.location}
              </div>
              <div style={{ fontSize: '13px', color: textMuted }}>
                Owner: {property.owner?.name || 'Unknown'} · {property.reviews || 0} reviews
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {property.status === 'PENDING' && (
                <button onClick={() => approvePropertyHandler(property.id)} style={{ padding: '8px 16px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display:'inline-flex', alignItems:'center', gap:'5px' }}><CheckIcon size={13}/> Approve</button>
              )}
              <button onClick={() => startEditHandler(property)} style={{ padding: '8px 16px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display:'inline-flex', alignItems:'center', gap:'5px' }}><EditIcon size={13}/> Update</button>
              <button onClick={() => deletePropertyHandler(property.id)} style={{ padding: '8px 16px', background: '#df1212', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display:'inline-flex', alignItems:'center', gap:'5px' }}><TrashIcon size={13}/> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProperties;