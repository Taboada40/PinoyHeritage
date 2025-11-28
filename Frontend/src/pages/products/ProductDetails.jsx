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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- API FETCH ---
  useEffect(() => {
    if (!product) setLoading(true);

    const API_BASE = 'http://localhost:8080';

    fetch(`${API_BASE}/api/admin/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        const normalized = {
          ...data,
          image: data.imageUrl || '',
          stock: data.stock || 0,
          rating: data.rating || 0,
          reviews: data.reviews || [],
          sizes: data.sizes || []
        };
        setProduct(normalized);
      })
      .catch((err) => {
        console.warn("Backend fetch failed:", err.message);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="product-details-page"><p style={{padding:'50px', textAlign:'center'}}>Loading product...</p></div>;
  if (!product) return <div className="product-details-page"><p style={{padding:'50px', textAlign:'center'}}>Product not found</p></div>;

  const images = [product.image || ''];

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-details-page">
      <Header showNav={true} />

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
        totalReviews={product.reviews ? product.reviews.length : 0}
        reviews={product.reviews || []}
      />
    </div>
  );
}
