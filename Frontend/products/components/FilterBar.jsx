import React from 'react';
import '../assets/styles/FilterBar.css';

function FilterBar ({ onCategoryChange, onPriceChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-dropdown">
        <select onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">Category</option>
          <option value="clothing">Clothing & Apparel</option>
          <option value="textile">Textile & Fabric</option>
          <option value="crafts">Crafts</option>
          <option value="accessories">Accessories</option>
          <option value="souvenirs">Souvenirs</option>
        </select>
      </div>
      <div className="filter-dropdown">
        <select onChange={(e) => onPriceChange(e.target.value)}>
          <option value="">Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;