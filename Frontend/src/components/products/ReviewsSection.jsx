import React from 'react';
import '../../styles/products/ReviewSection.css';

function ReviewsSection({ rating, totalReviews, reviews }) {
  function renderStars(count, filled = true) {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < count ? 'star filled' : 'star empty'}>
        ★
      </span>
    ));
  }

  return (
    <div className="reviews-section">
      <h2 className="reviews-title">Reviews</h2>
      
      <div className="overall-rating">
        <span className="rating-score">{rating}/5</span>
        <div className="rating-stars">
          {renderStars(Math.floor(rating))}
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="review-stars">
                {renderStars(review.rating)}
              </div>
              <span className="review-date">{review.date}</span>
            </div>
            <p className="review-author">By {review.author}</p>
            <div className="review-tags">
              {review.tags.map((tag, index) => (
                <span key={index} className="review-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
