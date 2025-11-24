import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../landing_page/components/Header';
import ProductInfo from '../components/ProductInfo';
import ReviewsSection from '../components/ReviewsSection';
import '../assets/styles/ProductDetails.css';

import clothingImg from "../../landing_page/assets/imgs/clothing.jpg";
import arrowImg from "../assets/imgs/arrow-right.png";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Image carousel state must be declared unconditionally (before any early returns)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/admin/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        // Normalize backend shape to what UI expects
        const normalized = {
          ...data,
          image: data.imageUrl || clothingImg,
          sizes: data.sizes || [],
          reviews: data.reviews || [],
        };
        setProduct(normalized);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error || !product) return <p>Product not found</p>;

  // image list (use a fallback if backend didn't provide one)
  const images = product && product.image ? [product.image] : [clothingImg];

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="product-details-page">
      <Header showNav={true} />

      {/* Back Button */}
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="product-main">
        <div className="image-section">

          <button className="image-arrow arrow-left" onClick={handlePrev}>
            <img src={arrowImg} alt="Previous"/>
          </button>

          <img
            src={images[currentImageIndex]}
            alt={`${product.name} view ${currentImageIndex + 1}`}
            className="main-image"
          />

          <button className="image-arrow arrow-right" onClick={handleNext}>
            <img src={arrowImg} alt="Next" style={{ transform: "rotate(180deg)" }} />
          </button>

          <div className="thumbnail-row">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <ProductInfo product={product} />

      </div>

      <ReviewsSection
        rating={product.rating}
        totalReviews={product.reviews.length}
        reviews={product.reviews}
      />
    </div>
  );
}
