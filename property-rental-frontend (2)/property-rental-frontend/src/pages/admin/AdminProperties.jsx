import React, { useState, useEffect } from 'react';
import { getAllPropertiesAdmin, approveProperty, deleteProperty, createProperty, updateProperty } from '../../services/api';

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
    return <div style={{ padding: '32px', textAlign: 'center' }}>Loading properties...</div>;
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '8px' }}>Property Management</h1>
          <p style={{ color: '#9A8F84' }}>Review, approve, and manage all properties</p>
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
              style={{ padding: '8px 20px', background: filter === option ? '#C4622D' : 'white', color: filter === option ? 'white' : '#1A1612', border: `1px solid ${filter === option ? '#C4622D' : '#E8D5B7'}`, borderRadius: '20px', cursor: 'pointer' }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Create Property Form */}
      {showForm && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #E8D5B7' }}>
          <h3 style={{ marginBottom: '16px', color: '#1A1612' }}>{editingId ? '✏️ Update Property' : '➕ Create New Property'}</h3>
          <form onSubmit={savePropertyHandler} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Title */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Property Title *</label>
              <input 
                type="text" 
                placeholder="e.g., Luxury Beachfront Villa" 
                value={newProperty.title} 
                onChange={(e) => setNewProperty({...newProperty, title: e.target.value})} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }} 
              />
            </div>
            
            {/* Type and Location */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Property Type *</label>
              <select 
                value={newProperty.type} 
                onChange={(e) => setNewProperty({...newProperty, type: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }}
              >
                <option>Villa</option><option>Cabin</option><option>Cabana</option><option>Hotel</option>
                <option>Chalet</option><option>Apartment</option><option>Suite</option><option>Bungalow</option>
                <option>Cottage</option><option>Lodge</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Location *</label>
              <input 
                type="text" 
                placeholder="e.g., Santorini, Greece" 
                value={newProperty.location} 
                onChange={(e) => setNewProperty({...newProperty, location: e.target.value})} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }} 
              />
            </div>
            
            {/* Price and Guests */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Price per Night ($) *</label>
              <input 
                type="number" 
                placeholder="e.g., 250" 
                value={newProperty.price} 
                onChange={(e) => setNewProperty({...newProperty, price: parseInt(e.target.value)})} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Max Guests *</label>
              <input 
                type="number" 
                placeholder="e.g., 6" 
                value={newProperty.guests} 
                onChange={(e) => setNewProperty({...newProperty, guests: parseInt(e.target.value)})} 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }} 
              />
            </div>
            
            {/* Beds and Baths */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Number of Beds</label>
              <input 
                type="number" 
                placeholder="e.g., 3" 
                value={newProperty.beds} 
                onChange={(e) => setNewProperty({...newProperty, beds: parseInt(e.target.value)})} 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Number of Bathrooms</label>
              <input 
                type="number" 
                placeholder="e.g., 2" 
                value={newProperty.baths} 
                onChange={(e) => setNewProperty({...newProperty, baths: parseInt(e.target.value)})} 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }} 
              />
            </div>
            
            {/* Image URL */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Image URL</label>
              <input 
                type="text" 
                placeholder="https://images.unsplash.com/photo-..." 
                value={newProperty.imageUrl} 
                onChange={(e) => setNewProperty({...newProperty, imageUrl: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }} 
              />
              <p style={{ fontSize: '11px', color: '#9A8F84', marginTop: '4px' }}>Use Unsplash or Pexels image URLs for best results</p>
            </div>
            
            {/* Amenities */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Amenities</label>
              <input 
                type="text" 
                placeholder="WiFi, Pool, Parking, Air conditioning, Kitchen, Hot tub" 
                value={newProperty.amenities} 
                onChange={(e) => setNewProperty({...newProperty, amenities: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px' }} 
              />
              <p style={{ fontSize: '11px', color: '#9A8F84', marginTop: '4px' }}>Separate amenities with commas</p>
            </div>
            
            {/* Description */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500, color: '#1A1612' }}>Description</label>
              <textarea 
                placeholder="Describe the property, its unique features, nearby attractions, etc." 
                value={newProperty.description} 
                onChange={(e) => setNewProperty({...newProperty, description: e.target.value})} 
                rows="4" 
                style={{ width: '100%', padding: '12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: '#FAF8F4', fontSize: '14px', resize: 'vertical' }} 
              />
            </div>
            
            {/* Buttons */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={cancelFormHandler} style={{ padding: '12px 24px', background: '#9A8F84', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
              <button type="submit" style={{ padding: '12px 24px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>{editingId ? '💾 Save Changes' : '✨ Create Property'}</button>
            </div>
          </form>
        </div>
      )}

      {/* Properties List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredProperties.map(property => (
          <div key={property.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8D5B7', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px' }}>{property.title}</h3>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: property.status === 'APPROVED' ? '#E8F5E9' : '#FFF8E1', color: property.status === 'APPROVED' ? '#2E7D32' : '#ED6C02' }}>
                  {property.status}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                {property.type} · ${property.price}/night · 📍 {property.location}
              </div>
              <div style={{ fontSize: '13px', color: '#9A8F84' }}>
                Owner: {property.owner?.name || 'Unknown'} · {property.reviews || 0} reviews
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {property.status === 'PENDING' && (
                <button onClick={() => approvePropertyHandler(property.id)} style={{ padding: '8px 16px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>✓ Approve</button>
              )}
              <button onClick={() => startEditHandler(property)} style={{ padding: '8px 16px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>✏️ Update</button>
              <button onClick={() => deletePropertyHandler(property.id)} style={{ padding: '8px 16px', background: '#df1212', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProperties;