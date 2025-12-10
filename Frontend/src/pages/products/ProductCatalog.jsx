import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import FilterBar from '../../components/products/FilterBar';
import ProductCard from '../../components/products/ProductCard';
import '../../styles/products/ProductCatalog.css';

export default function ProductCatalog() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_BASE = 'http://localhost:8080';
        const res = await fetch(`${API_BASE}/api/admin/products`);

        if (!res.ok) throw new Error('Failed to fetch products');
        
        const data = await res.json();

        const productsArray = Array.isArray(data) ? data : (data?.value || data);

        const mapped = productsArray.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          rating: item.rating ?? 0,
          description: item.description || '',
          categoryName: item.categoryName 
            ? item.categoryName.toLowerCase() 
            : (item.category ? item.category.name.toLowerCase() : ''),
          image: item.imageUrl || clothingImg, 
        }));

        setProducts(mapped);
      } catch (err) {
        console.warn('Error fetching products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Read URL parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam.toLowerCase());
    }
  }, [location]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let updated = [...products];

    if (selectedCategory) {
      updated = updated.filter(p => 
        p.categoryName === selectedCategory
      );
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
            selectedCategory={selectedCategory} 
          />
        </div>
      </div>

      <div className="products-grid">
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            />
          ))
        ) : (
          <div className="no-products">
            {selectedCategory 
              ? `No products found in "${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}" category.` 
              : 'No products found.'}
          </div>
        )}
      </div>
    </div>
  );
}