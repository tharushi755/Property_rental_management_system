import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ReviewSection({ propertyId, user }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch reviews from backend
  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/reviews/property/${propertyId}`);
      setReviews(response.data || []);
      setError('');
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  const submitReview = async () => {
    // Check if user is logged in
    if (!user) {
      alert('Please login to leave a review');
      return;
    }

    // Check if user has an ID
    if (!user.id) {
      alert('User information missing. Please logout and login again.');
      return;
    }

    if (!newReview.comment.trim()) {
      alert('Please write a comment');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const reviewData = {
        propertyId: propertyId,
        userId: user.id,
        rating: newReview.rating,
        comment: newReview.comment
      };
      
      console.log('Submitting review:', reviewData);
      
      const response = await api.post('/reviews', reviewData);
      
      console.log('Review response:', response.data);
      
      if (response.data.success) {
        alert('✅ Review submitted! Thank you for your feedback.');
        setNewReview({ rating: 5, comment: '' });
        setShowForm(false);
        fetchReviews(); // Refresh reviews
      } else {
        setError(response.data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.response?.data?.error || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ marginTop: '40px' }}>Loading reviews...</div>;
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px' }}>
            Guest Reviews
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#C4622D' }}>
              {averageRating.toFixed(1)}
            </span>
            <span style={{ fontSize: '20px' }}>⭐</span>
            <span style={{ color: '#9A8F84' }}>
              · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        </div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 24px',
              background: '#C4622D',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            ✍️ Write a Review
          </button>
        ) : (
          <button
            onClick={() => setShowForm(false)}
            style={{
              padding: '10px 24px',
              background: '#9A8F84',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {error && (
        <div style={{ background: '#FFEBEE', color: '#C62828', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div style={{
          background: '#FAF8F4',
          padding: '24px',
          borderRadius: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Your Rating</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  style={{
                    fontSize: '32px',
                    cursor: 'pointer',
                    color: star <= newReview.rating ? '#FFB800' : '#ddd',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Your Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share your experience with other travelers..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #E8D5B7',
                borderRadius: '10px',
                fontFamily: 'inherit',
                resize: 'vertical',
                fontSize: '14px'
              }}
            />
          </div>
          <button
            onClick={submitReview}
            disabled={submitting}
            style={{
              padding: '12px 28px',
              background: '#2E7D32',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              opacity: submitting ? 0.7 : 1
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9A8F84' }}>
            No reviews yet. Be the first to review!
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} style={{
              background: 'white',
              border: '1px solid #E8D5B7',
              borderRadius: '14px',
              padding: '20px',
              transition: 'box-shadow 0.2s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#C4622D',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}>
                    {review.user?.name ? review.user.name[0].toUpperCase() : review.user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{review.user?.name || review.user?.email?.split('@')[0] || 'Anonymous'}</div>
                    <div style={{ fontSize: '11px', color: '#9A8F84' }}>
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}
                    </div>
                  </div>
                </div>
                <div>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < review.rating ? '#FFB800' : '#ddd', fontSize: '16px' }}>★</span>
                  ))}
                </div>
              </div>
              <p style={{ color: '#666', lineHeight: 1.6, marginLeft: '52px' }}>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewSection;