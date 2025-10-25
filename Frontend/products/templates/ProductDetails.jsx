import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../landing_page/components/Header';
import ProductInfo from '../components/ProductInfo';
import ReviewsSection from '../components/ReviewsSection';
import '../assets/styles/ProductDetails.css';

import clothingImg from "../../landing_page/assets/imgs/clothing.jpg";
import barotSayaImg from "../assets/imgs/barotsaya.png";
import filipinianaImg from "../assets/imgs/filipiniana.jpg";
import malongImg from "../assets/imgs/malong.jpg";
import arrowImg from "../assets/imgs/arrow-right.png";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Barong Tagalog',
      price: 1000.00,
      stock: 146,
      rating: 4.5,
      description:
        'A traditional Filipino formal wear made from lightweight, sheer fabric such as piña or jusi, featuring intricate embroidery.',
      image: clothingImg,
      sizes: ['Small', 'Medium', 'Large'],
      reviews: [
        {
          id: 1,
          author: 'm*b',
          rating: 5,
          tags: ['Great quality', 'True to size'],
          date: '18 Sep 2025',
        },
        {
          id: 2,
          author: 'm*****n',
          rating: 5,
          tags: ['Great quality', 'Comfortable'],
          date: '12 Aug 2025',
        },
      ],
    },
    {
      id: 2,
      name: "Baro't Saya",
      price: 1800.00,
      stock: 82,
      rating: 4,
      description:
        'A traditional Filipino dress for women, featuring a blouse and skirt often made with light, embroidered fabrics.',
      image: barotSayaImg,
      sizes: ['Small', 'Medium', 'Large'],
      reviews: [
        {
          id: 1,
          author: 'n*v',
          rating: 4,
          tags: ['Great quality', 'Chic'],
          date: '20 Oct 2025',
        },
        {
          id: 2,
          author: 'j*****t',
          rating: 5,
          tags: ['True to size', 'Nice quality'],
          date: '19 Aug 2025',
        },
      ],
    },
    {
      id: 3,
      name: "Modern Filipiniana",
      price: 2500.00,
      stock: 33,
      rating: 5,
      description:
        'A modern Filipiniana featuring a crop top paired with a long fitted skirt, combining contemporary style with traditional Filipino elements.',
      image: filipinianaImg,
      sizes: ['Small', 'Medium', 'Large'],
      reviews: [
        {
          id: 1,
          author: 'f***z',
          rating: 5,
          tags: ['Great quality', 'True to size'],
          date: '30 Oct 2025',
        },
        {
          id: 2,
          author: 's***z',
          rating: 5,
          tags: [],
          date: '27 Sept 2025',
        },
        {
          id: 3,
          author: 't**y',
          rating: 5,
          tags: ['Highly recommended', 'True to size', 'Fast shipping'],
          date: '11 Aug 2025',
        },
      ],
    },
    {
      id: 4,
      name: "Malong",
      price: 200.00,
      stock: 210,
      rating: 3,
      description:
        'A traditional tubular garment from the Philippines, often made of colorful woven or printed fabric. It’s versatile and can be worn as a skirt, dress, shawl, or blanket, symbolizing Filipino creativity and cultural identity.',
      image: malongImg,
      sizes: ['Free size'],
      reviews: [
        {
          id: 1,
          author: 'f***a',
          rating: 2,
          tags: [],
          date: '15 Oct 2025',
        },
        {
          id: 2,
          author: 's***e',
          rating: 3,
          tags: ['Great quality'],
          date: '04 Sept 2025',
        },
        {
          id: 3,
          author: 'z***o',
          rating: 3,
          tags: ['Highly recommended', 'Great quality'],
          date: '08 Aug 2025',
        },
      ],
    },
  ];

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <p>Product not found</p>;

  // ✅ image carousel logic
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.image, product.image, product.image]; // replace with multiple images if available

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
      <Header showNav={false} />

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
