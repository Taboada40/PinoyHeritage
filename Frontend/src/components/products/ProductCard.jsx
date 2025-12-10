import React from 'react';
import '../../styles/products/ProductCard.css';

function ProductCard({ product, onClick }) {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'shop-item-star filled' : 'shop-item-star empty'}>
        ★
      </span>
    ));
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    } else {
      window.location.href = `/product/${product.id}`;
    }
  };

  return (
    <div className="shop-item-card" onClick={handleClick}>
      <div className="shop-item-image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="shop-item-details">
        <p className="shop-item-price">₱{product.price.toFixed(2)}</p>
        <h3 className="shop-item-name">{product.name}</h3>
        
        <div className="shop-item-rating">
          {renderStars(product.rating)}
        </div>
        
        <p className="shop-item-description">{product.description}</p>
        
      </div>
    </div>
  );
}

export default ProductCard;