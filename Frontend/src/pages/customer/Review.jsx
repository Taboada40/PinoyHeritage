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
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      setMessage("Please select a rating.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (!customerId) {
      setMessage("You must be logged in to submit a review.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Merge tags + description to form the final comment
    const finalComment = `${selectedTags.join(", ")} ${description}`.trim();

    // ⭐ CRITICAL FIX: Convert customerId to number
    const payload = {
      rating: parseInt(rating),
      comment: finalComment,
      customerId: parseInt(customerId) // Convert string to number
    };

    console.log("Submitting review with payload:", payload);

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Log the response for debugging
      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response body:", responseText);

      if (!response.ok) {
        throw new Error(`Failed to submit review: ${responseText}`);
      }

      alert("Review submitted successfully!");
      navigate(`/product/${productId}#reviews`);
      
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage(`Failed to submit review: ${error.message}`);
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
          {[1, 2, 3, 4, 5].map((star) => (
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
          {tags.map((t) => (
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
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="char-count">{description.length}/300</p>

        {message && (
          <p style={{ color: "red", marginTop: "6px", fontSize: "14px" }}>
            {message}
          </p>
        )}

        <button className="btn-submit" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Review;