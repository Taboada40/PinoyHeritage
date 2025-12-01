// src/pages/products/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import ProductInfo from '../../components/products/ProductInfo';
import ReviewsSection from '../../components/products/ReviewsSection';

import '../../styles/products/ProductDetails.css';
import arrowImg from "../../assets/imgs/products/arrow-right.png";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialProduct = location.state?.product || null;
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(null);

  // Image carousel state must be declared unconditionally
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper function to parse sizes from JSON string
  const parseSizes = (sizes) => {
    if (!sizes) return [];
    try {
      if (Array.isArray(sizes)) return sizes;
      const parsed = JSON.parse(sizes);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      if (typeof sizes === 'string') {
        return sizes.split(',').map(s => s.trim()).filter(s => s !== '');
      }
      return [];
    }
  };

  // --- API FETCH ---
  useEffect(() => {
    let mounted = true;
    if (!product) setLoading(true);

    const API_BASE = 'http://localhost:8080';

    fetch(`${API_BASE}/api/admin/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;

        const sizesArray = parseSizes(data.sizes);

        // Use product.imageUrl if provided; otherwise keep any `image` field the API provided
        const imageSource = data.imageUrl || data.image || '';

        const normalized = {
          ...data,
          image: imageSource,
          stock: data.stock ?? 0,
          rating: data.rating ?? 0,
          reviews: Array.isArray(data.reviews) ? data.reviews : [],
          sizes: sizesArray
        };
        setProduct(normalized);
        setError(null);
      })
      .catch((err) => {
        console.warn("Backend fetch failed:", err.message);
        setError(err.message);
        setProduct(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="product-details-page"><p style={{padding:'50px', textAlign:'center'}}>Loading product...</p></div>;
  if (error || !product) return <div className="product-details-page"><p style={{padding:'50px', textAlign:'center'}}>Product not found</p></div>;

  // images array (use product.image if available, otherwise empty array)
  const images = (product && product.image) ? [product.image] : [];

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  const handleWriteReview = () => {
    // navigate to route that has productId param that your main.jsx expects
    navigate(`/product/${id}/review`);
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
            src={images[currentImageIndex] || product.image || ''}
            alt={`${product.name} view ${currentImageIndex + 1}`}
            className="main-image"
          />

          <button className="image-arrow arrow-right" onClick={handleNext}>
            <img src={arrowImg} alt="Next" style={{ transform: "rotate(180deg)" }} />
          </button>

          <div className="thumbnail-row">
            {images.length === 0 && (
              <div className="thumbnail empty">No image</div>
            )}
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

      {/* Write Review Button (navigates with id in URL) */}
      <div style={{ padding: "20px 24px" }}>
        <button className="write-review-btn" onClick={handleWriteReview}>
          Write a Review
        </button>
      </div>

      <ReviewsSection
        rating={product.rating}
        totalReviews={product.reviews ? product.reviews.length : 0}
        reviews={product.reviews || []}
      />
    </div>
  );
}
