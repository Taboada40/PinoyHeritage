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

  // Ensure reviews is always an array
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  return (
    <div id="reviews" className="reviews-section">
      <div className="reviews-header">
        <h2 className="reviews-title">Customer Reviews ({totalReviews})</h2>
        {!hasReviewed && (
          <button 
            className="write-review-btn" 
            onClick={handleWriteReview}
          >
            Write a Review
          </button>
        )}
      </div>

      <div className="overall-rating">
        <span className="rating-score">{Number(rating).toFixed(1)}/5</span>
        <div className="rating-stars">{renderStars(Math.floor(rating))}</div>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id || Math.random()} className="review-item">
              <div className="review-header">
                <div className="review-stars">{renderStars(review.rating || 0)}</div>
                <span className="review-date">{formatDate(review.createdAt)}</span>
              </div>
              <p className="review-author">By {review.customer?.username || review.customer?.name || 'Anonymous'}</p>
              <p className="review-description">{review.comment || 'No comment'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewsSection;
