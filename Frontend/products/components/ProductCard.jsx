import React from 'react';
import '../assets/styles/ProductCard.css';

function ProductCard({ product, onClick }) {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star empty'}>
        ★
      </span>
    ));
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    } else {
      // Default navigation behavior
      window.location.href = `/product/${product.id}`;
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <p className="product-price">₱{product.price.toFixed(2)}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          {renderStars(product.rating)}
        </div>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart-btn">Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
