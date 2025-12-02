import React, { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import "../../styles/customer/review.css";

const Review = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const customerId = localStorage.getItem("userId");

  if (!productId) {
    return <Navigate to="/catalog" replace />;
  }

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [message, setMessage] = useState("");

  const tags = [
    "Excellent", "Amazing", "High Quality", "Well-Made",
    "Loved it", "Highly Recommended", "Satisfied", "Great Value",
    "Comfortable", "Very Good", "Medium", "Bad Product"
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag)
      ? prev.filter(t => t !== tag)
      : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setMessage("Please select a rating.");
      return setTimeout(() => setMessage(""), 3000);
    }
    if (!customerId) {
      setMessage("You must be logged in to submit a review.");
      return setTimeout(() => setMessage(""), 3000);
    }

    const finalComment = `${selectedTags.join(", ")} ${description}`.trim();
    const payload = {
      rating: parseInt(rating),
      comment: finalComment,
      customerId: parseInt(customerId)
    };

    try {
      const res = await fetch(`http://localhost:8080/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      alert("Review submitted successfully!");
      // Navigate back to ProductDetails and trigger review refresh
      navigate(`/product/${productId}`, { state: { refreshReviews: true } });

    } catch (err) {
      console.error("Error submitting review:", err);
      setMessage(`Failed to submit review: ${err.message}`);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="review-page">
      <Header showNav={true} />
      <div className="review-card">
        <h2 className="review-title">Leave a Review</h2>

        {/* Rating Stars */}
        <div className="stars">
          {[1,2,3,4,5].map(star => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="tags-container">
          {tags.map(t => (
            <div
              key={t}
              className={`tag ${selectedTags.includes(t) ? "selected" : ""}`}
              onClick={() => toggleTag(t)}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Description */}
        <textarea
          className="review-textarea"
          placeholder="Write your review here..."
          maxLength={300}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <p className="char-count">{description.length}/300</p>

        {message && <p style={{color:"red", marginTop:"6px", fontSize:"14px"}}>{message}</p>}

        <button className="btn-submit" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Review;
