import React, { useState, useEffect } from 'react';
import categoriesApi from '../../api/categoriesApi'; 
import '../../styles/products/FilterBar.css';

function FilterBar({ onCategoryChange, onPriceChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.get(); 
        setCategories(response.data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="filter-bar">
      <div className="filter-dropdown">
        <select onChange={(e) => onCategoryChange(e.target.value)} defaultValue="">
          <option value="" disabled>Category</option>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name.toLowerCase()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-dropdown">
        <select onChange={(e) => onPriceChange(e.target.value)} defaultValue="">
          <option value="" disabled>Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;