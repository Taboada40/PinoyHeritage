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

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const parseSizes = (sizes) => {
    if (!sizes) return [];
    try {
      if (Array.isArray(sizes)) return sizes;
      const parsed = JSON.parse(sizes);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      if (typeof sizes === 'string') {
        return sizes.split(',').map(size => size.trim()).filter(size => size !== '');
      }
      return [];
    }
  };

  const API_BASE = 'http://localhost:8080';

  // Fetch product
  useEffect(() => {
    if (!product) setLoading(true);

    fetch(`${API_BASE}/api/admin/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        const sizesArray = parseSizes(data.sizes);
        const normalized = {
          ...data,
          image: data.imageUrl || data.image,
          stock: data.stock || 0,
          rating: data.rating || 0,
          reviews: data.reviews || [],
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
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}/reviews`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      
      if (data.reviews) {
        setReviews(data.reviews || []);
        setTotalReviews(data.reviews.length || 0);
        setAvgRating(data.rating || 0);
      } else {
        const reviewsList = Array.isArray(data) ? data : [];
        setReviews(reviewsList);
        setTotalReviews(reviewsList.length);
        const avg = reviewsList.length > 0 
          ? reviewsList.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewsList.length 
          : 0;
        setAvgRating(avg);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
      setTotalReviews(0);
      setAvgRating(0);
    }
  };

  // Fetch reviews on mount & refresh after submitting review
  useEffect(() => {
    fetchReviews();
  }, [id, location.state?.refreshReviews]);

  if (loading) return <div className="product-details-page"><p style={{padding:'50px', textAlign:'center'}}>Loading product...</p></div>;
  if (error || !product) return <div className="product-details-page"><p style={{padding:'50px', textAlign:'center'}}>Product not found</p></div>;

  // Image list
  const images = product && product.image ? [product.image] : [];

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
        {/* Image Section with Carousel */}
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

        {/* Product Info Section */}
        <ProductInfo product={product} />
      </div>

      {/* Reviews Section - Pass the fetched reviews */}
      <ReviewsSection
        rating={avgRating}
        totalReviews={totalReviews}
        reviews={reviews}
      />
    </div>
  );
}