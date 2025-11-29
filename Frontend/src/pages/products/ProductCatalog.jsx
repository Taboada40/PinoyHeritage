import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import FilterBar from '../../components/products/FilterBar';
import ProductCard from '../../components/products/ProductCard';
import '../../styles/products/ProductCatalog.css';

// Image Imports
import clothingImg from "../../assets/imgs/landing/clothing.jpg";

export default function ProductCatalog() {

  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");

  // --- 2. STATE ---
  // Initialize with empty array - fetch from backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 3. BACKEND FETCH ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_BASE = 'http://localhost:8080';
        const res = await fetch(`${API_BASE}/api/admin/products`);

        if (!res.ok) throw new Error('Failed to fetch products');
        
        const data = await res.json();

        // Handle both array and object with 'value' property
        const productsArray = Array.isArray(data) ? data : (data?.value || data);

        // Map backend fields
        const mapped = productsArray.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          rating: item.rating || 4,
          description: item.description || '',
          category: item.category ? (typeof item.category === 'string' ? item.category.toLowerCase() : item.category.name?.toLowerCase()) : 'clothing', 
          image: item.imageUrl || clothingImg, 
        }));

        setProducts(mapped);
      } catch (err) {
        console.warn('Error fetching products:', err);
        // On error, show no products rather than hardcoded samples
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 4. FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    let updated = [...products];

    if (selectedCategory) {
      updated = updated.filter(p => p.category === selectedCategory);
    }

    if (priceSort === 'low-high') {
      updated.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
      updated.sort((a, b) => b.price - a.price);
    }

    return updated;
  }, [products, selectedCategory, priceSort]);

  return (
    <div className="product-catalog-page">      
      <Header showNav={true} />
      
      <div className="catalog-header">
        <div className="catalog-header-top">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back
          </button>

          <FilterBar 
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceSort}
          />
        </div>
      </div>

      <div className="products-grid">
        {loading ? (
          <div style={{width: '100%', textAlign: 'center', padding: '2rem'}}>Loading...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
              />
          ))
        ) : (
          <div style={{width: '100%', textAlign: 'center', padding: '2rem'}}>No products found.</div>
        )}
      </div>
    </div>
  );
}