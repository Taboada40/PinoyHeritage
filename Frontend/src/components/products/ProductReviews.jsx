import React, { useEffect, useState } from "react";
import ReviewsSection from "./ReviewsSection";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${productId}/reviews`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews || []);
        setRating(data.rating || 0);
      })
      .catch(err => console.error(err));
  }, [productId]);

  return (
    <ReviewsSection
      reviews={reviews}
      totalReviews={reviews.length}
      rating={rating}
    />
  );
}
