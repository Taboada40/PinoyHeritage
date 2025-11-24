import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import ProductInfo from '../../components/products/ProductInfo';
import ReviewsSection from '../../components/products/ReviewsSection';

import '../../styles/products/ProductDetails.css';

import arrowImg from "../../assets/imgs/products/arrow-right.png";
import clothingImg from "../../assets/imgs/landing/clothing.jpg";
import barotSayaImg from "../../assets/imgs/products/barotsaya.png";
import filipinianaImg from "../../assets/imgs/products/filipiniana.jpg";
import malongImg from "../../assets/imgs/products/malong.jpg";
import salakotImg from "../../assets/imgs/products/salakot.jpg"; 
import camisaImg from "../../assets/imgs/products/camisa.jpg";
import bakyaImg from "../../assets/imgs/products/bakya.jpg";
import tnalakImg from "../../assets/imgs/products/tnalak.jpg";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // --- 1. SAMPLE DATA ---
  const sampleProducts = [
    {
      id: 1,
      name: 'Barong Tagalog',
      price: 1000.00,
      stock: 146,
      rating: 4.5,
      description: 'A traditional Filipino formal wear made from lightweight, sheer fabric such as piña or jusi, featuring intricate embroidery.',
      image: clothingImg,
      sizes: ['Small', 'Medium', 'Large'],
      reviews: [
        { id: 1, author: 'm*b', rating: 5, tags: ['Great quality', 'True to size'], date: '18 Sep 2025' },
        { id: 2, author: 'm*****n', rating: 5, tags: ['Great quality', 'Comfortable'], date: '12 Aug 2025' },
      ],
    },
    {
      id: 2,
      name: "Baro't Saya",
      price: 1800.00,
      stock: 82,
      rating: 4,
      description: 'A traditional Filipino dress for women, featuring a blouse and skirt often made with light, embroidered fabrics.',
      image: barotSayaImg,
      sizes: ['Small', 'Medium', 'Large'],
      reviews: [
        { id: 1, author: 'n*v', rating: 4, tags: ['Great quality', 'Chic'], date: '20 Oct 2025' },
        { id: 2, author: 'j*****t', rating: 5, tags: ['True to size', 'Nice quality'], date: '19 Aug 2025' },
      ],
    },
    {
      id: 3,
      name: "Modern Filipiniana",
      price: 2500.00,
      stock: 33,
      rating: 5,
      description: 'A modern Filipiniana featuring a crop top paired with a long fitted skirt, combining contemporary style with traditional Filipino elements.',
      image: filipinianaImg,
      sizes: ['Small', 'Medium', 'Large'],
      reviews: [
        { id: 1, author: 'f***z', rating: 5, tags: ['Great quality', 'True to size'], date: '30 Oct 2025' },
        { id: 2, author: 's***z', rating: 5, tags: [], date: '27 Sept 2025' },
        { id: 3, author: 't**y', rating: 5, tags: ['Highly recommended', 'True to size', 'Fast shipping'], date: '11 Aug 2025' },
      ],
    },
    {
      id: 4,
      name: "Malong",
      price: 200.00,
      stock: 210,
      rating: 3,
      description: 'A traditional tubular garment from the Philippines, often made of colorful woven or printed fabric.',
      image: malongImg,
      sizes: ['Free size'],
      reviews: [
        { id: 1, author: 'f***a', rating: 2, tags: [], date: '15 Oct 2025' },
        { id: 2, author: 's***e', rating: 3, tags: ['Great quality'], date: '04 Sept 2025' },
      ],
    },
    {
      id: 5,
      name: "Salakot",
      price: 350.00,
      stock: 50,
      rating: 4,
      description: 'A traditional wide-brimmed hat usually made of rattan or reeds.',
      image: salakotImg,
      sizes: ['Standard', 'Large'],
      reviews: [
        { id: 1, author: 'r***y', rating: 5, tags: ['Authentic', 'Sturdy'], date: '01 Nov 2025' },
      ]
    },
    {
      id: 6,
      name: "Camisa de Chino",
      price: 450.00,
      stock: 120,
      rating: 3,
      description: 'A simple, collarless cotton shirt usually worn underneath the Barong Tagalog.',
      image: camisaImg,
      sizes: ['S', 'M', 'L', 'XL'],
      reviews: [
        { id: 1, author: 'j**n', rating: 3, tags: ['Thin fabric'], date: '10 Oct 2025' },
      ]
    },
    {
      id: 7,
      name: "Bakya",
      price: 250.00,
      stock: 65,
      rating: 4,
      description: 'Traditional Filipino wooden clogs with a strap.',
      image: bakyaImg,
      sizes: ['36', '37', '38', '39', '40'],
      reviews: [
        { id: 1, author: 'l**a', rating: 5, tags: ['Nostalgic', 'Cute'], date: '05 Nov 2025' },
      ]
    },
    {
      id: 8,
      name: "T'nalak Vest",
      price: 1500.00,
      stock: 15,
      rating: 5,
      description: 'A vest woven from T\'nalak fabric, a sacred cloth of the T\'boli people made from abaca fibers.',
      image: tnalakImg,
      sizes: ['S', 'M', 'L'],
      reviews: [
        { id: 1, author: 'art**luv', rating: 5, tags: ['Stunning patterns', 'Premium'], date: '12 Nov 2025' },
      ]
    },
  ];

  // --- 2. INITIALIZE STATE ---
  // We prioritize location.state, then fallback to sampleProducts
  const initialProduct = location.state?.product || sampleProducts.find(p => p.id === parseInt(id));
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- 3. API FETCH (Merged with Sample Data) ---
  useEffect(() => {
    if (!product) setLoading(true);

    fetch(`/api/admin/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        // Look up the RICH sample data again (reviews, etc) using the ID
        const richSample = sampleProducts.find(p => p.id === parseInt(id));

        // Create the merged object
        const normalized = {
          ...data,
          // If API description is missing/empty, use sample description
          description: data.description || (richSample ? richSample.description : ''),
          
          // If API reviews are empty, use sample reviews
          reviews: (data.reviews && data.reviews.length > 0) ? data.reviews : (richSample ? richSample.reviews : []),
          
          // If API image is missing, use sample image
          image: data.imageUrl || (richSample ? richSample.image : clothingImg),
          
          // If API sizes are missing, use sample sizes
          sizes: (data.sizes && data.sizes.length > 0) ? data.sizes : (richSample ? richSample.sizes : []),
          
          // Use sample stock/rating if API doesn't provide it
          stock: data.stock !== undefined ? data.stock : (richSample ? richSample.stock : 0),
          rating: data.rating !== undefined ? data.rating : (richSample ? richSample.rating : 0),
        };
        
        setProduct(normalized);
      })
      .catch((err) => {
        console.warn("Backend fetch failed, using sample data:", err.message);
        // If fetch fails, we ensure 'product' is set to the rich sample data
        const richSample = sampleProducts.find(p => p.id === parseInt(id));
        if (richSample) {
            setProduct(richSample);
        }
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Only re-run when ID changes

  // --- 4. RENDER GUARDS ---
  if (loading) return <div className="product-details-page"><p style={{padding:'50px', textAlign:'center'}}>Loading product...</p></div>;
  if (!product) return <div className="product-details-page"><p style={{padding:'50px', textAlign:'center'}}>Product not found</p></div>;

  // --- 5. IMAGE CAROUSEL LOGIC ---
  const images = [product.image, product.image, product.image];

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