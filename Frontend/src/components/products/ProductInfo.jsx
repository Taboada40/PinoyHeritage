import React, { useState } from 'react';
import '../../styles/products/ProductInfo.css';

function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Added to cart:', { product: product.name, size: selectedSize });
  };

  return (
    <div className="product-info-section">
      <div className="product-header">
        <div>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-stock">Stock: {product.stock}</p>
        </div>
        <div className="product-price-main">₱{product.price.toFixed(2)}</div>
      </div>

      <p className="product-description-full">{product.description}</p>

      <div className="size-selector">
        <label className="size-label">Size</label>
        <select 
          value={selectedSize} 
          onChange={(e) => setSelectedSize(e.target.value)}
          className="size-dropdown"
        >
          <option value="">Select size</option>
          {product.sizes?.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="action-buttons">
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="add-to-cart-btn-main" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
