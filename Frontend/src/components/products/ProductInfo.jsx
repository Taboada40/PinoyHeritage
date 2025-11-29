import React, { useState } from 'react';
import '../../styles/products/ProductInfo.css';

function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Helper function to display sizes properly
  const getAvailableSizes = () => {
    if (!product.sizes || product.sizes.length === 0) return [];
    
    // If sizes is already an array, return it
    if (Array.isArray(product.sizes)) return product.sizes;
    
    // If it's a JSON string, try to parse it
    try {
      const parsed = JSON.parse(product.sizes);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      // If parsing fails, try to handle as comma-separated string
      if (typeof product.sizes === 'string') {
        return product.sizes.split(',').map(size => size.trim()).filter(size => size !== '');
      }
      return [];
    }
  };

  const availableSizes = getAvailableSizes();
  const hasSizes = availableSizes.length > 0;

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    
    console.log('Added to cart:', { 
      product: product.name, 
      size: selectedSize,
      quantity: quantity,
      productId: product.id
    });
    
    // Reset form after adding to cart
    setSelectedSize('');
    setQuantity(1);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-info-section">
      <div className="product-header">
        <div>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-category">
            <strong>Category:</strong> {typeof product.category === 'object' ? product.category.name : product.category}
          </div>
        </div>
        <div className="product-price-main">₱{parseFloat(product.price || 0).toFixed(2)}</div>
      </div>

      <p className="product-description-full">{product.description}</p>

      {/* Size Selector - Only show if product has sizes */}
      {hasSizes && (
        <div className="size-selector">
          <label className="size-label">Size</label>
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
            className="size-dropdown"
          >
            <option value="">Select size</option>
            {availableSizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="quantity-selector">
        <label className="quantity-label">Quantity</label>
        <div className="quantity-controls">
          <button 
            type="button"
            className="quantity-btn"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button 
            type="button"
            className="quantity-btn"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
        <span className="stock-info">({product.stock} available)</span>
      </div>

      {/* Stock Status */}
      <div className="stock-status">
        {product.stock > 0 ? (
          <span className="in-stock">✓ In Stock</span>
        ) : (
          <span className="out-of-stock">✗ Out of Stock</span>
        )}
      </div>

      <div className="action-buttons">
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          className="add-to-cart-btn-main" 
          onClick={handleAddToCart}
          disabled={product.stock === 0 || (hasSizes && !selectedSize)}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;