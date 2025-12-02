import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/products/ReviewSection.css';

function ReviewsSection({ rating = 0, totalReviews = 0, reviews = [] }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [hasReviewed, setHasReviewed] = useState(false);
  const userId = localStorage.getItem('userId');

  // Format date as "Month Day, Year"
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDate(dateString);
  };

  // Check if current user has already reviewed
  useEffect(() => {
    if (userId && reviews.some(review => review.customer?.id?.toString() === userId || review.customerId?.toString() === userId)) {
      setHasReviewed(true);
    }
  }, [reviews, userId]);

  const handleWriteReview = () => {
    if (!userId) {
      navigate('/login', { state: { from: `/product/${productId}` } });
      return;
    }
    navigate(`/review/${productId}`);
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < count ? 'star filled' : 'star empty'}>
        ★
      </span>
    ));
  };

  // Calculate rating distribution
  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1]++;
      }
    });
    return distribution.reverse(); // 5 stars first
  };

  const ratingDistribution = getRatingDistribution();

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      '#0038a8', '#4f46e5', '#7c3aed', '#db2777', '#dc2626',
      '#ea580c', '#d97706', '#65a30d', '#059669', '#0891b2'
    ];
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div id="reviews" className="reviews-section">
      <div className="reviews-container">
        
        {/* Header */}
        <div className="reviews-header">
          <div className="header-content">
            <h2 className="reviews-title">Customer Reviews</h2>
            <p className="reviews-subtitle">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
          </div>
          {!hasReviewed && (
            <button className="write-review-btn" onClick={handleWriteReview}>
              <span className="btn-icon">✍️</span>
              <span>Write a Review</span>
            </button>
          )}
        </div>

        {/* Overall Rating Card */}
        <div className="rating-overview-card">
          <div className="rating-score-section">
            <div className="large-rating-number">{Number(rating).toFixed(1)}</div>
            <div className="rating-details">
              <div className="rating-stars-large">{renderStars(Math.floor(rating))}</div>
              <p className="rating-text">Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map((stars, index) => {
              const count = ratingDistribution[index];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={stars} className="distribution-row">
                  <span className="stars-label">{stars} ★</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="count-label">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <div className="empty-reviews">
              <div className="empty-icon">💬</div>
              <h3>No reviews yet</h3>
              <p>Be the first to share your experience!</p>
              {!hasReviewed && (
                <button className="write-review-btn-secondary" onClick={handleWriteReview}>
                  Write the First Review
                </button>
              )}
            </div>
          ) : (
            reviews.map((review) => {
              const authorName = review.customer?.username || review.customer?.name || 'Anonymous';
              const initials = getInitials(authorName);
              const avatarColor = getAvatarColor(authorName);

              return (
                <div key={review.id || Math.random()} className="review-card">
                  <div className="review-card-header">
                    <div className="reviewer-info">
                      <div 
                        className="reviewer-avatar" 
                        style={{ backgroundColor: avatarColor }}
                      >
                        {initials}
                      </div>
                      <div className="reviewer-details">
                        <h4 className="reviewer-name">{authorName}</h4>
                        <span className="review-time">{getRelativeTime(review.createdAt)}</span>
                      </div>
                    </div>
                    <div className="review-rating">
                      <div className="review-stars">{renderStars(review.rating || 0)}</div>
                      <span className="rating-number">{review.rating || 0}.0</span>
                    </div>
                  </div>

                  <div className="review-content">
                    <p className="review-text">{review.comment || 'No comment provided.'}</p>
                  </div>

                  {/* Media if exists */}
                  {review.media && review.media.length > 0 && (
                    <div className="review-media-container">
                      {review.media.map((mediaUrl, idx) => (
                        <div key={idx} className="review-media-card">
                          <img src={mediaUrl} alt={`Review media ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer with verified badge only */}
                  <div className="review-footer">
                    <span className="verified-badge">✓ Verified Purchase</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewsSection;